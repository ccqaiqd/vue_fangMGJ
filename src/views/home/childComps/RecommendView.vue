<template>
  <div class="recommendView">
    <div v-for="item in recommends" :key="item.link" class="recommendViewItem">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RecommendView',
    props: {
      recommends: {
        type:Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .recommendView {
    width: 100%;
    display: flex;
    text-align: center;
    font-size: 12px;
    padding: 10px 0 20px;
    border-bottom: 10px solid #eee;
  }
  .recommendViewItem {
    flex: 1;
  }
  .recommendViewItem img {
    width: 70px;
    height: 70px;
    margin-top: 4px;
    margin-bottom: 4px;
  }
</style>