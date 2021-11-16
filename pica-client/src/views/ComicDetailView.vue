<template>
  <div class="detail-container">
    <div class="main">
      <div class="comic-card" v-if="!isRequestingDetail">
        <div class="img-div">
          <img :src="$util.formatImgUrl(thumb.fileServer, thumb.path)" alt="加载失败">
        </div>
        <div class="content-div">
          <div class="title">{{ comicDetailObject.title }}</div>
          <div class="description">
            <span class="preview" v-if="isDescriptionPreview">
              {{ comicDetailObject.description.slice(0, 30) }}...
            </span>
            <span class="all" v-if="!isDescriptionPreview">
              {{ comicDetailObject.description }}
            </span>
            <u class="toggle-btn" @click.stop="toggleDescriptionPreview()">
              {{ isDescriptionPreview ? '展开&gt;' : '&lt;收起' }}
            </u>
          </div>
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
          <div class="download-btn" @click.stop="toggleDownload()">
            <i class="gg-arrow-down"></i>
          </div>
        </div>
      </div>
      <div class="episodes-area" v-if="!isRequestingDetail && !isChoosingDownLoad">
        <div class="title">章节列表</div>
        <div class="episodes-list">
          <router-link class="episodes-item a-theme" v-for="item in episodesList" :key="item.order"
            :to="`../comic/${comicId}/${item.order}`">{{ item.title }}</router-link>
        </div>
      </div>
      <div class="download-episodes-area" v-if="!isRequestingDetail && isChoosingDownLoad">
        <div class="tip">请选择要下载的章节</div>
        <div class="tip sub">（由于官方接口的问题，不能保证下载的成功与完整）</div>
        <div class="download-episodes-list">
          <div class="download-episodes-item" v-for="item in episodesList" :key="item.order"
            :class="{
              chosen: episodesDownloadChosenList.includes(String(item.order)) &&
                !episodesDownloadedList.includes(String(item.order)),
              downloaded: episodesDownloadedList.includes(String(item.order))
            }"
            @click.stop="toggleDownloadChosenList(item.order)">{{ item.title }}</div>
        </div>
        <div class="btn-div">
          <div class="btn" @click.stop="toggleDownload()">取消</div>
          <div class="btn" @click.stop="download()"
            :class="{
              disable: !episodesDownloadChosenList.length
            }">下载</div>
        </div>
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
      episodesDownloadChosenList: [],
      episodesDownloadedList: [],
      isFavourite: false,
      isLiked: false,
      isRequestingDetail: true,
      isRequestingFavourite: false,
      isRequestingLike: false,
      isChoosingDownLoad: false,
      isDescriptionPreview: false
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
      const comicDetailObject = await this.$api.info(this.token, this.comicId)
      this.$set(this, 'comicDetailObject', { ...comicDetailObject })
      this.$set(this, 'isFavourite', this.comicDetailObject.isFavourite)
      this.$set(this, 'isLiked', this.comicDetailObject.isLiked)
      this.$set(this, 'isDescriptionPreview', String(this.comicDetailObject.description).length > 30)
      console.log(comicDetailObject)
      // change state.
      this.$set(this, 'isRequestingDetail', false)
    },
    getEpisodesList: async function () {
      const episodesObject = await this.$api.episodes(this.token, this.comicId)
      const episodesList = [ ...episodesObject.docs ] || []
      this.$set(this, 'episodesList', [ ...episodesList ])
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
      const likeAction = await this.$api.like(this.token, this.comicId)
      console.log(likeAction)
      this.$set(this, 'isLiked', likeAction === 'like')
      this.$set(this.comicDetailObject, 'likesCount',
        this.comicDetailObject.likesCount + (likeAction === 'like' ? 1 : -1))
      // change state.
      this.$set(this, 'isRequestingLike', false)
    },
    toggleDownload: async function () {
      this.$set(this, 'isChoosingDownLoad', !this.isChoosingDownLoad)
    },
    toggleDownloadChosenList: async function (orderNum) {
      const order = String(orderNum)
      if (this.episodesDownloadedList.includes(String(order))) { return }
      const chosenSet = new Set(this.episodesDownloadChosenList)
      chosenSet.has(order)
        ? chosenSet.delete(order)
        : chosenSet.add(order)
      this.$set(this, 'episodesDownloadChosenList', Array.from(chosenSet))
    },
    download: async function () {
      this.toggleDownload()
      this.episodesDownloadChosenList.forEach(episodesOrder => {
        this.$api.download(this.token, this.comicId, episodesOrder)
          .then(downloadRes => {
            console.log('download', episodesOrder, downloadRes)
            this.getDownloadedList()
          })
      })
    },
    getDownloadedList: async function () {
      const downloadInfo = await this.$api.downloadInfo()
      console.log(downloadInfo)
      const episodesDownloadedList = downloadInfo[this.comicId] || []
      this.$set(this, 'episodesDownloadedList', [ ...episodesDownloadedList ])
    },
    toggleDescriptionPreview: async function () {
      this.$set(this, 'isDescriptionPreview', !this.isDescriptionPreview)
    }
  },
  created () {
    this.getComicDetail()
    this.getEpisodesList()
    this.getDownloadedList()
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
.comic-card {
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
.episodes-area {
  display: flex;
  flex-direction: column;
  width: 100%;
  box-shadow: 0 0 10px 0 @color-anti-theme-sub;
  border-radius: @card-radius-default;
  margin-top: 20px;
  padding: 0 14px 14px 14px;
  .title {
    display: flex;
    width: fit-content;
    min-width: 4em;
    margin-top: 14px;
    font-size: 20px;
    font-weight: 900;
    margin-bottom: -4px;
    border-bottom: 3px solid @color-anti-theme-sub;
    &::before {
      content: '>';
      margin-right: 4px;
    }
  }
  .episodes-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 4px;
    ::selection {
      text-decoration: none;
    }
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
}
.download-episodes-area {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  box-shadow: 0 0 10px 0 @color-anti-theme-sub;
  border-radius: @card-radius-default;
  padding: 10px;
  margin-top: 20px;
  *::selection {
    text-decoration: none;
  }
  .tip {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    align-items: center;
    cursor: default;
    &.sub {
      color: @color-theme-sub;
    }
  }
  .download-episodes-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    .download-episodes-item {
      display: flex;
      border: 1px solid @color-anti-theme-sub;
      margin-right: 5px;
      margin-top: 10px;
      padding: 5px;
      height: 26px;
      font-size: 16px;
      line-height: 16px;
      color: @color-theme-sub;
      position: relative;
      cursor: pointer;
      &:last-child {
        margin-right: 0;
      }
      &.chosen {
        border-color: @color-theme;
        background-color: @color-anti-theme-sub;
      }
      &.downloaded {
        border-color: @color-theme;
        cursor: default;
        &::after {
          display: flex;
          width: 12px;
          height: 12px;
          border-radius: 6px;
          content: '';
          background-color: green;
          position: absolute;
          right: -4px;
          bottom: -4px;
        }
      }
    }
  }
  .btn-div {
    display: flex;
    flex-direction: row;
    width: 50%;
    margin-top: 10px;
    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      height: 26px;
      border: 1px solid @color-theme;
      cursor: pointer;
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
      &.disable {
        border-color: @color-theme-sub;
        color: @color-theme-sub;
      }
    }
  }
}
</style>
