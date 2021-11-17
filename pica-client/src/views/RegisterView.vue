<template>
  <div class="register-container">
    <div class="main">
      <span class="title">注册</span>
      <div class="form-box">
        <form @submit.prevent='register()'>
          <div class="input-div">
            <label>用户名<small>（注册后不可更改）</small></label>
            <input type="text" v-model="email">
          </div>
          <div class="input-div">
            <label>昵称</label>
            <input type="text" v-model="name">
          </div>
          <div class="input-div">
            <label>密码</label>
            <input type="password" v-model="password" autocomplete="off">
          </div>
          <div class="input-div">
            <label>确认密码</label>
            <input type="password" v-model="comfirmPassword" autocomplete="off">
          </div>
          <div class="input-div">
            <label>生日</label>
            <input type="date" v-model="birthday">
          </div>
          <div class="input-div">
            <label>性别</label>
            <CheckRadio valueStr="m|f|bot" textStr="绅士|淑女|保密" :checkedValue="gender"
              @checkChange="setGender" style="width: 400px"/>
          </div>
          <div class="input-div" v-show="!isSetQuestion"
            @click="showMoreQuestionInput()">
            <label>更多</label>
            <div class="normal-btn">设置安全问题（必选）</div>
          </div>
          <div class="input-div" v-show="isSetQuestion">
            <label>问题一</label>
            <input class="question-input-question" type="text" v-model="question1" placeholder="问题">
            <input type="text" v-model="answer1" placeholder="答案">
          </div>
          <div class="input-div" v-show="isSetQuestion">
            <label>问题二</label>
            <input class="question-input-question" type="text" v-model="question2" placeholder="问题">
            <input type="text" v-model="answer2" placeholder="答案">
          </div>
          <div class="input-div" v-show="isSetQuestion">
            <label>问题三</label>
            <input class="question-input-question" type="text" v-model="question3" placeholder="问题">
            <input type="text" v-model="answer3" placeholder="答案">
          </div>
          <input class="submit-btn" type="submit" value="注册">
        </form>
      </div>
      <router-link :to="'/login'" class="sub-link" tag="div">去登录</router-link>
    </div>
  </div>
</template>

<script>
import CheckRadio from '../components/CheckRadio'
export default {
  name: 'RegisterView',
  components: {
    CheckRadio
  },
  data () {
    return {
      email: '',
      password: '',
      comfirmPassword: '',
      name: '',
      birthday: '1999-12-12', // 1996-12-12T00:00:00.000Z
      gender: '', // m, f, bot
      answer1: '',
      answer2: '',
      answer3: '',
      question1: '',
      question2: '',
      question3: '',
      isSetQuestion: false
    }
  },
  computed: {
    registerData () {
      return {
        email: this.email,
        password: this.password,
        name: this.name,
        birthday: this.birthday + 'T00:00:00.000Z',
        gender: this.gender, // m, f, bot
        answer1: this.answer1,
        answer2: this.answer2,
        answer3: this.answer3,
        question1: this.question1,
        question2: this.question2,
        question3: this.question3
      }
    }
  },
  methods: {
    register: async function () {
      const registerRes = await this.$api.register({ ...this.registerData })
      if (registerRes.error) {
        this.$dialog({
          title: `发生错误${registerRes.code} 错误码${registerRes.error}`,
          content: registerRes.detail || registerRes.message,
          autoClose: 3000
        })
      } else {
        const _this = this
        this.$dialog({
          title: `注册成功`,
          autoClose: 3000,
          close () {
            _this.$router.push({ name: 'LoginView' })
          }
        })
      }
      console.log(registerRes)
    },
    showMoreQuestionInput: async function () {
      this.$set(this, 'isSetQuestion', true)
    },
    setGender: async function (newVal) {
      this.$set(this, 'gender', newVal)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../assets/less/color';
.register-container {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  overflow-y: scroll;
}
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
}
.title {
  font-weight: 800;
  font-size: 25px;
  margin-top: 20px;
}
.sub-link {
  font-size: 16px;
  margin-top: 8px;
  margin-bottom: 20px;
  color: @color-theme-sub;
  cursor: pointer;
}
.form-box {
  display: flex;
  flex-direction: column;
  .input-div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 10px;
    label {
      display: inline-flex;
      align-items: center;
      font-size: 18px;
    }
    input:not([type = 'radio']) {
      display: flex;
      width: 400px;
      height: 40px;
      padding: 2px 1px 2px 5px;
      font-size: 20px;
      border: 2px solid @color-theme;
      outline: none;
      background-color: none;
      &.question-input-question {
        border-bottom: none;
      }
    }
    input.error {
      border-color: red;
    }
  }
  .normal-btn,
  .submit-btn {
    width: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    padding: 2px 1px 2px 5px;
    font-size: 20px;
    border: 2px solid @color-theme;
    outline: none;
    cursor: pointer;
    &.error {
      border-color: red;
    }
    &.submit-btn {
      background-color: @color-anti-theme-sub;
    }
  }
}
</style>
