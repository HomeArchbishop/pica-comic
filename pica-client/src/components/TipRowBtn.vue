<template>
  <div class="tip-box">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TipRowBtn'
}
</script>

<style lang="less" scoped>
@import '../assets/less/color';
@import '../assets/less/var';
.tip-box {
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
  cursor: pointer;
}
</style>
