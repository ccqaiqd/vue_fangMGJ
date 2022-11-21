<template>
  <div>
    <TestTow></TestTow>
    <br />
    <br />
    <br />
    <TestThree></TestThree>
  </div>
</template>

<script>
  import TestTow from '@/views/test/TestTow'
  import TestThree from '@/views/test/TestThree'
  export default {
    name: 'Cart',
    components: {
      TestTow,
      TestThree,
    },
  }
</script>

<style scoped></style>
