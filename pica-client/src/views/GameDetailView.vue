<template>
  <div class="detail-container">
    <div class="main">
      <div class="game-card" v-if="!isRequestingDetail">
        <div class="img-div">
          <img :src="$util.formatImgUrl(icon.fileServer, icon.path)" alt="加载失败">
        </div>
        <div class="content-div">
          <div class="title">{{ gameDetailObject.title }}</div>
          <div class="description">
            <span class="preview" v-if="isDescriptionPreview">
              {{ gameDetailObject.description.slice(0, 30) }}...
            </span>
            <span class="all" v-if="!isDescriptionPreview">
              {{ gameDetailObject.description }}
            </span>
            <u class="toggle-btn" @click.stop="toggleDescriptionPreview()" v-if="isDescriptionShouldPreview">
              {{ isDescriptionPreview ? '展开&gt;' : '&lt;收起' }}
            </u>
          </div>
          <div class="author">作者：{{ gameDetailObject.publisher }}</div>
          <div class="updateTime">最近更新：{{ $util.regTime(gameDetailObject.updated_at) }}</div>
          <div class="detail-div">
            <div class="like-count">{{ gameDetailObject.likesCount }}&ensp;<i class="gg-heart"></i></div>
            <router-link class="comments-count a-theme" :to="`/game/comments/${gameId}`">{{ gameDetailObject.commentsCount }}&ensp;<i class="gg-comment"></i></router-link>
          </div>
          <div class="icon-div">
            <div class="icon" v-if="gameDetailObject.adult">
              <img class="r18" src="../../static/svg/adult.svg"/>
            </div>
            <router-link class="icon" v-if="gameDetailObject.android" tag="div"
              :to="`/link/${this.$util.transferOutURL(gameDetailObject.androidLinks[0])}`">
              <img class="android" src="../../static/svg/android.svg"/>
            </router-link>
            <router-link class="icon" v-if="gameDetailObject.ios" tag="div"
              :to="`/link/${this.$util.transferOutURL(gameDetailObject.iosLinks[0])}`">
              <img class="ios" src="../../static/svg/ios.svg"/>
            </router-link>
          </div>
        </div>
        <div class="like-favourite-div">
          <div class="like-btn" :class="{active: isLiked, loading: isRequestingLike}" @click.stop="toggleLike()">
            <i class="gg-heart"></i>
          </div>
        </div>
      </div>
      <div class="screenshots-card" v-if="gameDetailObject.screenshots">
        <div class="title">游戏截图</div>
        <ul class="img-scroll-ul">
          <li class="img-item-li" v-for="item in gameDetailObject.screenshots" :key="item.path">
            <img :src="$util.formatImgUrl(item.fileServer, item.path)" alt="加载失败">
          </li>
        </ul>
      </div>
      <div class="download-card" v-if="gameDetailObject.ios || gameDetailObject.android">
         <div class="title">下载链接</div>
        <div class="row" v-if="gameDetailObject.android">
          <img class="android" src="../../static/svg/android.svg"/>
          <router-link class="link" tag="div"
            :to="`/link/${this.$util.transferOutURL(gameDetailObject.androidLinks[0])}`">
            下载（{{ gameDetailObject.androidSize }}MB）
          </router-link>
        </div>
        <div class="row" v-if="gameDetailObject.android">
          <img class="android" src="../../static/svg/ios.svg"/>
          <router-link class="link" v-if="gameDetailObject.ios" tag="div"
            :to="`/link/${this.$util.transferOutURL(gameDetailObject.iosLinks[0])}`">
            下载（{{ gameDetailObject.iosSize }}MB）
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameDetailView',
  data () {
    return {
      token: localStorage.token,
      gameDetailObject: {},
      isLiked: false,
      isRequestingDetail: true,
      isRequestingLike: false,
      isDescriptionPreview: false
    }
  },
  computed: {
    icon () {
      return this.gameDetailObject.icon || {}
    },
    gameId () {
      return this.$route.params.id
    },
    isDescriptionShouldPreview () {
      return this.comicDetailObject.description
        ? this.comicDetailObject.description.length > 30
        : false
    }
  },
  methods: {
    getGameDetail: async function () {
      // change state.
      this.$set(this, 'isRequestingDetail', true)
      // call api.
      this.$set(this, 'gameDetailObject', await this.$api.gameInfo(this.token, this.gameId))
      this.$set(this, 'isLiked', this.gameDetailObject.isLiked)
      this.$set(this, 'isDescriptionPreview', String(this.gameDetailObject.description).length > 30)
      console.log(this.gameDetailObject)
      // change state.
      this.$set(this, 'isRequestingDetail', false)
    },
    toggleLike: async function () {
      if (this.isRequestingLike) { return }
      // change state.
      this.$set(this, 'isRequestingLike', true)
      // call api.
      const likeAction = await this.$api.gameLike(this.token, this.gameId)
      console.log(likeAction)
      this.$set(this, 'isLiked', likeAction === 'like')
      this.$set(this.gameDetailObject, 'likesCount',
        this.gameDetailObject.likesCount + (likeAction === 'like' ? 1 : -1))
      // change state.
      this.$set(this, 'isRequestingLike', false)
    },
    toggleDescriptionPreview: async function () {
      this.$set(this, 'isDescriptionPreview', !this.isDescriptionPreview)
    }
  },
  created () {
    this.getGameDetail()
  }
}
</script>

