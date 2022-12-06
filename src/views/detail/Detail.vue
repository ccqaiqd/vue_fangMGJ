<template>
  <div>
    <DetailNavBar></DetailNavBar>
    <!-- 详情页顶部商品轮播图 -->
    <DetailSwiper :topImages="topImages"></DetailSwiper>
  </div>
</template>

<script>
import DetailNavBar from '@/views/detail/childComps/DetailNavBar'
// 不加 {} 会报错 
import  {getDetail}  from '@/network/detail'
import DetailSwiper from '@/views/detail/childComps/DetailSwiper'
export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper
  },
  data() {
    return {
      iid: null,
      // 报错顶部轮播图图片 res 数据处理(拿出来)
      topImages: []
    }
  },
  created() {
    this.iid = this.$route.query.iid
    // console.log("iid~~",this.$route.query.iid);
    console.log("iid~~2",this.iid);
    // 请求商品详情数据
    getDetail(this.iid).then(res => {
      console.log("商品详情数据~~",res);
      this.topImages = res.result.itemInfo.topImages
    })
  }
}
</script>

<style>

</style>