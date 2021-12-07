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
      if (!Number(localStorage.diversionIndex + 1)) {
        localStorage.diversionIndex = 2
      }
      localStorage.sort = localStorage.sort || 'ua' // 默认
      if (!['ua', 'da', 'dd', 'ld', 'vd'].includes(localStorage.sort)) {
        localStorage.sort = 'ua'
      }
    },
    shiftToHideView: async function () {
      this.$router.push({ name: 'HideView' })
    }
  },
  created: async function () {
    await this.getDiversionUrlList()
    this.initLocalStorage()
    // listening.
    document.onkeydown = (e) => {
      if (
        e.shiftKey && (e.metaKey || e.ctrlKey) && e.key === 'x' &&
        this.$route.name !== 'HideView'
      ) {
        this.shiftToHideView()
      }
    }
  }
}
</script>

<style lang="less">
@import './assets/less/color';
@font-face {
  font-family: 'juZhenJF';
  src: url('../static/font/FZJuZXFJF.ttf');
}
@font-face {
  font-family: 'ZillaSlab';
  src: url('../static/font/ZillaSlab.ttf');
}
body {
  padding: 0;
  margin: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  &, * {
    font-family: ZillaSlab, juZhenJF, Apple Color Emoji, Segoe UI Emoji, system-ui, sans-serif;
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
  background-color: @color-background;
}
.darkmode-layer, .darkmode-toggle {
  z-index: 500;
}
img {
  z-index: 501;
}
</style>
