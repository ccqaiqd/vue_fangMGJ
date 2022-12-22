<template>
  <div>
    <!-- <TestTow></TestTow>
    <br />
    <br />
    <br />
    <TestThree></TestThree> -->
    <!-- 导航 -->
    <NavBar class="navBar">
      <div slot="center" >购物车({{cartLength}})</div>
    </NavBar>
    <!-- 商品的列表 -->
    <CartList></CartList>
    <!-- 底部汇总 -->
    <CartBottomBar></CartBottomBar>
  </div>
</template>

<script>
  import TestTow from '@/views/test/TestTow'
  import TestThree from '@/views/test/TestThree'
  import NavBar from '@/components/common/navbar/NavBar'
  // 把vuex中的计算属性直接映射过来用
  import {mapGetters} from 'vuex'
  import CartList from '@/views/cart/childComps/CartList'
  import CartBottomBar from '@/views/cart/childComps/CartBottomBar'
  export default {
    name: 'Cart',
    components: {
      TestTow,
      TestThree,
      NavBar,
      CartList,
      CartBottomBar
    },

    computed: {
      // 把vuex中的计算属性直接映射过来用
      ...mapGetters(['cartLength'])
    }
  }
</script>

<style scoped>
.navBar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
