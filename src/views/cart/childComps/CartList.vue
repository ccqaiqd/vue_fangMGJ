<template>
  <div class="cartList">
    <Scroll class="centent">
      <CartListItem v-for="(item,index) in cartList" :key="index" :product="item"></CartListItem>
      <!-- <li v-for="item in cartList">{{item}}</li> -->
    </Scroll>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Scroll from '@/components/common/scroll/Scroll'
import CartListItem from '@/views/cart/childComps/CartListItem'
export default {
  name:'CartList',
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  }
}
</script>

<style>
.cartList {
  height: 100vh;
}
.centent {
  height: calc(100% - 44px - 49px );
  overflow: hidden;
}
</style>