<template>
  <div class="widget-div" ref="widget">
    <div class="label">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Widget',
  props: [
    'sort'
  ],
  mounted () {
    this.$refs.widget.style.bottom = `${32 + (+this.sort - 1) * 60}px`
  }
}
</script>

<style lang='less' scoped>
@import '../assets/less/color';
.widget-div {
  display: flex;
  justify-content: center;
  align-items: center;
  color: @color-anti-theme;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: @color-theme;
  position: absolute;
  right: 32px;
  bottom: 32px;
  .label {
    font-size: 26px;
    cursor: pointer;
    &::selection {
      text-decoration: none;
    }
  }
}
</style>
