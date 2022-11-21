<template>
  <!-- 测试 vue 直接连接数据库进行 增删改查系列操作 -->
  <div>
    <p>vue 直连数据库进行 CURD</p>
    <div class="dataList">
      <ul>
        <li>1示例</li>
        <li>2示例</li>
        <li>3示例</li>
        <li>4示例</li>
        <li>5示例</li>
        <li>6示例</li>
        <li>7示例</li>
        <li>8示例</li>
        <li>9示例</li>
        <li>10示例</li>
      </ul>
    </div>
    <div class="caozuo">
      <nut-row>
        <nut-col :span="6">
          <nut-button>新增</nut-button>
        </nut-col>
        <nut-col :span="6">
          <nut-button
            type="actived"
            color="skyblue"
            >删除</nut-button
          >
        </nut-col>
        <nut-col :span="6">
          <nut-button>修改</nut-button>
        </nut-col>
        <nut-col :span="6">
          <nut-button
            type="actived"
            color="skyblue"
            >查找</nut-button
          >
        </nut-col>
      </nut-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TestTwo',
  }
</script>

<style scoped>
  .dataList {
    margin-top: 16px;
    padding: 5px;
    border: 2px solid red;
  }
  .caozuo {
    width: 100%;
    margin-top: 16px;
  }
</style>
