<template>
  <div>
    <NavBar class="center"><div slot="center">购物街</div></NavBar>
    <HomeSwiper :banners="banners"></HomeSwiper>
    <RecommendView :recommends="recommends"></RecommendView>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import HomeSwiper from '@/views/home/childComps/HomeSwiper'
import RecommendView from '@/views/home/childComps/RecommendView'
import {getHomeMultidata} from '@/network/home'
  export default {
    name: "Home",
    data() {
      return {
        banners: [],
        recommends: [],
      }
    },
    components:{
      NavBar,
      HomeSwiper,
      RecommendView
    },
    created() {
      getHomeMultidata().then(res =>{
        console.log('res~~~',res);
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    }
  }
</script>

<style scoped>
  .center {
    /* 使用定义好的常量 */
    background-color: var(--color-tint);
    color: white;
  }
</style>
