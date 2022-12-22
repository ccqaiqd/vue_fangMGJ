<template>
  <div class="cartList">
    <Scroll class="centent" ref="scroll">
      <CartListItem v-for="(item,index) in cartList" :key="index" :item-info="item"></CartListItem>
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
  },
  activated() {
    this.$refs.scroll.refresh()
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