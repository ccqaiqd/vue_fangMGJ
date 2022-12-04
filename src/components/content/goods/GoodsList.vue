<template>
  <div class="goodsList">
    <GoodsListItem
      v-for="(item,index) in goods.list"
      :key="index"
      :goodsItem="item"></GoodsListItem>
  </div>
</template>

<script>
  import GoodsListItem from '@/components/content/goods/GoodsListItem'
  export default {
    name: 'GoodsList',
    props: {
      goods: {
        type: Object,
        default() {
          return {}
        },
      },
    },
    components: {
      GoodsListItem,
    },
  }
</script>

<style>
  .goodsList {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100vw;
    /* height: 888px; */
    background-color: pink;
  }
</style>
