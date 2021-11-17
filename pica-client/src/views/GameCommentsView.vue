<template>
  <div class="comments-container">
    <div class="main">
      <div class="display-card">
        <span class="title">伟论</span>
        <div class="list-area" v-if="isFoundAny">
          <Comment v-for="item in topCommentList" :key="item._id" :item="item"/>
          <Comment v-for="item in commentList" :key="item._id" :item="item"/>
        </div>
        <LoadingRow v-if="isFoundAny && isUpdating"/>
        <TipRow v-if="!isFoundAny">什么都没有</TipRow>
        <TipRowBtn v-if="commentList.length && !isAll && !isUpdating" @click.native="updatePage()">加载更多</TipRowBtn>
        <TipRow v-if="isFoundAny && isAll">没有更多了</TipRow>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameCommentsView',
  data () {
    return {
      token: localStorage.token,
      gameId: this.$route.params.id,
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
      const resultInfo = await this.$api.gameComments(this.token, this.gameId, this.currentPage)
      const commentsInfo = resultInfo.comments
      this.commentList.push(...commentsInfo.docs)
      if (+commentsInfo.page === 1) {
        const topCommentsList = resultInfo.topComments
        this.topCommentList.push(...topCommentsList)
      }
      console.log(commentsInfo)
      this.$set(this, 'isFoundAny', !!commentsInfo.pages)
      this.$set(this, 'isAll', +commentsInfo.page === +commentsInfo.pages)
      this.$set(this, 'currentPage', this.currentPage + !this.isAll)
      // change state.
      this.$set(this, 'isUpdating', false)
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
    border-bottom: 1px solid @color-theme;
  }
  .list-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
}
</style>
