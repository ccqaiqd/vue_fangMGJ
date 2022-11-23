<template>
  <div class="component">
    <div
      id="mobileCamera"
      class="mobileCamera"
      v-loading="loading">
      <!-- 写成 accept="image/png,image/jpeg,image/gif"   时  红米k40 微信浏览器无法打开相册  要写成  accept="image/*"  -->
      <!-- <input type="file" id="image_uploads" multiple=""  class="inputFile" accept="image/png,image/jpeg,image/gif"  > -->
      <!-- <input type="file" id="image_uploads" multiple=""  class="inputFile" accept="image/*"  > -->

      <div
        class="imgPreviewDiv"
        v-show="src">
        <img
          id="mobileCameraPreview"
          :src="src"
          class="imgPreview" />
      </div>
      <img
        src="@/assets/img/common/top.png"
        class="imgCamera"
        v-if="show" />
    </div>
  </div>
</template>

<script>
  import Hammer from 'hammerjs'
  import axios from 'axios'

  export default {
    name: 'Test4',
    props: {},
    computed: {},
    data() {
      return {
        input: undefined,
        src: '',
        show1: false,
        show: true,
        loading: false,

        // 拖动缩放
        imgScale: 1,
        oldScale: 1,
        imgPos: {
          x: 0,
          y: 0,
        },
      }
    },
    mounted() {
      // 图片操作 移动 缩放
      this.zoom()

      this.initNew()
    },

    methods: {
      // 同事写的   移动端 移动、缩放元素
      zoom() {
        var square = this.$el.querySelector('#mobileCameraPreview')
        let that = this
        // Create an instance of Hammer with the reference.
        var hammer = new Hammer(square)
        hammer.get('pinch').set({ enable: true })
        // Subscribe to a quick start event: press, tap, or doubletap.
        // For a full list of quick start events, read the documentation.
        hammer.on('panend', function (e) {
          that.imgPos.x += e.deltaX
          that.imgPos.y += e.deltaY
        })
        hammer.on('pan', function (e) {
          // console.log('pan=====', e)
          square.style.transform = `matrix(${that.imgScale},0,0,${that.imgScale},${that.imgPos.x + e.deltaX},${that.imgPos.y + e.deltaY})`
        })
        hammer.on('pinch', function (e) {
          that.imgScale = Math.max(Math.min(that.oldScale * e.scale, 10), 1)
          square.style.transform = `matrix(${that.imgScale},0,0,${that.imgScale},${that.imgPos.x},${that.imgPos.y})`
        })
        hammer.on('pinchend', function (e) {
          that.oldScale = that.imgScale
        })
      },

      initNew() {
        // input 元素绑定 change 事件
        let mobileCamera = document.querySelector('#mobileCamera')
        let input = document.createElement('input')
        input = document.body.appendChild(input)
        input.type = 'file'
        input.id = 'image_uploads'
        input.className = 'inputFile'
        input.multiple = true
        input.accept = 'image/png,image/jpeg,image/gif'
        input.style.width = '1%'
        input.style.height = '1%'
        input.style.position = 'absolute'
        input.style.opacity = 0
        input.addEventListener('change', this.updateImageDisplay)

        //  在ios系统上 出现了  第一次点击，经常无法触发change事件的情况
        // 参考  https://stackoverflow.com/questions/47664777/javascript-file-input-onchange-not-working-ios-safari-only
        //  将下面这两行  和  template 里的  <input> 元素注释掉  换成上面这个 createElement('input')
        // this.input = document.querySelector('#image_uploads')
        // this.input.addEventListener('change', this.updateImageDisplay)
        // 用 tab 换掉 click ，click在ios safari浏览器上有 单击失效，需要双击  的问题
        this.bindTapEvent(mobileCamera, e => {
          input.click()
        })
      },
      // 参考 https://blog.csdn.net/qq_42309685/article/details/102526869
      bindTapEvent(dom, callback) {
        var startTime = 0
        var isMove = false
        dom.addEventListener('touchstart', function () {
          startTime = Date.now()
          console.log(startTime)
        })
        dom.addEventListener('touchmove', function () {
          isMove = true
        })
        dom.addEventListener('touchend', function (e) {
          console.log(Date.now() - startTime)
          if (Date.now() - startTime < 250 && isMove == false) {
            callback && callback.call(this, e)
          } else {
            console.log('失败')
          }
          isMove = false
          startTime = 0
        })
      },
      imgClick() {
        this.input.click()
      },
      updateImageDisplay() {
        let _this = this
        this.loading = true

        const curFiles = this.input.files
        if (curFiles.length === 0) {
          // no file
        } else {
          for (const file of curFiles) {
            // 方法1  上传后台  返回服务器端图片地址 赋值给 src
            var formData = new FormData()
            formData.append('files', file)
            axios({
              method: 'post',
              url: 'https://xxxxxx/api/ossupload/uploadFile',
              data: formData,
            }).then(res => {
              console.log(res.data.data[0].path)
              _this.show1 = true
              _this.show = false
              _this.$nextTick(() => {
                _this.src = res.data.data[0].path
                _this.loading = false

                // 图片操作相关
                _this.imgScale = 1
                _this.oldScale = 1
                _this.imgPos = {
                  x: 0,
                  y: 0,
                }
                _this.$el.querySelector('#mobileCameraPreview').style.transform = `matrix(1,0,0,1,0,0)`
              })
            })

            // 方法2  读成 base64 赋值给 src
            // var reader = new FileReader()
            // reader.readAsDataURL(file)
            // reader.onload = function () {
            //   _this.show1 = true
            //   _this.show = false
            //   _this.$nextTick(()=>{
            //     _this.src = this.result
            //     _this.imgScale = 1
            //     _this.oldScale = 1
            //     _this.imgPos = {
            //       x: 0,
            //       y: 0
            //     }
            //     _this.$el.querySelector('#mobileCameraPreview').style.transform = `matrix(1,0,0,1,0,0)`
            //   })
            // }
          }
        }
      },
    },
  }
</script>

<style scoped>
  .component {
    width: 100%;
    height: 100%;
  }
  .mobileCamera {
    width: 100%;
    height: 100%;
    cursor: pointer;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .imgPreviewDiv {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    box-shadow: 0 0 15px 10px #d5d1a775;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .imgPreview {
    width: 100%;
    box-shadow: 0 0 15px 10px #d5d1a775;
  }
  .imgCamera {
    width: 80px;
    height: 80px;
  }
  .inputFile {
    width: 1%;
    height: 1%;
    position: absolute;
    opacity: 0;
  }
</style>
