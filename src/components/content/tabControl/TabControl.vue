<template>
  <div class="tabControl">
    <div v-for="(item,index) in titles" :key="index" class="tabControlItem" :class="{active: currentIndex === index}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'TabControl',
  data() {
    return {
      currentIndex: 0
    }
  },
  props: {
    titles: {
      type:Array,
      default() {
        return []
      }
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
    }
  },
}
</script>

<style scoped>
  .tabControl {
    display: flex;
    text-align: center;
    line-height: 40px;
    font-size: 15px;
    background-color: #fff;
  }
  .tabControlItem {
    flex: 1;
  }
  .tabControlItem span {
    padding-bottom: 5px;
    
  }
  .active {
    color: var(--color-high-text) ;
    
  }
  .active span {
    border-bottom: 2px solid var(--color-high-text);
  }
</style>