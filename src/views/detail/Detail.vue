<template>
  <div id="detail">
    <DetailNavBar></DetailNavBar>
    <Scroll class="content" ref="scroll">
      <!-- 详情页顶部商品轮播图 -->
      <DetailSwiper :topImages="topImages"></DetailSwiper>
      <!-- 商品信息 价格什么的 -->
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <!-- 店铺信息 -->
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <!-- 商品详情图片 -->
      <DetailGoodsInfo :detailInfo="detailInfo" @imageLoad="imageLoad"></DetailGoodsInfo>
      <!-- 商品参数信息 -->
      <DetailParamInfo :paramInfo="paramInfo"></DetailParamInfo>
      <!-- 评价信息 -->
      <DetailCommentInfo :comment-info="commentInfo"></DetailCommentInfo>
    </Scroll>
  </div>
</template>

<script>
  import DetailNavBar from '@/views/detail/childComps/DetailNavBar'
  // 不加 {} 会报错
  import { getDetail, Goods, Shop, GoodsParam } from '@/network/detail'
  import DetailSwiper from '@/views/detail/childComps/DetailSwiper'
  import DetailBaseInfo from '@/views/detail/childComps/DetailBaseInfo'
  import DetailShopInfo from '@/views/detail/childComps/DetailShopInfo'
  import Scroll from '@/components/common/scroll/Scroll'
  import DetailGoodsInfo from '@/views/detail/childComps/DetailGoodsInfo'
   import DetailParamInfo from '@/views/detail/childComps/DetailParamInfo.vue'
   import DetailCommentInfo from '@/views/detail/childComps/DetailCommentInfo'
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
      DetailCommentInfo
    },
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
        detailInfo:{},
        // 商品参数信息
        paramInfo: {},
        // 评价信息
        commentInfo: {},

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
		        this.commentInfo = data.rate.list[0];
	        }
      })
    },
    methods: {
      // imageLoad() {
	    // 	this.$refs.scroll.refresh()
      //   // 获取对应的offsetTop
      //   this.themeTops = []
      //   this.themeTops.push(0)
      //   this.themeTops.push(this.$refs.param.$el.offsetTop)
      //   this.themeTops.push(this.$refs.comment.$el.offsetTop)
      //   this.themeTops.push(this.$refs.recommend.$el.offsetTop)
      //   this.themeTops.push(Number.MAX_VALUE)
	    // },
      imageLoad() {
        this.$refs.scroll.refresh()
      }
    }
  }
</script>

<style scoped>

  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
 .content {
  height: calc(100vh - 44px);
  overflow: hidden;
 }
</style>
