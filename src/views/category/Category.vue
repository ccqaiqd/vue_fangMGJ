<template>
  <div class="maxBox">
    <!-- 测试滚动插件 -->
    <div
      class="minBox"
      ref="minBox">
      <ul>
        <li>占位--1</li>
        <li>占位--2</li>
        <li>占位--3</li>
        <li>占位--4</li>
        <li>占位--5</li>
        <li>占位--6</li>
        <li>占位--7</li>
        <li>占位--8</li>
        <li>占位--9</li>
        <li>占位--10</li>
        <li>占位--11</li>
        <li>占位--12</li>
        <li>占位--13</li>
        <li>占位--14</li>
        <li>占位--15</li>
        <li>占位--16</li>
        <li>占位--17</li>
        <li>占位--18</li>
        <li>占位--19</li>
        <li>占位--20</li>
        <li>占位--21</li>
        <li>占位--22</li>
        <li>占位--23</li>
      </ul>
    </div>
    <h3>------测试调取手机相册------</h3>
    <Test4 class="test4"></Test4>
    <drawOnAlbum></drawOnAlbum>
    <!-- <input
      type="file"
      accept="image/*"
      capture="camera" />

    <input
      id="fileId2"
      type="file"
      multiple="multiple"
      name="file" />

    <input
      type="file"
      id="#file"
      multiple />
    <div class="show-box"></div>
    <p>===================================</p>
    <input
      type="file"
      accept="image/*"
      multiple />

    <input
      type="file"
      accept="image/*"
      capture="camera" />

    <input
      type="file"
      accept="video/*"
      capture="camcorder" />

    <input
      type="file"
      accept="audio/*"
      capture="microphone" /> -->
  </div>
</template>

<script>
  import BScroll from 'Better-Scroll'
  import axios from 'axios'
  import Test4 from '@/views/test/Test4'
  import DrawOnAlbum from '@/views/test/DrawOnAlbum'

  export default {
    name: 'Category',
    components: {
      Test4,
      DrawOnAlbum,
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
    mounted() {
      // console.log('组件挂载完毕')
      this.scroll = new BScroll(this.$refs.minBox, {
        // 支持惯性滑动坐标位置
        probeType: 3,
        // 下拉刷新
        pullUpLoad: true,
      })
      // 实时监听滚动位置
      this.scroll.on('scroll', position => {
        // console.log(position)
      })
      // 实时监听下拉加载更多
      this.scroll.on('pullingUp', () => {
        console.log('上拉加载更多~~~')
        setTimeout(() => {}, 2000)
      })

      // var input = document.getElementsByTagName('input')[0],
      //   showBox = document.getElementsByClassName('show-box')[0]

      // input.onchange = function () {
      //   var len = this.files.length // 对于input上传的图片，使用dom.files可以获取图片信息
      //   for (let i = 0; i < len; i++) {
      //     let fileImg = new FileReader()
      //     fileImg.readAsDataURL(this.files[i]) // readAsDataURL方法将图片转为base64格式存储于result中
      //     fileImg.onload = function () {
      //       let oImg = new Image()
      //       oImg.src = this.result // 使用FileReader的result属性获取图片base64信息
      //       showBox.appendChild(oImg)
      //     }
      //     fileImg.onerror = function (e) {
      //       console.log('error' + e)
      //     }
      //   }
      // }
    },
  }
</script>

<style scoped>
  .maxBox {
    width: 100vw;
    height: 100vh;
  }
  .minBox {
    width: 100%;
    height: 100px;
    background-color: orange;
    overflow: hidden;
  }
  .test4 {
    width: 100px;
    height: 100px;
    background-color: skyblue;
  }
</style>
