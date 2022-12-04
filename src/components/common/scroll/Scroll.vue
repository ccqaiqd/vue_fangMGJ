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
  props:{
    // 是否监听滚动坐标
    probeType:{
      type:Number,
      default:0 //根据传入的 这个属性值 决定这个页面要不要实时监听 3表示监听
    },
    // 是否监听上拉加载更多
    pullingUPLoad:{
      type:Boolean,
      default:false
    }
    
  },
  data() {
    return {
      scroll:null,
    }
  },
  // 组件挂载完毕再操作DOM元素 不然无效
  mounted() {
    // 创建BScroll d对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      click:true,
      probeType:this.probeType, // 等于3 可以实时监听滚动
      pullUpLoad:this.pullingUPLoad
      
    })
    // 监听滚动坐标
    this.scroll.on('scroll',position => {
      // console.log(position);
      this.$emit('positionY',position)
    })
    // 监听下拉加载更多
    this.scroll.on('pullingUp',()=> {
      this.$emit('pullingUP')
    })

  },
  methods:{
    // 点击回到 x y 坐标处 （0，0 回到顶部）
    scrollTop(x,y,time=300) {
      this.scroll.scrollTo(x,y,time)
    },
    // 多次下拉刷新 下一次可以刷新 要先执行一下下面的方法
    finishPullUp() {
      this.scroll.finishPullUp()

      this.scroll.refresh()
    },
    // 重新计算可滚动区域
    refresh() {
      console.log("----------------");
      this.scroll.refresh()
    }
  }
}
</script>

<style scoped>
</style>