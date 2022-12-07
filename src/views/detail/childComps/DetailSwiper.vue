<template>
<!-- 商品详情页的顶部轮播图 -->
  <Swiper class="swiper-img-height">
    <SwiperItem v-for="(item, index) in topImages" :key="index">
      <img :src="item" alt="">
    </SwiperItem>
  </Swiper>
</template>

<script>
import {Swiper,SwiperItem} from '@/components/common/swiper'
export default {
  name:'DetailSwiper',
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages:{
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.seiper-img-height {
  height: 600px;
  overflow: hidden;
}

</style>