<template>
  <div class="widget-div" @click="toggleDarkMode()" ref="widget">
    <div class="label">
      {{ labelWord }}</div>
  </div>
</template>

<script>
export default {
  name: 'DarkmodeWidget',
  props: [
    'sort'
  ],
  data () {
    return {
      labelWord: this.$darkmode.isActivated() ? '白' : '深'
    }
  },
  methods: {
    toggleDarkMode: async function () {
      this.$darkmode.toggle()
      this.$set(this, 'labelWord', this.$darkmode.isActivated() ? '白' : '深')
    }
  },
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
