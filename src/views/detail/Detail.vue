<template>
  <div>
    <DetailNavBar></DetailNavBar>
    <!-- 详情页顶部商品轮播图 -->
    <DetailSwiper :topImages="topImages"></DetailSwiper>
    <!-- 商品信息 价格什么的 -->
    <DetailBaseInfo :goods="goods"></DetailBaseInfo>
  </div>
</template>

<script>
import DetailNavBar from '@/views/detail/childComps/DetailNavBar'
// 不加 {} 会报错 
import  {getDetail,Goods}  from '@/network/detail'
import DetailSwiper from '@/views/detail/childComps/DetailSwiper'
import DetailBaseInfo from '@/views/detail/childComps/DetailBaseInfo'
export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo
  },
  data() {
    return {
      iid: null,
      // 报错顶部轮播图图片 res 数据处理(拿出来)
      topImages: [],
      // 商品信息 多个对象整合在了一起 方便组件传递使用
      goods:null
    }
  },
  created() {
    this.iid = this.$route.query.iid
    // console.log("iid~~",this.$route.query.iid);
    console.log("iid~~2",this.iid);
    // 请求商品详情数据
    getDetail(this.iid).then(res => {
      console.log("商品详情数据~~",res);
      const data = res.result
      this.topImages = data.itemInfo.topImages
      // 获取商品基本信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      // console.log("shangpin~~",this.goods);
    })
  }
}
</script>

<style>

</style>