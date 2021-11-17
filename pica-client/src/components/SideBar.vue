<template>
  <div class="side-bar">
    <router-link :to="`/user`" class="upwards-btn" tag="div">
      我
    </router-link>
    <router-link :to="{ name: 'HideView' }" class="upwards-btn" tag="div">
      隐
    </router-link>
    <router-link :to="`/setting`" class="upwards-btn" tag="div">
      设
    </router-link>
    <div class="option-box">
      <router-link class="option-btn" :to="'/home'" tag="div">
        <i class="gg-home"></i>
      </router-link>
      <br>
      <router-link class="option-btn" :to="`/search`" tag="div">
        <i class="gg-search"></i>
      </router-link>
      <router-link class="option-btn" :to="'/category'" tag="div">
        <i class="gg-album"></i>
      </router-link>
      <br>
      <router-link class="option-btn" :to="'/download'" tag="div">
        <i class="gg-arrow-down"></i>
      </router-link>
      <router-link class="option-btn" :to="'/favourite'" tag="div">
        <i class="gg-heart"></i>
      </router-link>
      <router-link class="option-btn" :to="'/recent'" tag="div">
        <i class="gg-eye"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideBar'
}
</script>

<style lang='less' scoped>
@import 'https://css.gg/css';
@import '../assets/less/color';
.side-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 60px;
  background: @color-theme;
  color: @color-anti-theme;
  overflow-y: scroll;
  box-shadow: -4px 0 8px 0 @color-anti-theme-sub;
  z-index: 502;
}
.upwards-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid @color-anti-theme;
  margin-top: 10px;
  min-width: 40px;
  max-width: 40px;
  min-height: 40px;
  max-height: 40px;
  overflow: hidden;
  cursor: pointer;
}
.option-box {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex: 1;
  margin-bottom: 20px;
  .option-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid @color-anti-theme;
    margin-top: 10px;
    width: 40px;
    height: 40px;
    cursor: pointer;
  }
}
</style>
