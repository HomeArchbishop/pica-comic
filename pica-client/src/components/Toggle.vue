<template>
  <div>
    <div class="weui-switch" :class="{'weui-switch-on': isChecked}" :isChecked="isChecked">
      <div class="on" v-if="isChecked && direction.length">
        {{ direction[0] }}
      </div>
      <div class="off" v-if="!isChecked && direction.length">
        {{ direction[1] }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Toggle',
  props: {
    isChecked: {
      type: Boolean,
      default: true
    },
    text: {
      type: String,
      default: ''
    }
  },
  computed: {
    direction () {
      return this.text ? this.text.split('|') : []
    }
  }
}
</script>

<style lang='less' scoped>
@import '../assets/less/color';
.weui-switch {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  width: 52px;
  height: 26px;
  outline: 0;
  padding: 3px;
  font-size: 18px;
  background-color: @color-anti-theme-sub;
  transition: background-color 0.1s;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  &::after {
    content: " ";
    position: absolute;
    top: 3px;
    left: 3px;
    width: 20px;
    height: 20px;
    background-color: @color-anti-theme;
    transition: transform .2s;
  }
  .on-word {
    width: 100%;
    height: 100%;
    position: absolute;
    padding: 0 5px;
    line-height: 20px;
    color: #FFF;
    user-select: none;
  }
  .off-word {
    width: 100%;
    height: 100%;
    position: absolute;
    padding: 0 5px;
    right: 2px;
    line-height: 20px;
    color: #7A7A7A;
    text-align: right;
    user-select: none;
  }
}
.weui-switch-on {
  justify-content: flex-start;
  border-color: #6F6F6F;
  background-color: @color-active-highlight-3;
  &::after {
    transform: translateX(25px);
  }
}
</style>
