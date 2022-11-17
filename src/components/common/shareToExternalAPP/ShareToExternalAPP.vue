<template>
  <div class="maxBox">
    <p>分享给朋友：</p>
    <div class="shareToExternalAPP">
      <div class="shareToExternalAPPItem">
        <a href="www.bilibili.com">
          <img
            src="@/assets/img/live/wechat.svg"
            alt="" />
          <h6>微信</h6>
        </a>
      </div>
      <div class="shareToExternalAPPItem">
        <a href="www.bilibili.com">
          <img
            src="@/assets/img/live/circleFriends.svg"
            alt="" />
          <h6>朋友圈</h6>
        </a>
      </div>
      <div class="shareToExternalAPPItem">
        <a href="www.bilibili.com">
          <img
            src="@/assets/img/live/csdn.svg"
            alt="" />
          <h6>CSDN</h6>
        </a>
      </div>
      <div class="shareToExternalAPPItem">
        <a href="www.bilibili.com">
          <img
            src="@/assets/img/live/weibo.svg"
            alt="" />
          <h6>微博</h6>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  // 测试一次push多次的commit
  export default {
    name: 'ShareToExternalAPP',
    data() {
      return {}
    },
  }
</script>

<style scoped>
  .maxBox p {
    color: var(--color-high-text);
    margin: 8px 8px 20px 8px;
  }
  .shareToExternalAPP {
    width: 100vw;
    height: 100%;
    /* background-color: yellow; */
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  .shareToExternalAPPItem img {
    padding-bottom: 8px;
    display: block;
    width: 50px;
    height: 50px;
    flex: 1;
  }
  .shareToExternalAPPItem a {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
</style>
