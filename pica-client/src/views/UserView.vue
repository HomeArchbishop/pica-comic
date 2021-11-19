<template>
  <div class="user-container">
    <div class="main">
      <div class="display-card" v-if="!isRequestingPersonInfo">
        <img :src="avatarSrc" :alt="personInfo.name" v-if="avatarSrc">
        <div class="info-div">
          <div class="title">
            <div class="name-div">
              {{ personInfo.name }}
              <div class="tag">
                【{{ personInfo.title }}】
              </div>
              <i class="gg"
                :class="{
                  'gg-gender-male': personInfo.gender === 'm',
                  'gg-gender-female': personInfo.gender === 'f',
                  'gg-bot': personInfo.gender === 'bot',
                }"></i>
            </div>
            <div class="slogan-div">
              <div class="slogan">
                "{{ personInfo.slogan || '什么都没有' }}"
              </div>
            </div>
          </div>
          <div class="detail">
            用户名：{{ personInfo.email }}
          </div>
          <div class="detail">
            生日：{{ $util.regTime(personInfo.birthday) }}
            <div class="sub-detial">
              {{ `${$util.dateDiffer(personInfo.birthday)}天前` }}
            </div>
          </div>
          <div class="detail">
            注册时间：{{ $util.regTime(personInfo.created_at) }}
            <div class="sub-detial">
              {{ `${$util.dateDiffer(personInfo.created_at)}天前` }}
            </div>
          </div>
          <div class="function-btn" @click.stop="$router.push({ path: '/setting' })">设置</div>
          <div class="function-btn" @click.stop="logout()">退出登录</div>
        </div>
      </div>
      <div class="level-card" v-if="!isRequestingPersonInfo">
        <div class="title">
          <div class="main-title">等级</div>
          <div class="punch-btn" :class="{isLoading: isRequestingPunch}"
             v-if="!personInfo.isPunched" @click.stop="punch()">签到</div>
          <div class="punch-btn disabled" v-else>已签到</div>
        </div>
        <div class="progress-div">
          <div class="level-badge">LV{{ personInfo.level }}</div>
          <div class="process-border">
            <div
              class="process-fill"
              :style="{ width: personInfo.exp % 300 / 300 * 100 + '%' }"></div>
          </div>
          <div class="exp-badge">{{ personInfo.exp % 300 }}/300</div>
        </div>
      </div>
      <LoadingRow v-if="isRequestingPersonInfo"/>
      <div class="my-comments-card" v-if="!isRequestingPersonInfo || (isRequestingPersonInfo && !isRequestingMyComments)">
        <div class="title">
          <div class="main-title">我的伟论</div>
          <div class="btn" @click.stop="refreshMyComments()">刷新</div>
        </div>
        <div class="comments-div" v-if="!isRequestingMyComments">
          <Comment v-for="item in myCommentsList" :key="item._id" :item="item" :_user="personInfo"/>
        </div>
        <LoadingRow v-if="isRequestingPersonInfo || isRequestingMyComments"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserView',
  data () {
    return {
      token: localStorage.token,
      isRequestingPersonInfo: false,
      isRequestingMyComments: true,
      isRequestingPunch: false,
      personInfo: {},
      myCommentsList: [],
      myCommentsCurrentPage: 1,
      isFoundAny: true,
      isAll: false
    }
  },
  computed: {
    avatarSrc: function () {
      return this.personInfo.avatar
        ? this.$util.formatImgUrl(this.personInfo.avatar.fileServer, this.personInfo.avatar.path)
        : '../../static/img/black.jpeg'
    }
  },
  methods: {
    getPersonInfo: async function () {
      // change state.
      this.$set(this, 'isRequestingPersonInfo', true)
      // call api.
      const personInfo = await this.$api.personInfo(this.token)
      this.$set(this, 'personInfo', personInfo)
      console.log(personInfo)
      // change state.
      this.$set(this, 'isRequestingPersonInfo', false)
    },
    updateMyCommentsPage: async function () {
      // change state.
      this.$set(this, 'isRequestingMyComments', true)
      // call api.
      const myCommentsList = await this.$api.myComments(this.token, this.myCommentsCurrentPage)
      this.myCommentsList.push(...myCommentsList.docs)
      console.log(myCommentsList)
      // change state.
      this.$set(this, 'isRequestingMyComments', false)
      // judge if empty.
      if (!myCommentsList.pages) {
        this.$set(this, 'isFoundAny', false)
      }
      // judge if is all, if not, then pageCount++.
      if (+myCommentsList.page === +myCommentsList.pages) {
        this.$set(this, 'isAll', true)
      } else {
        this.$set(this, 'myCommentsCurrentPage', this.myCommentsCurrentPage + 1)
      }
    },
    refreshMyComments: async function () {
      this.$set(this, 'myCommentsCurrentPage', 1)
      this.$set(this, 'myCommentsList', [])
      this.updateMyCommentsPage()
    },
    punch: async function () {
      // change state.
      this.$set(this, 'isRequestingPunch', true)
      // call api.
      const punchActionRes = await this.$api.punch(this.token)
      console.log(punchActionRes)
      // judge.
      if (punchActionRes.status === 'ok') {
        this.getPersonInfo()
      } else {
        this.$dialog({
          title: '签到失败',
          content: '未知错误，请稍后再试。',
          autoClose: 2000
        })
      }
      // change state.
      this.$set(this, 'isRequestingPunch', false)
    },
    logout: async function () {
      localStorage.token = ''
      this.$router.push({ name: 'LoginView' })
    }
  },
  created: async function () {
    await this.getPersonInfo()
    await this.updateMyCommentsPage()
  }
}
</script>

