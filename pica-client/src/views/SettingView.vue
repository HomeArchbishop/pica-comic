<template>
  <div class="setting-container">
    <div class="main">
      <div class="display-card">
        <div class="title">设置</div>
        <div class="view-setting-area">
          <div class="row">
            <label>深色模式</label>
            <Toggle :isChecked="isDarkMode" @click.native="toggleDarkMode()"/>
          </div>
          <div class="row">
            <label>分流</label>
            <CheckRadio valueStr="0|1|2" textStr="分流一(需要VPN)|分流二|分流三" :checkedValue="String(diversionIndex)"
              @checkChange="setDiversion" style="width: 400px; font-size: 1em"/>
          </div>
          <div class="row">
            <div class="btn" @click.stop="clearCashes()">清除缓存</div>
          </div>
        </div>
        <div class="user-setting-area">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckRadio from '../components/CheckRadio'
import Toggle from '../components/Toggle'
export default {
  name: 'SettingView',
  components: {
    CheckRadio,
    Toggle
  },
  data () {
    return {
      isDarkMode: localStorage.darkmode === 'true',
      diversionIndex: Number(localStorage.diversionIndex) || 2 // 2 refers to diversion_3
    }
  },
  methods: {
    toggleDarkMode: async function () {
      this.$darkmode.toggle()
      this.$set(this, 'isDarkMode', !this.isDarkMode)
    },
    setDiversion: async function (newVal) {
      const _newVal = +newVal
      if (!_newVal) {
        return
      }
      localStorage.diversionIndex = _newVal
      this.$set(this, 'diversionIndex', _newVal)
    },
    clearCashes: async function () {
      const _this = this
      this.$dialog({
        title: '您正准备清除缓存。',
        content: '登录记录、最近观看、外观设置等将重置。',
        cancelBtn: true,
        confirm () {
          localStorage.clear()
          _this.$router.push({ path: '/' })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '../assets/less/color';
.setting-container {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  height: 100%;
  overflow-y: scroll;
}
.main {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 90%;
}
.display-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  .title {
    font-weight: 800;
    font-size: 25px;
    border-bottom: 1px solid @color-theme;
  }
  .view-setting-area,
  .user-setting-area {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    // min-height: 220px;
    padding: 10px;
    margin-top: 10px;
    border: 1px solid @color-theme;
    .row {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 30px;
      margin-top: 10px;
      &:first-child {
        margin-top: 0;
      }
      .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        width: 100px;
        height: 26px;
        border: 1px solid @color-theme;
        cursor: pointer;
      }
    }
  }
}
</style>
