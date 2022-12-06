<template>
  <div id="app">
    <!-- 使用 Keep-alive 使内部组件保持状态 -->
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar />
  </div>
</template>

<script>
  import MainTabBar from './components/mainTabbar/MainTabBar'

  export default {
    name: 'App',
    components: {
      MainTabBar,
    },
  }
</script>

<style>
  @import './assets/css/base.css';
</style>
