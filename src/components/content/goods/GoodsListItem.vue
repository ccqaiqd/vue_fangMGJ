<template>
  <div class="goodsListItem" @click="goDetail">
    <div>
      <img
        class="test"
        :src="goodsItem.show.img"
        alt="" 
        @load="ingLoadOk"/>
      <p class="aLineEllipsis">{{ goodsItem.title }}</p>
      <span style="padding-right: 25px">收藏</span>
      <span @click="collection(isCollection)">
        <img
          v-if="isCollection"
          class="test2"
          src="@/assets/img/common/collection.svg"
          alt="" />
        <img
          v-else
          class="test2"
          src="@/assets/img/common/collection2.svg"
          alt="" />
      </span>
      <span>{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GoodsListItem',
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        },
      },
    },
    data() {
      return {
        isCollection: true,
      }
    },
    methods: {
      collection(isCollection) {
        this.isCollection = !this.isCollection
      },
      ingLoadOk() {
        this.$bus.$emit('imgLoadOk')
      },
      goDetail() {
        this.$router.push({
          path:'/detail',
          query: {
            iid: this.goodsItem.iid
          }
        })
      }
    },
  }
</script>

<style scoped>
  .goodsListItem {
    text-align: center;
    font-size: 12px;
    width: 48%;
    height: 300px;
    background-color: orange;
    margin: 2px;
  }
  .test {
    width: 100%;
    height: 250px;
    border-radius: 5px;
  }
  .aLineEllipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  /* .collection {
    position: relative;
  } */
  /* 伪元素方式展现收藏五角星 */
  /* .collection::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url('@/assets/img/common/collection.svg') 0 0/14px 14px;
  } */
  .test2 {
    width: 14px;
    height: 14px;
    /* vertical-align: middle; */
  }
</style>
