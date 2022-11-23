<template>
  <div class="drawOnAlbum">
    <!-- <span>选择多张图片~</span> -->
    <div id="imgPreview">
      <div id="prompt3">
        <div id="imgSpan">点击上传</div>
        <input
          type="file"
          id="file"
          class="filepath"
          @change="changepic"
          accept="image/*" />
        <button
          id="imgSpan"
          type="button"
          @click="clearpic">
          重新上传
        </button>
      </div>
      @*此处用js自动插入图片标签<img
        src=""
        id="img3" />*@
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DrawOnAlbum',
    methods: {
      changepic() {
        var reads = new FileReader()
        f = document.getElementById('file').files[0]
        reads.readAsDataURL(f)
        reads.onload = function (e) {
          var y = document.createElement('img')
          y.id = 'img3'
          y.src = this.result
          $('#imgPreview').append(y)
        }
      },
      clearpic() {
        var x = document.getElementById('imgPreview')
        var count = x.childElementCount
        alert(count)
        for (var i = 1; i < count; i++) {
          x.removeChild(x.children[1])
        }
      },
    },
  }
</script>

<style lang="less" scoped>
  .drawOnAlbum {
    width: 100px;
    height: 100px;
    background-color: pink;
  }

  #imgPreview {
    width: 100%;
    height: 120px;
    margin: 10px auto 0px auto;
    border: 0.5px solid #ced4da;
    text-align: left;
    vertical-align: central;
  }
  #prompt3 {
    height: 30px;
    width: 200px;
    position: relative;
  }
  /* -》》 两个按钮的样式 */
  #imgSpan {
    position: relative;
    height: 30px;
    background: #fff; /*#ccc;*/
    border: 1px solid #333;
    left: 0;
    top: 1px;
    padding: 5px 10px;
    overflow: hidden;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
    border-radius: 20px;
    color: #333;
    font-size: 13px;
    display: inline;
  }
  /* -》》绝对布局 
  -》》 透明度设置为0，即隐藏
}
*/
  .filepath {
    position: absolute;
    left: 0;
    top: 0;
    height: 30px;
    width: 80px;
    opacity: 0;
    #img3 {
      position: relative;
      height: 90px;
      width: 90px;
      padding: 2px;
      display: inline;
    }
  }
  /* -》》inline是为了让所有图片不换行 */
  // .filepath #img3 {
  //   position: relative;
  //     height: 90px;
  //     width: 90px;
  //     padding: 2px;
  //     display: inline;
  // }
</style>