<style lang="less" scoped>
@import 'https://css.gg/css';
@import '../assets/less/color';
@import '../assets/less/var';
.detail-container {
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
.game-card {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 20px;
  .img-div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 140px;
    height: 180px;
    overflow: hidden;
    cursor: pointer;
    img {
      width: 100%;
      max-height: 180px;
      border: none;
    }
  }
  .content-div {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 10px;
    box-sizing: border-box;
    height: 100%;
    line-height: 25px;
    .title {
      font-size: 18px;
      font-weight: 700;
    }
    .description {
      color: @color-theme-sub;
      .toggle-btn {
        display: inline-block;
        cursor: pointer;
      }
    }
    .tag-div {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      .tag {
        display: flex;
        border: 1px solid @color-theme;
        margin-right: 5px;
        margin-top: 1px;
        padding: 2px;
        height: 18px;
        font-size: 14px;
        line-height: 14px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .detail-div {
      display: flex;
      flex-direction: row;
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
        &:first-child {
          margin-left: 0;
        }
        &:not(:last-child)::after {
          margin-left: 1em;
          content: '|';
        }
      }
    }
    .icon-div {
      display: flex;
      flex-direction: row;
      margin-top: 10px;
      .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        border: 1px solid @color-theme-sub;
        border-radius: 20px;
        cursor: pointer;
        img {
          width: 30px;
          height: 30px;
          &.r18 {
            width: 40px;
            height: 40px;
            cursor: default;
          }
        }
        &:not(:first-child) {
          margin-left: 6px;
        }
      }
    }
  }
  .like-favourite-div {
    display: flex;
    flex-direction: column;
    width: 40px;
    margin-left: 20px;
    .favourite-btn,
    .like-btn,
    .download-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      max-width: 40px;
      min-width: 40px;
      max-height: 40px;
      min-height: 40px;
      border: 1px solid @color-theme;
      color: @color-theme;
      cursor: pointer;
      margin-top: 4px;
      &:first-child {
        margin-top: 0;
      }
      &.active {
        &.favourite-btn {
          background-color: @color-active-highlight-1;
        }
        &.like-btn {
          background-color: @color-active-highlight-2;
        }
      }
      &.loading {
        cursor: wait;
      }
    }
  }
}
.screenshots-card{
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding: 20px;
  box-shadow: 0 0 10px 0 @color-anti-theme-sub;
  border-radius: @card-radius-default;
  .title {
    display: flex;
    width: fit-content;
    min-width: 4em;
    font-size: 20px;
    font-weight: 900;
    margin-bottom: -4px;
    border-bottom: 3px solid @color-anti-theme-sub;
    &::before {
      content: '>';
      margin-right: 4px;
    }
  }
  .img-scroll-ul {
    display: -webkit-box;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    margin-top: 10px;
    padding: 0;
    overflow-x: scroll;
    overflow-y: hidden;
    .img-item-li {
      display: flex;
      width: 90%;
      box-sizing: content-box;
      img {
        width: 100%;
        background: @color-theme-sub;
      }
    }
  }
}
.download-card {
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
  margin-top: 10px;
  padding: 20px;
  box-shadow: 0 0 10px 0 @color-anti-theme-sub;
  border-radius: @card-radius-default;
  .title {
    display: flex;
    width: fit-content;
    min-width: 4em;
    font-size: 20px;
    font-weight: 900;
    margin-bottom: -4px;
    border-bottom: 3px solid @color-anti-theme-sub;
    &::before {
      content: '>';
      margin-right: 4px;
    }
  }
  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 16px;
    img {
      width: 30px;
      height: 30px;
    }
    .link {
      cursor: pointer;
      color: @color-theme-sub;
      margin-left: .6em;
      &:hover {
        text-decoration-line: underline;
      }
    }
  }
}
</style>
