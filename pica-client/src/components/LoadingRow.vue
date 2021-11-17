<template>
  <div class="loading-box">
    <div class="load-icon">
      <div class="line"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingRow'
}
</script>

<style lang="less" scoped>
@import '../assets/less/color';
@import '../assets/less/var';
.loading-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 10px;
  margin-top: 10px;
  box-shadow: 0 0 8px 2px @color-anti-theme-sub;
  border-radius: @card-radius-default;
  user-select: none;
  cursor: wait;
  .load-icon {
    display: flex;
    align-items: center;
    width: 150px;
    height: 100%;
    position: relative;
    .line {
      width: 15px;
      height: 14px;
      border-radius: 7px;
      background-color: @color-active-highlight-4;
      position: absolute;
      &:nth-last-child(1) {
        animation: loading 1s 0s infinite;
      }
    }
  }
}
@random255: `Math.ceil(Math.random()*255)`;
@keyframes loading {
  0% {
    width: 15px;
    left: 0;
  }
  25% {
    width: 150px;
    left: 0;
  }
  50% {
    width: 15px;
    left: 135px;
  }
  75% {
    width: 150px;
    left: 0;
  }
  100% {
    width: 15px;
    left: 0;
  }
}
</style>
