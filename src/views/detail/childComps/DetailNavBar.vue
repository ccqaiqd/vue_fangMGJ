<template>
  <div>
    <NavBar>
      <div slot="left" @click="()=>{this.$router.back()}">
        <img src="@/assets/img/common/back.svg" alt="" style="margin-top:12px; margin-left:4px">
      </div>
      <div slot="center" class="center">
        <div v-for="(item, index) in titles" :key="index" class="centerItem" :class="{active: index==cureeindex}"  @click="titleClick(index)"> {{item}} </div>
      </div>
    </NavBar>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
export default {
  name: 'DetailNavBar',
  components: {
    NavBar
  },
  data() {
    return {
      titles:['商品','参数','评论','推荐'],
      cureeindex:0,
    }
  },
  methods: {
     titleClick(index) {
      this.cureeindex = index
     },
     back() {
      this.$router.back()
     }
  }
}
</script>

<style scoped>
  .center {
    display: flex;
  }
  .centerItem {
    flex: 1;
  }
  .active {
    color: var(--color-high-text);
  }
</style>