<style lang="less" scoped>
@import '../assets/less/color';
.user-container {
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
  flex-direction: row;
  width: 100%;
  margin-top: 20px;
  img {
    min-width: 180px;
    min-height: 180px;
    max-width: 180px;
    max-height: 180px;
    border: none;
    border-radius: 90px;
    background: @color-theme-sub;
  }
  .info-div {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: 18px;
    .title {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      font-weight: 800;
      font-size: 25px;
      border-bottom: 1px solid black;
      .name-div {
        display: flex;
        flex-direction: row;
        align-items: center;
        .gg {
          margin-left: 2px;
        }
        .tag {
          margin-left: 2px;
          font-size: 18px;
          font-weight: normal;
          // border: 1px solid @color-theme;
        }
      }
      .slogan-div {
        display: flex;
        flex-direction: row;
        .slogan {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          font-size: 18px;
          color: @color-theme-sub;
          margin-top: 6px;
        }
      }
    }
    .detail {
      display: flex;
      flex-direction: row;
      margin-top: 5px;
      font-size: 16px;
      .sub-detial {
        color: @color-theme-sub;
        margin-left: 4px;
      }
    }
    .function-btn {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      height: 22px;
      width: 100%;
      margin-top: 8px;
      border: 1px solid @color-theme;
      cursor: pointer;
    }
  }
}
.level-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
  .title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    border-bottom: 1px solid @color-theme;
    .main-title {
      display: flex;
      font-size: 18px;
    }
    .punch-btn {
      display: flex;
      align-items: flex-end;
      padding: 0 4px;
      font-size: 16px;
      line-height: 16px;
      border: 1px solid @color-theme;
      border-bottom: 0;
      cursor: pointer;
      background-color: @color-anti-theme-sub;
      &.isLoading {
        cursor: wait;
      }
      &.disabled {
        cursor: default;
      }
    }
  }
  .progress-div {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    .level-badge {
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      font-size: 20px;
      line-height: 20px;
    }
    .process-border {
      display: flex;
      flex-direction: row;
      flex: 1;
      margin-left: 4px;
      border: 1px solid @color-theme;
      .process-fill {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        background-color: @color-theme;
        color: @color-anti-theme;
        cursor: default;
        &::selection {
          background: none;
        }
      }
    }
    .exp-badge {
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      font-size: 20px;
      line-height: 20px;
      margin-left: 8px;
    }
  }
}
.my-comments-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 50px;
  .title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    border-bottom: 1px solid black;
    .main-title {
      display: flex;
      font-size: 18px;
    }
    .btn {
      display: flex;
      align-items: flex-end;
      padding: 0 4px;
      font-size: 16px;
      line-height: 16px;
      border: 1px solid @color-theme;
      border-bottom: 0;
      cursor: pointer;
      background-color: @color-anti-theme-sub;
    }
  }
  .comments-div {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
  }
}
</style>
