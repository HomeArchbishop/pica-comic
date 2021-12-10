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
      if (localStorage.blurOutOfFocus !== 'on' && localStorage.blurOutOfFocus !== 'off') {
        localStorage.blurOutOfFocus = 'on'
      }
      // diversionIndex
      if (!Number(localStorage.diversionIndex + 1)) {
        localStorage.diversionIndex = 2
      }
      // sort
      localStorage.sort = localStorage.sort || 'ua' // 默认
      if (!['ua', 'da', 'dd', 'ld', 'vd'].includes(localStorage.sort)) {
        localStorage.sort = 'ua'
      }
    },
    shiftToHideView: async function () {
      this.$router.push({ name: 'HideView' })
    },
    addListener: async function () {
      window.onblur = () => {
        if (!this.$route.meta.blurExclude && localStorage.blurOutOfFocus === 'on') {
          document.body.classList.add('blur')
        }
        document.title = '兼爱-古诗文网'
      }
      window.onfocus = () => {
        document.body.classList.remove('blur')
        document.title = this.$route.meta.title || '百度一下'
      }
      document.onkeydown = (e) => {
        if (
          e.shiftKey && (e.metaKey || e.ctrlKey) && e.key === 'x' &&
          this.$route.name !== 'HideView'
        ) {
          this.shiftToHideView()
        }
      }
    }
  },
  created: async function () {
    this.initLocalStorage()
    this.addListener()
    await this.getDiversionUrlList()
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
  &.blur {
    filter: blur(30px);
  }
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
  &::before {
    content: "";
    // background-image: url('../static/img/pica-comic-logo.png');
    opacity: .2;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
  }
  * {
    z-index: 2;
  }
}
.darkmode-layer, .darkmode-toggle {
  z-index: 500;
}
img {
  z-index: 501;
}
</style>
