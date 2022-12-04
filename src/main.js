import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/config/lazy-load'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$axios = axios

// 给 vue 原型上添加一个 $bus 属性  实现任意组件间的事件通信  也就是全局事件总线功能的实现
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

// console.log("~~~~~~~~~~~~");
// let a = setTimeout(()=>{
//   console.log("延时1,5");
// },200)
// console.log("aaaaaaaaaaaa~~~~~~",a);