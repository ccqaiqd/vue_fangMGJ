<template>
  <Swiper>
    <SwiperItem v-for="item in banners" :key="item.link">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="swiperLoadOk">
      </a>
    </SwiperItem>
  </Swiper>
</template>

<script>
import {Swiper, SwiperItem} from '@/components/common/swiper'
  export default {
    name:'HomeSwiper',
    data() {
      return {
        emitOne: true,
      }
    },
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
    },
    methods:{
      // 性能优化 发送一次图片加载完毕告诉父组件就行
      swiperLoadOk() {
        if(this.emitOne) {
          this.$emit('swiperLoadOk')
          this.emitOne = false
        }
        
      }
    }
  }
</script>

<style>

</style>