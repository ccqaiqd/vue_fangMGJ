<template>
  <div id="detail">
    <DetailNavBar @titleClick="titleClick" ref="nav"></DetailNavBar>
    <!-- <div>{{$store.state.cartList.length}}</div> -->
    
    <Scroll
      class="content"
      :probeType="3"
      @positionY="contentScroll"
      ref="scroll">
      <ul>
        <li v-for="(item,index) in $store.state.cartList" :key="index">{{item}}</li>
      </ul>
      <!-- 详情页顶部商品轮播图 -->
      <DetailSwiper :topImages="topImages"></DetailSwiper>
      <!-- 商品信息 价格什么的 -->
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <!-- 店铺信息 -->
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <!-- 商品详情图片 -->
      <DetailGoodsInfo
        :detailInfo="detailInfo"
        @imageLoad="imageLoad"></DetailGoodsInfo>
      <!-- 商品参数信息 -->
      <DetailParamInfo
        ref="paramInfo"
        :paramInfo="paramInfo"></DetailParamInfo>
      <!-- 评价信息 -->
      <DetailCommentInfo
        ref="comment"
        :comment-info="commentInfo"></DetailCommentInfo>
      <!-- 底部推荐瀑布流信息 -->
      <GoodsListArray
        ref="goods"
        :goods="recommends"></GoodsListArray>
    </Scroll>
    <DetailBottomBar @addToCart="addToCart"></DetailBottomBar>
    <BackTop
      @click.native="backTop"
      v-if="isDisplay"></BackTop>
  </div>
</template>

<script>
  import DetailNavBar from '@/views/detail/childComps/DetailNavBar'
  // 不加 {} 会报错
  import { getDetail, Goods, Shop, GoodsParam, getRecommend } from '@/network/detail'
  import DetailSwiper from '@/views/detail/childComps/DetailSwiper'
  import DetailBaseInfo from '@/views/detail/childComps/DetailBaseInfo'
  import DetailShopInfo from '@/views/detail/childComps/DetailShopInfo'
  import Scroll from '@/components/common/scroll/Scroll'
  import DetailGoodsInfo from '@/views/detail/childComps/DetailGoodsInfo'
  import DetailParamInfo from '@/views/detail/childComps/DetailParamInfo.vue'
  import DetailCommentInfo from '@/views/detail/childComps/DetailCommentInfo'
  import GoodsListArray from '@/components/content/goods/GoodsListArray'
  import DetailBottomBar from '@/views/detail/childComps/DetailBottomBar'
  import BackTop from '@/components/content/backTop/BackTop'
  import { itemListemerMixin, backTopMixin } from '@/common/mixin'
  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsListArray,
      DetailBottomBar
    },
    // 混入 mixins
    mixins: [itemListemerMixin, backTopMixin],
    data() {
      return {
        iid: null,
        // 报错顶部轮播图图片 res 数据处理(拿出来)
        topImages: [],
        // 商品信息 多个对象整合在了一起 方便组件传递使用
        goods: {},
        // 店铺信息
        shop: {},
        // 商品详情图片
        detailInfo: {},
        // 商品参数信息
        paramInfo: {},
        // 评价信息
        commentInfo: {},
        // 底部推荐信息瀑布列表
        recommends: [],
        // 跳动到数组对应的Y坐标实现锚点联动的效果
        themeTopYs: [],
        // 滚到相关锚点 标题高了的区分
        currentIndex: 0
      }
    },
    created() {
      this.iid = this.$route.query.iid
      // console.log("iid~~",this.$route.query.iid);
      console.log('iid~~2', this.iid)
      // 请求商品详情数据
      getDetail(this.iid).then(res => {
        console.log('商品详情数据~~', res)
        const data = res.result
        this.topImages = data.itemInfo.topImages
        // 获取商品基本信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // console.log("shangpin~~",this.goods);
        // 店铺信息
        this.shop = new Shop(data.shopInfo)
        // 商品详情图片
        this.detailInfo = data.detailInfo
        // 商品参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        // 7.保存评论数据
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0]
        }
      })
      // 详情页底部推荐数据请求
      getRecommend().then(res => {
        this.recommends = res.data.list
      })
    },
    methods: {
      // 加入购物车相关
      addToCart() {
        // 获取购物车界面需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid
        console.log("点击了加入购物车~",product);
        // this.$store.commit('addCart',product)
        this.$store.dispatch('addCart',product)
      },
      // 监听顶部导航栏的点击（子告诉父点击了第几个 方便锚点联动跳到对应的内容区域）
      titleClick(index) {
        console.log('顶部导航栏~~', index)
        this.$refs.scroll.scroll.scrollTo(0, -this.themeTopYs[index] + 44, 500)
      },
      imageLoad() {
        // 重新计算可滚动 高度
        this.$refs.scroll.refresh()
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.paramInfo.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.goods.$el.offsetTop)
        console.log('坐标Y值~~', this.themeTopYs)
      },
      // 监听BScroll 滚动
      contentScroll(position) {
        console.log('滚动Y值~', position)
        let positionY = -position.y
        if (-positionY > -1000) {
          this.isDisplay = false
        } else {
          this.isDisplay = true
        }
        let length = this.themeTopYs.length
        // for in 遍历数组的键 
        for(let i = 0; i< this.themeTopYs.length; i++) {
          if(this.currentIndex != i && ((i<length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i == length -1 && positionY >= this.themeTopYs[i]))) {
            // console.log("i##~~",i);
            this.currentIndex = i
            //  console.log("i##~~", this.currentIndex);
            this.$refs.nav.cureeindex = this.currentIndex

          }
        }
        // for of 遍历数组的值
        // for(let i of this.themeTopYs) {
        //   console.log("i~~~",i);
        // }
      },
    },
    mounted() {
      console.log('测试混入技术 本Detail页')
    },
    destroyed() {
      this.$bus.$off('imgLoadOk', this.itemImgListener)
    },
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    height: calc(100vh - 44px - 58px);
    overflow: hidden;
  }
</style>
