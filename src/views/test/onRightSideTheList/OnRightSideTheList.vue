<template>
  <div class="onRightSideTheList">
    <div class="onRightSideTheListItem">
      <nut-avatar
        style="display: block; margin: 4px; width: 45px; height: 45px"
        bg-icon
        bg-image="http://img30.360buyimg.com/uba/jfs/t1/84318/29/2102/10483/5d0704c1Eb767fa74/fc456b03fdd6cbab.png"></nut-avatar>
      <!-- <slot name="headPortrait">头像</slot> -->
    </div>
    <div
      class="onRightSideTheListItem"
      @click="love(isLoveFlag)">
      <img
        v-if="isLoveFlag"
        src="@/assets/img/live/love.svg"
        alt="" />
      <img
        v-else
        src="@/assets/img/live/love2.svg"
        alt="" />
      <div name="love">{{ loveNum }}</div>
    </div>
    <div class="onRightSideTheListItem">
      <img
        src="@/assets/img/live/comments.svg"
        alt="" />
      <slot name="comments">评论</slot>
    </div>
    <div
      class="onRightSideTheListItem"
      @click="inputbox">
      <img
        src="@/assets/img/live/share.svg"
        alt="" />
      <slot name="comments">分享</slot>
    </div>
    <nut-popup
      class="popupSty"
      v-model="isShow"
      position="bottom"
      get-container="#mountRelyOn"
      :style="{ height: '20%' }">
      <ShareToExternalAPP> </ShareToExternalAPP>
    </nut-popup>
  </div>
</template>

<script>
  import ShareToExternalAPP from '@/components/common/shareToExternalAPP/ShareToExternalAPP'
  export default {
    name: 'OnRightSideTheList',
    components: {
      ShareToExternalAPP,
    },
    data() {
      return {
        isLoveFlag: true,
        loveNum: 554,
        // 分享底部弹出
        isShow: false,
      }
    },
    methods: {
      love(isLoveFlag) {
        this.isLoveFlag = !this.isLoveFlag
        if (isLoveFlag == true) {
          this.loveNum += 1
        } else {
          this.loveNum -= 1
        }
      },
      // 弹出底部分享对话框
      inputbox() {
        this.isShow = !this.isShow
      },
    },
  }
</script>

<style scoped>
  .onRightSideTheList {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70px;
    height: 250px;
    /* background-color: skyblue; */
    z-index: 9999;
  }
  .onRightSideTheListItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
    flex: 1;
    color: white;
    vertical-align: middle;
  }
  .onRightSideTheListItem img {
    margin-bottom: 3px;
    display: block;
    width: 30px;
    height: 30px;
  }
  .popupSty {
    z-index: 99999;
  }
</style>
