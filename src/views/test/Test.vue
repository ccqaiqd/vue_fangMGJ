<template>
  <div class="maxBox">
    <!-- 测试页 -->
    <nut-swiper
      direction="vertical"
      :loop="true"
      @slideChangeEnd="onChange">
      <div
        class="nut-swiper-slide gray"
        v-for="(item, index) in videoList"
        :key="item.iid">
        <video
          class="video_box"
          width="100%"
          height="100%"
          webkit-playsinline="true"
          x5-playsinline=""
          x5-video-player-type="h5"
          x5-video-player-fullscreen=""
          playsinline
          preload="auto"
          :src="item.url"
          x-webkit-airplay="allow"
          x5-video-orientation="portrait"
          :autoplay="playFirst(index + 1)"
          @click="pauseVideo"></video>
        <!-- 封面 -->
        <!-- <img v-show="isVideoShow" class="play" @click="playvideo" :src="item.cover" /> -->
        <!-- 播放暂停按钮 -->
        <img
          v-show="iconPlayShow"
          class="icon_play"
          @click="playvideo"
          src="~@/assets/img/live/icon_play.png" />
      </div>
    </nut-swiper>
  </div>
</template>

<script>
  // 注意：这种方式将会导入所有组件
  // import Vue from 'vue'
  // import NutUI from '@nutui/nutui'
  // import '@nutui/nutui/dist/nutui.css'

  // NutUI.install(Vue)
  export default {
    name: 'VideoTest',
    data() {
      let u = navigator.userAgent
      return {
        current: 1,
        videoList: [
          {
            iid: 'a001',
            url: 'https://video.pearvideo.com/mp4/third/20201113/cont-1706821-15126082-111655-hd.mp4',
            cover: 'https://image-cn2.tvcbook.com/v7/image/2020/11/13/8a7b666e-0ac8-4e34-b549-8360b1569e54.png!cover-780-439?x-oss-process=image/crop,x_0,y_72,w_1080,h_608,g_nw',
            follow: false,
            loveCount: 24,
            shareCount: 12,
          },
          {
            iid: 'a002',
            url: 'https://video.pearvideo.com/mp4/third/20201114/cont-1707004-15488237-105621-hd.mp4',
            cover: 'https://image-cn2.tvcbook.com/daq/2020/11/12/de65881c-24b0-11eb-84ef-02420a0008fb.png!cover-780-439',
            follow: false,
            loveCount: 28,
            shareCount: 2,
          },
          {
            iid: 'a003',
            url: 'https://video.pearvideo.com/mp4/third/20201117/cont-1707360-15126082-105138-hd.mp4',
            cover: 'https://image-cn2.tvcbook.com/v7/thumbs/17e6bd9a691e4066b94feb8c5e0c2e84-mp4-hd/snapshots/17e6bd9a691e4066b94feb8c5e0c2e84-00053.jpg!cover-780-439',
            follow: false,
            loveCount: 48,
            shareCount: 23,
          },
          {
            iid: 'a004',
            url: 'https://video.pearvideo.com/mp4/third/20201111/cont-1706407-15488237-112532-hd.mp4',
            cover: 'https://image-cn2.tvcbook.com/v7/image/2020/11/17/73fdf11d-ea43-4a5c-b864-e8082af3d8c0.JPG!cover-780-439?x-oss-process=image/crop,x_0,y_0,w_1920,h_1080,g_nw',
            follow: false,
            loveCount: 68,
            shareCount: 29,
          },
          {
            iid: 'a005',
            url: 'https://video.pearvideo.com/mp4/third/20201124/cont-1708555-15126082-104309-hd.mp4',
            cover: 'https://image-cn2.tvcbook.com/daq/2020/11/17/7c7b0cbc-2893-11eb-9c33-02420a0008fb.png!cover-780-439',
            follow: false,
            loveCount: 168,
            shareCount: 129,
          },
          {
            iid: 'a006',
            url: 'https://video.pearvideo.com/mp4/third/20201124/cont-1708555-15126082-104309-hd.mp4',
            cover: 'https://image-cn2.tvcbook.com/daq/2020/11/17/d73b7026-287d-11eb-9c33-02420a0008fb.png!cover-780-439',
            follow: false,
            loveCount: 18,
            shareCount: 1,
          },
        ],
        isVideoShow: false,
        playOrPause: false,
        video: null,
        iconPlayShow: false,
        isAndroid: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
        isiOS: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        tabIndex: 0,
        showShareBox: false,
        loveCount: 0,
      }
    },
    // created() {
    //   let video = document.querySelectorAll('video')[this.current]
    //   console.log("play~~~~~~~~~",video.play());
    // },
    // mounted() {
    //   // this.pau seVideo()
    //   console.log("组件挂载完毕~~~");
    //   let videoEndNub = document.querySelectorAll('video').length - 1
    //   let videoEnd = document.querySelectorAll('video')[videoEndNub]
    //   console.log("------",videoEnd);
    //   // videoEnd.window.pause()
    //   window.videoEnd.pause()
    // },
    methods: {
      // 播放第一个视频
      playFirst(index) {
        console.log('index~~~~~', index)
        if (index == 1) {
          return true
        } else {
          return false
        }
      },
      // onChange2(a, b) {
      //   console.log('测试参数', a, b)
      // },
      //滑动改变播放的视频
      onChange(index) {
        //改变的时候 暂停当前播放的视频
        let video = document.querySelectorAll('video')[this.current]
        // let video2 = document.querySelectorAll('video')[0]
        console.log('video~~~~~~~~', video)
        // video.muted = true
        video.pause()
        this.playOrPause = false
        this.current = index
        if (this.isiOS) {
          //ios切换直接自动播放下一个
          this.isVideoShow = false
          this.pauseVideo()
        } else {
          //安卓播放时重置显示封面。图标等
          // this.isVideoShow = true
          // this.iconPlayShow = true
          // this.pauseVideo()
          // 和 iOS 一样的效果
          this.isVideoShow = false
          this.pauseVideo()
        }
      },
      // 看不懂这个操作
      // loveCountRadom(count) {
      //   let arr = [12, 67, 34, 76.9, 12.9, 24, 1.9, 45, 4.6]
      //   return arr[count]
      // },
      // 点击 暂停/开始 图片事件函数
      playvideo() {
        let video = document.querySelectorAll('video')[this.current]
        console.log(video.play())
        console.log('playvideo~~~~' + this.current)
        this.isVideoShow = false
        this.iconPlayShow = false
        video.play()
        window.onresize = function () {
          video.style.width = window.innerWidth + 'px'
          video.style.height = window.innerHeight + 'px'
        }
      },
      pauseVideo() {
        //暂停\播放
        let video = document.querySelectorAll('video')[this.current]
        // 由于下标第一个和最后一个同时播放  所以要同时暂停前后两个视频
        let videoEndNub = document.querySelectorAll('video').length - 1
        let videoEnd = document.querySelectorAll('video')[videoEndNub]
        console.log('pauseVideo' + this.current)
        // this.loveCount = this.loveCountRadom(this.current)
        if (this.playOrPause) {
          video.pause()
          videoEnd.pause()
          this.iconPlayShow = true
        } else {
          video.play()

          videoEnd.pause()
          this.iconPlayShow = false
        }
        this.playOrPause = !this.playOrPause
      },
    },
  }
</script>

<style scoped>
  .nut-swiper {
    height: 100vh;
    width: 100vw;
  }
  .icon_play {
    position: absolute;
    top: 44%;
    right: 0;
    left: 0;
    bottom: auto;
    margin: auto;
    z-index: 999;
    height: 60px;
    /* background: rgba(0, 0, 0, 0.5); */
    border-radius: 50%;
  }
  .maxBox {
    width: 100%;
    height: 100%;
    /* 引用定义好的常量 */
    background-color: var(--color-tint);
  }
</style>
