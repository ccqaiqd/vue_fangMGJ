<template>
  <div id="home">
    <NavBar class="center">
      <div slot="center">购物街</div>
    </NavBar>
    <Scroll class="content" ref="scroll">
      <HomeSwiper :banners="banners" class="lunbo"></HomeSwiper>
      <RecommendView :recommends="recommends"></RecommendView>
      <FeatureView></FeatureView>
      <TabControl class="tabControl" :titles="['流行', '新款', '精品']" @tabClick="tabClick"></TabControl>
      <GoodsList :goods="goods[currentType[this.indexClass]]"></GoodsList>
    </Scroll>
    <!-- 回到顶部组件 -->
    <!-- 非原生元素监听不起效果  要加修饰符 .native 才行 -->
    <BackScroll  @click.native="backTop"></BackScroll>
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
import BackScroll from '@/components/content/backScroll/BackScroll'

export default {
  name: 'Home',
  data() {
    return {
      banners: [],
      recommends: [],
      // 首页下拉商品数据模型设计
      goods: {
        pop: { page: 1, list: [] },
        new: { page: 1, list: [] },
        sell: { page: 1, list: [] }
      },
      // 下面两个组合起来判断出不同的数据展示  pop new sell
      currentType: ['pop', 'new', 'sell'],
      indexClass: 0
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
    BackScroll
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
  methods: {
    // 监听儿子的点击事件（tab栏里的不同数据）
    tabClick(index, b, c) {
      console.log('index', index, b, c)
      this.indexClass = index
    },
    getHomeGoods(type) {
      let page = this.goods[type].page
      getHomeGoods(type, page).then(res => {
        console.log(`商品列表数据${type}`, res.data)
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
      })
    },
    // 通过标签 ref 事先打好标签  可以调用这个scroll 组件里面的函数  使其回到顶部效果
    backTop() {
      console.log("top");
      this.$refs.scroll.scrollTop(0,0)
    }
  }
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
  color: white;
  /* 阻止导航栏随着滚动而滚动 用 fixed 定位 */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}
.lunbo {
  padding-top: 44px;
}
.tabControl {
  position: sticky;
  top: 44px;
}
.content {
  /* height: 300px; */
  /* background-color: red; */
  overflow: hidden;
  /* 通过定位来控制可控滚动区域  */
  
  /* 动态确定高度 可以使用定位  也可以用 calc() 这个c3函数来动态计算在不同屏幕下的高度 */
  position:absolute;
  /* top: 44px; */
  top: 0px;
  bottom: 49px;
  left: 0;
  right: 0;

}

</style>
