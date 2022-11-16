<template>
  <div class="onRightSideTheList">
    <div class="onRightSideTheListItem">
      <slot name="headPortrait">头像</slot>
    </div>
    <div class="onRightSideTheListItem">
      <img
        src="@/assets/img/live/love.svg"
        alt="" />
      <slot name="love">爱心</slot>
    </div>
    <div class="onRightSideTheListItem">
      <img
        src="@/assets/img/live/comments.svg"
        alt="" />
      <slot name="comments">评论</slot>
    </div>
    <div class="onRightSideTheListItem">
      <img
        src="@/assets/img/live/share.svg"
        alt="" />
      <slot name="comments">分享</slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'OnRightSideTheList',
  }
</script>

<style scoped>
  .onRightSideTheList {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70px;
    height: 250px;
    background-color: skyblue;
    z-index: 9999;
  }
  .onRightSideTheListItem {
    padding-top: 20px;
    flex: 1;
  }
  .onRightSideTheListItem img {
    margin-bottom: 3px;
    display: block;
    width: 35px;
    height: 35px;
  }
</style>
