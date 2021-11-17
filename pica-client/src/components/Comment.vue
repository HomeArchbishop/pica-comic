<template>
  <div class="comment-item" v-if="!item.hide">
    <div class="comment-main">
      <div class="top-tag" v-if="item.isTop">
        <div class="bg"></div>
        <div class="tag-word">置顶</div>
      </div>
      <div class="name-div">
        <img :src="avatarImg" @click.prevent>
        <div class="info-div">
          <div class="name">
            {{ item._user.name.substr(0, 20) + (item._user.name.slice(20) ? '...' : '') }}
            <i class="gg"
              :class="{
                'gg-gender-male': item._user.gender === 'm',
                'gg-gender-female': item._user.gender === 'f',
                'gg-bot': item._user.gender === 'bot'
              }"></i>
          </div>
          <div class="sub-row">
            <div class="level">LV{{ item._user.level }}</div>
            <div class="time">{{ createdTime }}</div>
          </div>
        </div>
      </div>
      <div class="content-div">
        <div class="words-div">
          {{ item.content }}
        </div>
        <div class="detail-div">
          <div class="like-count" :class="{ active: item.isLiked }" @click.stop="commentLike()">
            {{ item.likesCount || 0 }}&ensp;<i class="gg-heart"></i>
          </div>
          &ensp;
          <div class="comments-count" @click.stop="toggleChildrenComments()"
          >{{ item.commentsCount || 0 }}&ensp;<i class="gg-comment"></i></div>
        </div>
      </div>
    </div>
    <div class="comment-children" v-if="isShowChildrenComment && (childrenCommentList.length || isRequestingChildrenComment)">
      <Comment v-for="item in childrenCommentList" :key="item._id" :item="item"/>
      <div class="loading-icon" v-if="isRequestingChildrenComment">子评论加载中...</div>
      <div class="btn-div" v-if="!isRequestingChildrenComment">
        <div class="btn" @click.stop="toggleChildrenComments()">收起</div>
        <div class="btn" @click.stop="updateChildrenComments()" v-if="!isChildrenCommentAll">加载更多</div>
      </div>
    </div>
  </div>

</template>

