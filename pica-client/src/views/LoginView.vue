<template>
  <div class="login-container">
    <div class="main">
      <div class="title">请登录</div>
      <div class="form-box">
        <form @submit.prevent='login()'>
          <div class="input-div">
            <label>用户名</label>
            <input type="text" v-model="username">
          </div>
          <div class="input-div">
            <label>密码</label>
            <input type="password" v-model="password">
          </div>
          <input class="submit-btn" type="submit" value="登录">
        </form>
      </div>
      <router-link :to="'/register'" class="sub-link a-theme-sub">去注册</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data () {
    return {
      username: localStorage.username || '',
      password: localStorage.password || ''
    }
  },
  methods: {
    login: async function () {
      const token = await this.$api.authorize(this.username, this.password)
      localStorage.username = this.username
      localStorage.password = this.password
      localStorage.token = token
      this.$router.push({ path: `/home` })
      window.location.reload()
    }
  }
}
</script>

<style lang="less" scoped>
@import '../assets/less/color';
.login-container {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
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
}
.sub-link {
  font-size: 16px;
  margin-top: 8px;
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
      margin-right: 8px;
      font-size: 18px;
    }
    input {
      width: 400px;
      display: block;
      box-sizing: border-box;
      height: 40px;
      padding: 2px 1px 2px 5px;
      font-size: 20px;
      border: 2px solid @color-theme;
      outline: none;
    }
  }
  .submit-btn {
    width: 400px;
    display: block;
    height: 40px;
    padding: 2px 1px 2px 5px;
    font-size: 20px;
    border: 2px solid black;
    outline: none;
    cursor: pointer;
  }
}
</style>
