<template>
  <Swiper>
    <SwiperItem v-for="item in banners" :key="item.link">
      <a :href="item.link">
        <img :src="item.image" alt="">
      </a>
    </SwiperItem>
  </Swiper>
</template>

<script>
import {Swiper, SwiperItem} from '@/components/common/swiper'
  export default {
    name:'HomeSwiper',
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      // banners:[]
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style>

</style>