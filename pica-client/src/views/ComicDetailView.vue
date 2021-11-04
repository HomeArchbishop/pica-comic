<template>
  <div class="detail-container">
    <div class="main">
      <div class="comic-card" v-if="!isRequestingDetail">
        <div class="img-div">
          <img :src="$util.formatImgUrl(thumb.fileServer, thumb.path)" alt="加载失败">
        </div>
        <div class="content-div">
          <div class="title">{{ comicDetailObject.title }}</div>
          <div class="description">{{ comicDetailObject.description }}</div>
          <div class="author">作者：{{ comicDetailObject.author }}</div>
          <div class="chineseTeam">汉化：{{ comicDetailObject.chineseTeam }}</div>
          <div class="tag-div">
            <router-link :to="`/tag/${tagName}`" class="tag a-theme" v-for="tagName in comicDetailObject.tags" :key="tagName">{{ tagName }}</router-link>
          </div>
          <div class="detail-div">
            <div class="like-count">{{ comicDetailObject.likesCount }}&ensp;<i class="gg-heart"></i>&ensp;|&ensp;</div>
            <div class="view-count">{{ comicDetailObject.viewsCount }}&ensp;<i class="gg-eye"></i>&ensp;|&ensp;</div>
            <router-link class="comments-count a-theme" :to="`/comments/${comicId}`">{{ comicDetailObject.commentsCount }}&ensp;<i class="gg-comment"></i></router-link>
          </div>
        </div>
        <div class="like-favourite-div">
          <div class="favourite-btn" :class="{active: isFavourite, loading: isRequestingFavourite}" @click.stop="toggleFavourite()">
            <!--{{ isFavourite ? `已藏` : `收藏` }}-->
            <i class="gg-bookmark"></i>
          </div>
          <div class="like-btn" :class="{active: isLiked, loading: isRequestingLike}" @click.stop="toggleLike()">
            <i class="gg-heart"></i>
          </div>
        </div>
      </div>
      <div class="episodes-list" v-if="!isRequestingDetail">
        <router-link class="episodes-item a-theme" v-for="item in episodesList.docs" :key="item.order" :to="`../comic/${comicId}/${item.order}`">{{ item.title }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComicDetailView',
  data () {
    return {
      token: localStorage.token,
      comicDetailObject: {},
      episodesList: [],
      isFavourite: false,
      isLiked: false,
      isRequestingDetail: true,
      isRequestingFavourite: false,
      isRequestingLike: false
    }
  },
  computed: {
    thumb () {
      return this.comicDetailObject.thumb || {}
    },
    comicId () {
      return this.$route.params.id
    }
  },
  methods: {
    getComicDetail: async function () {
      // change state.
      this.$set(this, 'isRequestingDetail', true)
      // call api.
      this.$set(this, 'comicDetailObject', await this.$api.info(this.token, this.comicId))
      this.$set(this, 'isFavourite', this.comicDetailObject.isFavourite)
      this.$set(this, 'isLiked', this.comicDetailObject.isLiked)
      console.log(this.comicDetailObject)
      // change state.
      this.$set(this, 'isRequestingDetail', false)
    },
    getEpisodesList: async function () {
      this.$set(this, 'episodesList', await this.$api.episodes(this.token, this.comicId))
      console.log(this.episodesList)
    },
    toggleFavourite: async function () {
      if (this.isRequestingFavourite) { return }
      // change state.
      this.$set(this, 'isRequestingFavourite', true)
      // call api.
      const favouriteAction = await this.$api.favourite(this.token, this.comicId)
      this.$set(this, 'isFavourite', favouriteAction === 'favourite')
      // change state.
      this.$set(this, 'isRequestingFavourite', false)
    },
    toggleLike: async function () {
      if (this.isRequestingLike) { return }
      // change state.
      this.$set(this, 'isRequestingLike', true)
      // call api.
      const LikeAction = await this.$api.like(this.token, this.comicId)
      console.log(LikeAction)
      this.$set(this, 'isLiked', LikeAction === 'like')
      // change state.
      this.$set(this, 'isRequestingLike', false)
    }
  },
  created () {
    this.getComicDetail()
    this.getEpisodesList()
  }
}
</script>

<style lang="less" scoped>
@import 'https://css.gg/css';
@import '../assets/less/color';
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
.comic-card {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 20px;
  .img-div {
    display: flex;
    flex-direction: column;
    justify-content: center;
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
      .view-count,
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
      }
    }
  }
  .like-favourite-div {
    display: flex;
    flex-direction: column;
    width: 40px;
    margin-left: 20px;
    .favourite-btn,
    .like-btn {
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
.episodes-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  .episodes-item {
    display: flex;
    border: 1px solid @color-theme;
    margin-right: 5px;
    margin-top: 10px;
    padding: 5px;
    height: 26px;
    font-size: 16px;
    line-height: 16px;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
