<template>
<!-- 滾動插件 BScroll 的二次封装使用 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll"
export default {
  naem:'Scroll',
  data() {
    return {
      scroll:null,
    }
  },
  // 组件挂载完毕再操作DOM元素 不然无效
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper,{

    })
  },
  methods:{
    // 点击回到 x y 坐标处 （0，0 回到顶部）
    scrollTop(x,y,time=300) {
      this.scroll.scrollTo(x,y,time)
    }
  }
}
</script>

<style scoped>
</style>