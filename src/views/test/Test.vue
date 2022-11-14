<template>
  <div class="container_box" id="video_box">
    <div class="van_swipe">
      <!--vant van-swipe 滑动组件 -->
      <van-swipe
        :show-indicators="false"
        @change="onChange"
        vertical
        :loop="false"
      >
        <van-swipe-item
          v-for="(item, index) in videoList"
          :key="index"
          class="product_swiper"
        >
          <div class="video_container">
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
              :poster="item.cover"
              :src="item.url"
              :playOrPause="playOrPause"
              x-webkit-airplay="allow"
              x5-video-orientation="portrait"
              @click="pauseVideo"
              @ended="onPlayerEnded($event)"
              loop="loop"
            ></video>
            <!-- 封面 -->
            <img
              v-show="isVideoShow"
              class="play"
              @click="playvideo"
              :src="item.cover"
            />
            <!-- 播放暂停按钮 -->
            <img
              v-show="iconPlayShow"
              class="icon_play"
              @click="playvideo"
              src="~@/assets/img/common/top.png"
            />
          </div>
          <!-- 右侧点赞、分享功能 -->
          <div class="tools_right">
            <div class="tools_r_li" @click="changeFollow(item, index)">
              <i
                class="iconfont icon-yixianshi-"
                :class="item.follow ? 'follow_active' : ''"
              ></i>
              <div class="tools_r_num">{{item.loveCount}}w</div>
            </div>
            <div class="tools_r_li" @click="changeShare">
              <i class="iconfont icon-tubiao-"></i>
              <div class="tools_r_num">{{item.shareCount}}w</div>
            </div>
          </div>
          <!-- 底部作品描述 -->
          <div class="production_box">
            <div class="production_name">@{{item.name}}</div>
            <div class="production_des">
              <i
                v-for="(list, index) in item.buyShopList" 
                :key="index" 
                class="production_des_i"
                @click="copyShopName(list.ShopUrl)"
              >
                {{list.ShopName}}
              </i>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
      <!--底部操作栏-->
      <div class="container_bottom">
        <div
          class="bottom_tab"
          :class="tabIndex == 0 ? 'tab_active' : ''"
          @click="changeTab(0)"
        >
          <span class="bottom_tab_span">首页</span>
        </div>
        <div
          class="bottom_tab"
          :class="tabIndex == 1 ? 'tab_active' : ''"
          @click="changeTab(1)"
        >
          <span class="bottom_tab_span">设置</span>
        </div>
      </div>
      <!--分享弹框-->
      <div class="share_hover"></div>
      <div class="share_box" :class="showShareBox ? 'share_active' : ''">
        <div class="share_tips">分享到</div>
        <ul class="share_ul">
          <li class="share_li pengyouquan_li">
            <i class="iconfont icon-pengyouquan"></i>
          </li>
          <li class="share_li">
            <i class="iconfont icon-weixin"></i>
          </li>
          <li class="share_li" @click="copyUrl">
            <i class="iconfont icon-lianjie"></i>
          </li>
          <div class="clear"></div>
        </ul>
        <div class="share_cancel" @click="cancelShare">取消</div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Swipe, SwipeItem, Toast } from "vant";