<script>
import Comment from './Comment'
export default {
  name: 'Comment',
  components: {
    Comment
  },
  props: [
    'item',
    '_user'
  ],
  data () {
    return {
      token: localStorage.token,
      childrenCommentList: [],
      childrenCommentCurrentPage: 1,
      isRequestingChildrenComment: false,
      isShowChildrenComment: false,
      isChildrenCommentAll: false,
      isAskLiked: false
    }
  },
  computed: {
    avatarImg () {
      const fileServer = this.item._user.avatar && this.item._user.avatar.fileServer
      const path = this.item._user.avatar && this.item._user.avatar.path
      return this.$util.formatImgUrl(fileServer, path) || '../../static/img/black.jpeg'
    },
    createdTime () {
      return this.$util.formatTime(this.item.created_at)
    }
  },
  methods: {
    commentLike: async function () {
      if (this.isAskLiked) { return }
      // change state.
      this.$set(this.item, 'isAskLiked', true)
      // pretend to be callback, for a more smooth use.
      const { likesCount } = this.item
      if (this.item.isLiked) {
        this.$set(this.item, 'isLiked', false)
        this.$set(this.item, 'likesCount', this.item.likesCount - 1)
      } else {
        this.$set(this.item, 'isLiked', true)
        this.$set(this.item, 'likesCount', this.item.likesCount + 1)
      }
      // call api.
      const likeAction = await this.$api.commentLike(this.token, this.item._id)
      this.$set(this.item, 'likesCount', likesCount)
      if (likeAction === 'like') {
        this.$set(this.item, 'isLiked', true)
        this.$set(this.item, 'likesCount', this.item.likesCount + 1)
      } else {
        this.$set(this.item, 'isLiked', false)
        this.$set(this.item, 'likesCount', this.item.likesCount - 1)
      }
      // change state.
      this.$set(this.item, 'isAskLiked', false)
    },
    updateChildrenComments: async function () {
      if (this.isChildrenCommentAll || !this.item.commentsCount) { return }
      // change state.
      this.$set(this, 'isRequestingChildrenComment', true)
      // call api.
      const commentObj = await this.$api.childrenComments(this.token, this.item._id, this.childrenCommentCurrentPage)
      this.childrenCommentList.push(...commentObj.docs)
      console.log(commentObj, this.childrenCommentList)
      this.$set(this, 'isChildrenCommentAll', +commentObj.page === +commentObj.pages)
      this.$set(this, 'childrenCommentCurrentPage', this.childrenCommentCurrentPage + !this.isChildrenCommentAll)
      // change state.
      this.$set(this, 'isRequestingChildrenComment', false)
    },
    toggleChildrenComments: async function () {
      this.$set(this, 'isShowChildrenComment', !this.isShowChildrenComment)
      // init first time we call for children comments.
      !this.childrenCommentList.length && !this.isRequestingChildrenComment && this.updateChildrenComments()
    }
  },
  created () {
    this.item._user = this.item._user || this._user
  }
}
</script>
<style lang="less" scoped>
@import 'https://css.gg/css';
@import '../assets/less/color';
@import '../assets/less/var';
.comment-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  margin-top: 10px;
  .comment-main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    min-height: 100px;
    padding: 10px;
    box-shadow: 0 0 8px 2px @color-anti-theme-sub;
    border-radius: @card-radius-default;
    position: relative;
    overflow: hidden;
    .top-tag {
      width: 60px;
      height: 60px;
      position: absolute;
      top: 0;
      right: 0;
      .bg {
        font-size: 18px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0px 60px 60px 0;
        border-color: transparent @color-theme transparent transparent;
      }
      .tag-word {
        color: @color-anti-theme;
        position: absolute;
        top: 12px;
        right: 8px;
        transform: rotate(45deg);
      }
    }
    .name-div {
      display: flex;
      flex: 1;
      flex-direction: row;
      max-height: 52px;
      min-height: 52px;
      line-height: 25px;
      img {
        min-width: 52px;
        max-width: 52px;
        min-height: 52px;
        max-height: 52px;
        border: none;
        border-radius: 26px;
        background: #000;
      }
      .info-div {
        display: flex;
        flex: 1;
        flex-direction: column;
        margin-left: 12px;
        .name {
          display: flex;
          margin-top: 4px;
          line-height: 18px;
          font-size: 18px;
          font-weight: 600;
          .gg {
            margin-left: 2px;
          }
        }
        .sub-row {
          display: flex;
          flex-direction: row;
          margin-top: 8px;
          .level,
          .time {
            display: flex;
            color: @color-theme-sub;
            line-height: 16px;
            font-size: 16px;
            margin-left: 8px;
            &:first-child {
              margin-left: 0;
            }
          }
        }
      }
    }
    .content-div {
      display: flex;
      flex: 1;
      flex-direction: column;
      align-items: flex-start;
      height: 100%;
      margin-top: 6px;
      .words-div {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        text-indent: 2em;
        font-size: 1em;
      }
      .detail-div {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        width: 100%;
        .like-count,
        .comments-count {
          display: flex;
          align-items: center;
          margin-left: 5px;
          margin-top: 8px;
          padding: 2px;
          height: 18px;
          font-size: 14px;
          line-height: 14px;
          cursor: pointer;
          &:first-child {
            margin-left: 0;
          }
          &.active {
            color: @color-active-highlight-2
          }
        }
      }
    }
  }
  .comment-children {
    display: flex;
    flex-direction: column;
    width: 90%;
    .comment-item:first-child {
      margin-top: 10px !important;
    }
    .loading-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 50px;
      padding: 10px;
      margin-top: 10px;
      box-shadow: 0 0 8px 2px @color-anti-theme-sub;
      border-radius: @card-radius-default;
    }
    .btn-div {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-top: 10px;
      .btn {
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
        height: 50px;
        box-shadow: 0 0 8px 2px @color-anti-theme-sub;
        border-radius: @card-radius-default;
        cursor: pointer;
        &:not(:first-child) {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
