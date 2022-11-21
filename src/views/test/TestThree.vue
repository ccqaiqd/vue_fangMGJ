<template>
  <div>
    <!--  -->
    <!-- <el-table :data="tableData">
      <el-table-column
        prop="sys_username"
        label="登录账号"
        align="center"></el-table-column>
      <el-table-column
        prop="sys_nickname"
        label="昵称"
        align="center"></el-table-column>
      <el-table-column
        prop="sys_phone"
        label="手机号码"
        align="center"></el-table-column>
      <el-table-column
        prop="sys_usertype"
        label="账号类型"
        align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sys_usertype == 1 ? '超级管理员' : scope.row.sys_usertype === 2 ? '管理员' : '用户' }}</span>
        </template>
      </el-table-column>
    </el-table> -->
    <p>数据展示~~~~</p>
    <h6>
      {{ dataList }}
    </h6>
  </div>
</template>

<script>
  export default {
    naem: 'TestThree',
    data() {
      return {
        keyword: '',
        pageIndex: 1,
        pageSize: 10,
        tableData: [],
        total: 0,

        // 保存请求回来的数据 前端直连MySQL
        dataList: [],
      }
    },
    created() {
      this.getlist()
    },
    methods: {
      getlist() {
        let params = {
          keyword: this.keyword,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        }
        // 这里使用http://localhost:3000是因为配置地方监听的3000端口
        // /api/sysuser 这一部分也是在index.js中引入配置的
        // /getlist 是在api接口里面的方法
        // 整个三部分组合成立通常使用的接口
        // 其中 前面地址部分可以自己全局去定义，同样$http(axios)也可以封装
        this.$axios
          .get('http://localhost:3000/api/sysuser/getlist', { params: params })
          .then(response => {
            console.log(response)
            this.dataList = response.data.data
            if (response.status == 200) {
              let datas = response.data
              this.tableData = datas.data
              this.total = datas.total
            } else {
              console.log(response)
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
    },
  }
</script>

<style scoped></style>
