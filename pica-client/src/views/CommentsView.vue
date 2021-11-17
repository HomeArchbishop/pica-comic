<template>
  <div class="comments-container">
    <div class="main">
      <div class="display-card">
        <span class="title">伟论</span>
        <div class="list-area" v-if="isFoundAny">
          <Comment v-for="item in topCommentList" :key="item._id" :item="item"/>
          <Comment v-for="item in commentList" :key="item._id" :item="item"/>
          <div class="tip-note" v-if="isUpdating">正在加载，请等待</div>
        </div>
        <div class="empty-area" v-else>
          <div class="empty-tips">什么都没有</div>
        </div>
        <div class="more-btn-area" v-if="commentList.length && !isAll && !isUpdating">
          <div class="more-btn" @click="updatePage()">加载更多</div>
        </div>
      </div>
    </div>
    <div class="send-text-card">
      <form @submit.prevent>
        <input type="text" placeholder="发布你的伟论" v-model="commentInput" ref="commentInput">
        <input type="button" value="发送" @click.stop="sendComments()">
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentsView',
  data () {
    return {
      token: localStorage.token,
      comicId: this.$route.params.id,
      commentInput: '',
      isAll: false,
      isFoundAny: true,
      isUpdating: false,
      commentList: [],
      topCommentList: [],
      currentPage: 1
    }
  },
  methods: {
    updatePage: async function () {
      if (this.isAll) { return }
      // change state.
      this.$set(this, 'isUpdating', true)
      // call api to search.
      const resultInfo = await this.$api.comments(this.token, this.comicId, this.currentPage)
      const commentsInfo = resultInfo.comments
      const topCommentsList = resultInfo.topComments
      this.topCommentList.push(...topCommentsList)
      this.commentList.push(...commentsInfo.docs)
      console.log(resultInfo)
      // change state.
      this.$set(this, 'isUpdating', false)
      // judge if empty.
      if (!commentsInfo.pages) {
        this.$set(this, 'isFoundAny', false)
      }
      // judge if is all, if not, then pageCount++.
      if (+commentsInfo.page === +commentsInfo.pages) {
        this.$set(this, 'isAll', true)
      } else {
        this.$set(this, 'currentPage', this.currentPage + 1)
      }
    },
    sendComments: async function () {
      if (!this.commentInput) {
        this.$refs.commentInput.focus()
        return
      }
      // call api.
      // - tip: sendState: 'success' | string
      const sendState = await this.$api.sendComments(this.token, this.comicId, this.commentInput)
      // judge state.
      if (sendState === 'success') {
        this.$set(this, 'commentInput', '')
        this.$dialog({
          title: '发送成功',
          content: '评论刷新页面后可见。',
          autoClose: 3000
        })
      } else {
        const _this = this
        this.$dialog({
          title: '发送失败',
          content: '请重新发送。',
          confirm () {
            _this.$refs.commentInput.focus()
          },
          close () {
            _this.$refs.commentInput.focus()
          }
        })
      }
    }
  },
  created () {
    this.$route.params.id && this.updatePage()
  }
}
</script>

<style lang="less" scoped>
@import '../assets/less/color';
.comments-container {
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
  padding-bottom: 70px;
  .display-card {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
    .title {
      font-weight: 800;
      font-size: 25px;
    }
    .list-area,
    .empty-area {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      padding-top: 10px;
      border-top: 1px solid black;
      .tip-note {
        padding-top: 10px;
        cursor: pointer;
      }
    }
    .more-btn-area {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      padding-top: 10px;
      margin-bottom: 10px;
      .more-btn {
        cursor: pointer;
      }
    }
  }
}
.send-text-card {
  display: flex;
  position: sticky;
  bottom: 0;
  height: 70px;
  width: 100%;
  background-color: @color-anti-theme;
  box-shadow: 0 0 14px 1px @color-anti-theme-sub;
  z-index: 502;
  padding: 20px;
  transition: box-shadow 400ms;
  &:focus-within {
    box-shadow: 0 0 40px 1px @color-anti-theme-sub;
  }
  form {
    display: flex;
    flex: 1;
    input[type=text] {
      display: flex;
      flex: 1;
      outline-style: none;
      border: none;
      border-bottom: 1px solid @color-anti-theme-sub;
      font-size: 18px;
      transition: border-bottom-color 400ms;
      &:focus {
        border-bottom-color: @color-theme;
        & + input[type=button] {
          background-color: @color-theme;
        }
      }
    }
    input[type=button] {
      display: flex;
      outline-style: none;
      border: none;
      background-color: @color-anti-theme-sub;
      color: @color-anti-theme;
      font-size: 18px;
      margin-left: 0;
      transition: background-color 400ms;
      cursor: pointer;
    }
  }
}
</style>
