import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('@/views/home/Home')
const Category = () => import('@/views/category/Category')
const Cart = () => import('@/views/cart/Cart')
const Profile = () => import('@/views/profile/Profile')
const Test = () => import('@/views/test/Test')

// 1.安装插件
Vue.use(VueRouter)

// 2.创建路由对象
const routes = [
  {
    path: '',
    redirect: '/test'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  // 测试页面路由
  {
    path: '/test',
    component: Test
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})

// 3.导出router
export default router