Vue.use(Swipe).use(SwipeItem);
export default {
  name: "Test",
  data() {
    let u = navigator.userAgent;
    return {
      current: 0,
      videoList: [
        {
          url: "https://video.pearvideo.com/mp4/third/20201113/cont-1706821-15126082-111655-hd.mp4",
          cover: "https://image-cn2.tvcbook.com/v7/image/2020/11/13/8a7b666e-0ac8-4e34-b549-8360b1569e54.png!cover-780-439?x-oss-process=image/crop,x_0,y_72,w_1080,h_608,g_nw",
          follow: false,
          loveCount: 24,
          shareCount: 12,
          name: '智.混动',
          buyShopList: [
            {
              ShopName: '淘宝',
              ShopUrl: 'http://taobao.com'
            },
            {
              ShopName: '天猫',
              ShopUrl: 'http://taobao.com'
            },
            {
              ShopName: '京东',
              ShopUrl: 'http://taobao.com'
            }
          ]
        },
        {
          url: "https://video.pearvideo.com/mp4/third/20201114/cont-1707004-15488237-105621-hd.mp4",
          cover: "https://image-cn2.tvcbook.com/daq/2020/11/12/de65881c-24b0-11eb-84ef-02420a0008fb.png!cover-780-439",
          follow: false,
          loveCount: 28,
          shareCount: 2,
          name: '用jio看世界，发现更多乐趣',
          buyShopList: [
            {
              ShopName: '淘宝',
              ShopUrl: 'http://taobao.com'
            },
            {
              ShopName: '天猫',
              ShopUrl: 'http://taobao.com'
            },
            {
              ShopName: '拼多多',
              ShopUrl: 'http://taobao.com'
            }
          ]
        },
        {
          url: "https://video.pearvideo.com/mp4/third/20201117/cont-1707360-15126082-105138-hd.mp4",
          cover: "https://image-cn2.tvcbook.com/v7/thumbs/17e6bd9a691e4066b94feb8c5e0c2e84-mp4-hd/snapshots/17e6bd9a691e4066b94feb8c5e0c2e84-00053.jpg!cover-780-439",
          follow: false,
          loveCount: 48,
          shareCount: 23,
          name: '三维',
          buyShopList: [
            {
              ShopName: '淘宝',
              ShopUrl: 'http://taobao.com'
            },
            {
              ShopName: '天猫',
              ShopUrl: 'http://taobao.com'
            },
            {
              ShopName: '苏宁',
              ShopUrl: 'http://taobao.com'
            }
          ]
        },

        {
          url: "https://video.pearvideo.com/mp4/third/20201111/cont-1706407-15488237-112532-hd.mp4",
          cover: "https://image-cn2.tvcbook.com/v7/image/2020/11/17/73fdf11d-ea43-4a5c-b864-e8082af3d8c0.JPG!cover-780-439?x-oss-process=image/crop,x_0,y_0,w_1920,h_1080,g_nw",
          follow: false,
          loveCount: 68,
          shareCount: 29,
          name: '世界关节炎日 MoveFree奶奶的约定',
          buyShopList: [
            {
              ShopName: '淘宝',
              ShopUrl: 'http://taobao.com'
            },
            {
              ShopName: '天猫',
              ShopUrl: 'http://taobao.com'
            },
            {
              ShopName: '苏宁',
              ShopUrl: 'http://taobao.com'
            }
          ]
        },
        {
          url: "https://video.pearvideo.com/mp4/third/20201124/cont-1708555-15126082-104309-hd.mp4",
          cover: "https://image-cn2.tvcbook.com/daq/2020/11/17/7c7b0cbc-2893-11eb-9c33-02420a0008fb.png!cover-780-439",
          follow: false,
          loveCount: 168,
          shareCount: 129,
          name: '黑无节，是他们的限定狂欢日',
          buyShopList: [
            {
              ShopName: '淘宝',
              ShopUrl: 'http://taobao.com'
            },
            {
              ShopName: '天猫',
              ShopUrl: 'http://taobao.com'
            }
          ]
        },
        {
          url: "https://video.pearvideo.com/mp4/third/20201124/cont-1708555-15126082-104309-hd.mp4",
          cover: "https://image-cn2.tvcbook.com/daq/2020/11/17/d73b7026-287d-11eb-9c33-02420a0008fb.png!cover-780-439",
          follow: false,
          loveCount: 18,
          shareCount: 1,
          name: '懂咖啡，也懂你的小心思',
          buyShopList: [
            {
              ShopName: '淘宝',
              ShopUrl: 'http://taobao.com'
            }
          ]
        }
      ],
      isVideoShow: true,
      playOrPause: true,
      video: null,
      iconPlayShow: true,
      isAndroid: u.indexOf("Android") > -1 || u.indexOf("Adr") > -1,
      isiOS: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
      tabIndex: 0,
      showShareBox: false,
      loveCount: 0
    };
  },
  methods: {
    //改变菜单
    changeTab(index) {
      this.tabIndex = index;
      if (index === 1) {
        this.$router.push('/about')
      }
    },
    //改变收藏状态
    changeFollow(item, index) {
      this.videoList[index].follow = !this.videoList[index].follow;
    },
    //展示分享弹窗
    changeShare() {
      this.showShareBox = true;
    },
    //取消分享
    cancelShare() {
      this.showShareBox = false;
    },
    //滑动改变播放的视频
    onChange(index) {
      //改变的时候 暂停当前播放的视频
      let video = document.querySelectorAll("video")[this.current];
      video.pause();
      this.playOrPause = false;
      this.current = index;
      if (this.isiOS) {
        //ios切换直接自动播放下一个
        this.isVideoShow = false;
        this.pauseVideo();
      } else {
        //安卓播放时重置显示封面。图标等
        this.isVideoShow = true;
        this.iconPlayShow = true;
      }
    },
    loveCountRadom(count) {
      let arr = [12, 67, 34, 76.9, 12.9, 24, 1.9, 45, 4.6]
      return arr[count]
    },
    playvideo() {
      let video = document.querySelectorAll("video")[this.current];
      console.log(video.play());
      console.log("playvideo：" + this.current);
      this.isVideoShow = false;
      this.iconPlayShow = false;
      video.play();
      window.onresize = function () {
        video.style.width = window.innerWidth + "px";
        video.style.height = window.innerHeight + "px";
      };
    },
    pauseVideo() {
      //暂停\播放
      let video = document.querySelectorAll("video")[this.current];
      console.log("pauseVideo" + this.current);
      this.loveCount = this.loveCountRadom(this.current)
      if (this.playOrPause) {
        video.pause();
        this.iconPlayShow = true;
      } else {
        video.play();
        this.iconPlayShow = false;
      }
      this.playOrPause = !this.playOrPause;
    },
    onPlayerEnded() {
      //视频结束
      this.isVideoShow = true;
      this.current += this.current;
    },
    //复制当前链接
    copyUrl() {
      Toast('复制链接成功')
      let httpUrl = window.location.href;
      var oInput = document.createElement("input");
      oInput.value = httpUrl;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      oInput.className = "oInput";
      oInput.style.display = "none";
    },
    copyShopName(ShopUrl) {
      Toast('复制成功')
    }
  },
};
</script>
<style scoped>
.video-player {
  height: 100%;
  width: 100%;
}
.van_swipe {
  width: 100%;
  height: 100%;
}
.van-swipe {
  width: 100%;
  height: 100%;
}
.container_box {
  width: 100%;
  height: 100%;
}
.video_box {
  object-fit: cover !important;
  z-index: 999;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
}
video {
  object-position: 0 0;
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
.play,
.platStart {
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
}
/* 点赞，转发 */
.tools_right {
  z-index: 1001;
  position: absolute;
  right: 16px;
  bottom: 238px;
}
.tools_r_li {
  margin-bottom: 20px;
  color: #fff;
  font-size: 16px;
}
.tools_r_li:last-child {
  margin-bottom: 0px;
}
.icon_right {
  margin-bottom: 5px;
  font-size: 42px;
  display: block;
  text-shadow: 0px 0px 10px #9d9d9d;
  /*transition: .5s;*/
}
.production_box {
  z-index: 1001;
  position: absolute;
  /* right: 16px; */
  bottom: 54px;
  text-align: left;
  padding: 0 15px 15px 15px;
  color: #fff;
  width: 100%;
  left: 0;
  box-sizing: border-box;
  background: -webkit-linear-gradient(
    top,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0)
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    top,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0)
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    top,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0)
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0)
  ); /* 标准的语法 */
}
.production_name {
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 10px;
  color: #fda085;
}
.production_des {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  min-height: 62px;
}
.production_des_i {
  font-style: normal;
  font-weight: 700;
  color: #fda085;
}
.container_bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  height: 60px;
  border-top: 1px solid rgba(255, 255, 255, 0.7);
}
.production_top {
  display: inline-block;
  padding: 6px;
  margin-bottom: 5px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  margin-top: 5px;
}
.product_go {
  color: #fbdd21;
}
.production_title {
  margin-left: 4px;
}
.bottom_tab {
  width: 50%;
  text-align: center;
  float: left;
  color: #c9c9c9;
  padding: 10px 0;
}
.bottom_tab_span {
  line-height: 30px;
  border-bottom: 2px solid transparent;
  font-weight: 600;
  font-size: 16px;
  display: inline-block;
  /* padding: 0 4px; */
  transition: 0.5s all;
}
.tab_active .bottom_tab_span {
  border-bottom: 2px solid #fda085;
  color:#fda085;
}
.icon-shoucang {
  transition: 0.5s all;
}
.follow_active {
  color: #fda085;
  animation: showHeart 0.5s ease-in-out 0s;
}
@keyframes showHeart {
  0% {
    color: #f44;
    transform: scale(1);
  }
  25% {
    color: #fff;
    transform: scale(0);
  }
  80% {
    color: #f44;
    transform: scale(1.2);
  }
  100% {
    color: #f44;
    transform: scale(1);
  }
}
/*分享样式*/
.share_hover {
  position: fixed;
  display: none;
}
.share_box {
  position: fixed;
  bottom: -300px;
  width: 100%;
  z-index: 1002;
  background: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  transition: 0.5s;
}
.share_tips {
  text-align: center;
  line-height: 38px;
  color: #333;
}
.share_ul {
  box-sizing: border-box;
  padding: 0 25px 25px;
  border-bottom: 1px solid #e8e8e8;
}
.share_li {
  float: left;
  width: 33%;
  text-align: center;
}
.share_li i {
  font-size: 22px;
}
.share_cancel {
  text-align: center;
  line-height: 48px;
  color: #777;
  text-align: center;
}
.pengyouquan {
  color: #47d000;
}
.pengyouquan_li {
  animation: rotating 8s linear infinite;
}
@keyframes rotating {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.weixin {
  color: #20ca2e;
}
.lianjie {
  color: #cdcdcd;
}
.share_active {
  bottom: 0px;
}
</style>