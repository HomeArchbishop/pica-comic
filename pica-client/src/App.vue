<template>
  <div class="wrap" id="app">
    <SideBar/>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    getDiversionUrlList: async function () {
      const otherDiversionList = await this.$api.getDiversionUrlList()
      if (otherDiversionList.error) { return }
      const fullList = ['http://picaapi.picacomic.com/', ...otherDiversionList]
      localStorage.diversionUrlList = JSON.stringify(fullList)
      this.$store.commit('global/updateDiversionUrlList', { newDiversionUrlList: fullList })
    },
    initLocalStorage: async function () {
      localStorage.sort = localStorage.sort || 'ua' // 默认
      if (!['ua', 'da', 'dd', 'ld', 'vd'].includes(localStorage.sort)) {
        localStorage.sort = 'ua'
      }
    }
  },
  created () {
    this.getDiversionUrlList()
    this.initLocalStorage()
  }
}
</script>

<style lang="less">
@import './assets/less/color';
@font-face {
  font-family: 'juZhenJF';
  src: url('./assets/font/FZJuZXFJF.ttf');
}
body {
  padding: 0;
  margin: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  &, * {
    font-family: 'juZhenJF';
    box-sizing: border-box!important;
  }
}
.wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
}
.darkmode-layer, .darkmode-toggle {
  z-index: 500;
}
img {
  z-index: 501;
}
</style>
