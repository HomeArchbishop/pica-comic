<template>
  <div class="comments-container">
    <div class="main">
      <div class="display-card">
        <span class="title">伟论</span>
        <div class="list-area" v-if="isFoundAny">
          <Comment v-for="item in topCommentList" :key="item._id" :item="item" :isTop="true"/>
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
  </div>
</template>

<script>
export default {
  name: 'CommentsView',
  data () {
    return {
      token: localStorage.token,
      bookId: this.$route.params.id,
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
      const resultInfo = await this.$api.comments(this.token, this.bookId, this.currentPage)
      const commentsInfo = resultInfo.comments
      const topCommentsList = resultInfo.topComments
      this.topCommentList.push(...topCommentsList)
      this.commentList.push(...commentsInfo.docs)
      console.log(commentsInfo)
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
}
.input-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 30px;
  form {
    display: flex;
    padding: 0;
    margin: 0;
    height: fit-content;
    width: 100%;
    input {
      width: 100%;
      display: block;
      box-sizing: border-box;
      height: 40px;
      padding: 2px 1px 2px 5px;
      font-size: 20px;
      border: 2px solid @color-theme;
      outline: none;
    }
  }
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
</style>
