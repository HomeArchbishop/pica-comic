<template>
  <div class="dialog-wrap" id="dialog" @click.self.stop="close()">
    <div class="dialog-card">
      <div class="dialog-content-div">
        <div class="title" v-html="title"></div>
        <div class="content" v-html="content"></div>
        <div class="btn-div">
          <div class="btn cancel-btn" v-if="cancelBtn" @click.stop="cancel()">取消</div>
          <div class="btn confirm-btn" @click.stop="confirm()">确认{{ autoClose &&  `（${(autoClose - timer) / 1000}）` }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped>
export default {
  data () {
    return {
      isShowDialog: true, // 通过这个属性，控制是否移除dom元素
      title: '', // 顶部标题
      content: '', // 内容
      cancelBtn: false, // 取消按钮
      autoClose: false,
      timer: 0
    }
  },
  methods: {
    close: async function () {
      this._close && await this._close()
      this.$set(this, 'isShowDialog', false)
    },
    confirm: async function () {
      this._confirm && await this._confirm()
      this.$set(this, 'isShowDialog', false)
    },
    cancel: async function () {
      this._cancel && await this._cancel()
      this.$set(this, 'isShowDialog', false)
    }
  },
  watch: {
    isShowDialog (cur, old) {
      if (!cur) {
        let dialogDom = document.getElementById('dialog')
        dialogDom.parentNode.removeChild(dialogDom)
      }
    },
    autoClose (cur, old) {
      if (cur) {
        setTimeout(() => {
          this.close()
        }, cur)
      }
    }
  },
  mounted () {
    setInterval(() => {
      this.$set(this, 'timer', this.timer + 1000)
    }, 1000)
  }
}
</script>

<style lang="less" scoped>
@import '../assets/less/color';
@import '../assets/less/var';
.dialog-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  overflow-y: scroll;
  background-color: @color-alert-cover;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 550;
}
.dialog-card {
  display: flex;
  flex-direction: column;
  min-height: 100px;
  width: 70%;
  max-width: 450px;
  padding: 10px;
  background-color: @color-anti-theme;
  box-shadow: 0 0 8px 0 @color-theme-sub;
  @media (max-width: 768px) {
    width: 80%;
  }
  @media (max-width: 512px) {
    width: 90%;
  }
  .dialog-content-div {
    display: flex;
    flex-direction: column;
    width: 100%;
    .title {
      font-size: 20px;
      font-weight: 700;
    }
    .content {
      font-size: 16px;
      margin-top: 10px;
    }
    .btn-div {
      display: flex;
      flex-direction: row;
      margin-top: 10px;
      font-size: 16px;
      font-weight: 700;
      line-height: 16px;
      cursor: pointer;
      .cancel-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48%;
        margin-right: 4%;
        height: 30px;
        border: 1px solid @color-theme;
      }
      .confirm-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        height: 30px;
        border: 1px solid @color-theme;
      }
    }
  }
}
</style>
