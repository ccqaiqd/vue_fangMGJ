<template>
  <div class="maxBox">
    <h3>category 页</h3>
  </div>
</template>

<script>
  export default {
    name: 'Category',
    components: {
    },
    created() {
      // Mock 数据请求测试（成功）
      // axios
      //   .get('https://api.mocksys.com/api/v1/mock/20101/get/test')
      //   .then(res => {
      //     console.log('测试数据Mock', res)
      //   })
      //   .catch(err => {
      //     console.log('错误~~~~', err.message)
      //   })
    },
    
  }
</script>

<style scoped>
  .maxBox {
    width: 100vw;
    height: 100vh;
    background-color: purple;
  }
</style>
