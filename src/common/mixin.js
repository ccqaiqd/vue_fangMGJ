export const itemListemerMixin = {
  // 写一些多个组件都重复使用的东西  包括且不限于 data 各个生命周期钩子函数  事件···
  mounted() {
    // 监听孙组件里的图片是否加载完成  实时更新可滚动区域 解决BS 的滚动 bug （通过全局事件总线实现 爷孙事件通信）
    this.itemImgListener = () => {
      // console.log("图片加载完成");
      // refresh() 重新计算可滚动区域
      // 拿 refs 里的东西 最好不要从 created周期里 （可能没有创建出来还） 最好在 mounted周期里
      // this.$refs.scroll.refresh()
      // 防抖 2秒内只执行一次
      // this.debounce(this.$refs.scroll.refresh,2000)

      this.testDebounce()
    }
    this.$bus.$on('imgLoadOk',this.itemImgListener )
    // 拿到这个组件距离顶部距离 小于多少让其吸顶
    // console.log("tab2 距离顶部距离~~",this.$refs.tabControl2.$el.offsetTop);
    console.log("~~~~~~~~~~~~~~~~~,混入混入 mixin Vue高级技术方便各组件之间复用代码  类似于类的继承  但在对象中使用混入  ");
  }, 
  methods: {
    // 未封装的 防抖用法
    testDebounce() {
      // let time = null
      if (this.time !== null) {
        clearTimeout(this.time)
      }
      this.time = setTimeout(() => {
        this.$refs.scroll.refresh()
      }, 1000)
    },
  },
  

}