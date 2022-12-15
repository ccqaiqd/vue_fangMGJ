<template>
  <div id="home">
    <NavBar class="center">
      <div slot="center">购物街</div>
    </NavBar>
    <TabControl
      :titles="['流行', '新款', '精品']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tabControl"
      v-show="isTabControl"></TabControl>
    <Scroll
      class="content"
      ref="scroll"
      :probeType="3"
      @positionY="positionY"
      @pullingUP="pullingUP"
      :pullingUPLoad="true">
      <HomeSwiper
        :banners="banners"
        @swiperLoadOk="swiperLoadOk"></HomeSwiper>
      <RecommendView :recommends="recommends"></RecommendView>
      <FeatureView></FeatureView>
      <TabControl
      :titles="['流行', '新款', '精品']"
      @tabClick="tabClick"
      ref="tabControl2"></TabControl>
      <!-- <GoodsList :goods="goods[currentType[indexClass]]"></GoodsList> -->
      <GoodsList :goods="goods[currentType]"></GoodsList>
    </Scroll>
    <!-- 回到顶部组件 -->
    <!-- 非原生元素监听不起效果  要加修饰符 .native 才行 (监听组件根元素的原生事件) -->
    <BackTop
      @click.native="backTop"
      v-if="isDisplay"></BackTop>
  </div>
</template>

<script>
  import NavBar from '@/components/common/navbar/NavBar'
  import HomeSwiper from '@/views/home/childComps/HomeSwiper'
  import RecommendView from '@/views/home/childComps/RecommendView'
  import FeatureView from '@/views/home/childComps/FeatureView'
  import TabControl from '@/components/content/tabControl/TabControl'
  import GoodsList from '@/components/content/goods/GoodsList'
  import { getHomeMultidata, getHomeGoods } from '@/network/home'
  import Scroll from '@/components/common/scroll/Scroll'
  import BackTop from '@/components/content/backTop/BackTop'
  // 导入混入.js 的文件
  import {itemListemerMixin} from '@/common/mixin'

  export default {
    name: 'Home',
    // 使用混入技术
    mixins: [itemListemerMixin],
    data() {
      return {
        // 根据 下面这个值决定 分类组件 是否显示吸顶效果
        tabOffsetTop: 0,
        // isTabFixed: false,
        // 是否显示tabControl 1 这个组件 默认不显示
        isTabControl: false,
        time: null,
        // 是否显示 回到顶部箭头按钮
        isDisplay: false,
        banners: [],
        recommends: [],
        // 首页下拉商品数据模型设计
        goods: {
          pop: { page: 1, list: [] },
          new: { page: 1, list: [] },
          sell: { page: 1, list: [] },
        },
        // 下面两个组合起来判断出不同的数据展示  pop new sell
        // currentType: ['pop', 'new', 'sell'],
        currentType: 'pop',
        indexClass: 0,
        // 记录滚动的Y坐标位置  页面跳转回来时  记录回到此处 
        saveY:0,
        // 监听的函数
        itemImgListener: null
      }
    },
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      // 滚动插件二次封装使用
      Scroll,
      // 回到顶部封装的组件
      BackTop,
    },
    created() {
      getHomeMultidata().then(res => {
        console.log('res~~~', res)
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
      // 请求不同分页商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
      console.log("Home 页 混入测试");
    },
    // 进入组件时生命周期函数
    activated() {
      // 回到组件  回到离开时记录的 坐标处
      this.$refs.scroll.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()

    },
    // 离开组件时生命周期函数
    deactivated() {
      // 离开时记录 滚动到的区域
      this.saveY = this.$refs.scroll.scroll.y
      console.log("记录Y坐标~~~",this.saveY);
      // 取消全局事件的监听
      this.$bus.$off('imgLoadOk',this.itemImgListener)

    },
    methods: {
      // 监听分类组件距离顶部距离
      swiperLoadOk() {
        console.log('tab2 距离顶部距离~~', this.$refs.tabControl2.$el.offsetTop)
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
      // 监听上拉加载更多
      pullingUP() {
        console.log('上拉加载更多~~')
        // 往列表添加商品数据
        this.getHomeGoods(this.currentType)
      },
      // 实时监听子组件传来的滚动 坐标
      positionY(a) {
        // console.log("坐标~~~",a);  回到顶部操作图标显示
        if (a.y > -1000) {
          this.isDisplay = false
        } else {
          this.isDisplay = true
        }
        if (-a.y > this.tabOffsetTop) {
          this.isTabControl = true
        }else {
          this.isTabControl = false
        }
      },
      // 是否让 流行 新款 精品 组件 1组件 显示

      // 监听儿子的点击事件（tab栏里的不同数据）
      tabClick(index, b, c) {
        console.log('index', index, b, c)
        // this.indexClass = index
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        // 让两个组件 同步点击效果
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      getHomeGoods(type) {
        let page = this.goods[type].page
        getHomeGoods(type, page).then(res => {
          console.log(`商品列表数据${type}`, res.data)
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          // 下拉刷新添加完一次数据 后 要执行一次下面的方法  不然没法二次下拉刷新
          this.$refs.scroll.finishPullUp()
        })
      },
      // 通过标签 ref 事先打好标签  可以调用这个scroll 组件里面的函数  使其回到顶部效果
      backTop() {
        // console.log("top");
        this.$refs.scroll.scrollTop(0, 0)
      },
      // 防抖函数
      // debounce(fun,delay) {
      //   let timer = null
      //   return function(...args) {
      //     if(timer) clearTimeout(timer)
      //     timer = setTimeout(()=>{
      //       fun.apply(this,args)
      //     },delay)
      //   }
      // }

      
    },
  }
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }
  .center {
    /* 使用定义好的常量 */
    background-color: var(--color-tint);
    color: #fff;
    /* 阻止导航栏随着滚动而滚动 用 fixed 定位 */
    /* position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9; */
  }
  /* .lunbo {
    padding-top: 44px;
  } */
  .content {
    overflow: hidden;
    /* 通过定位来控制可控滚动区域  */
    /* 动态确定高度 可以使用定位  也可以用 calc() 这个c3函数来动态计算在不同屏幕下的高度 */
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tabControl {
    position: relative;
    z-index: 99;
  }
</style>
