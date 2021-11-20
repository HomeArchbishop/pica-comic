<template>
  <div class="picture-container" ref="container">
    <div class="main">
      <div class="display-card">
        <img v-for="item in pictureListDocsList" :key="item._id"
          :src="$util.formatImgUrl(item.media.fileServer, item.media.path)">
        <div class="more-btn-area" v-if="pictureListDocsList.length"
          @click="nextAction()">
          <div class="more-btn" v-if="!isUpdating && !isAll">加载更多</div>
          <div class="end-btn" v-else-if="isAll && episodesList.length">
            <span>看到底了</span>
            <span class="next-action-btn">
              {{ currentEpisodeIndex ? '下一章节' : '回到目录' }}
            </span>
          </div>
          <div class="loading-btn" v-else>正在加载，请等待</div>
        </div>
      </div>
    </div>
    <Widget @click.native="scrollToTop()" sort="3">顶</Widget>
    <Widget @click.native="scrollToBottom()" sort="2">底</Widget>
    <DarkmodeWidget sort="1"/>
  </div>
</template>

<script>
import DarkmodeWidget from '../components/DarkmodeWidget'
import Widget from '../components/Widget'
export default {
  name: 'ComicPictureView',
  components: {
    DarkmodeWidget,
    Widget
  },
  data () {
    return {
      token: localStorage.token,
      pictureListDocsList: [],
      episodesList: [],
      currentPage: 1,
      isAll: false,
      isUpdating: false
    }
  },
  computed: {
    currentEpisodeIndex () {
      return this.episodesList.findIndex((item = {}) =>
        `${item.order}` === `${this.comicOrder}`)
    },
    comicId () {
      return this.$route.params.id
    },
    comicOrder () {
      return this.$route.params.order
    }
  },
  methods: {
    updateNewPicturePage: async function () {
      // change states.
      this.$set(this, 'isUpdating', true)
      // call api to update
      const pictureObjectResults = await this.$api.picture(this.token,
        this.comicId, this.comicOrder, this.currentPage)
      this.pictureListDocsList.push(...pictureObjectResults.pages.docs)
      if (pictureObjectResults.pages.page === pictureObjectResults.pages.pages) {
        this.$set(this, 'isAll', true)
      } else {
        this.$set(this, 'currentPage', this.currentPage + 1)
      }
      console.log(pictureObjectResults)
      // change states.
      this.$set(this, 'isUpdating', false)
    },
    updateRecentStorage () {
      const newRecentComicsSet = new Set(JSON.parse(localStorage.recentComicsIdList || '[]'))
      newRecentComicsSet.delete(this.comicId)
      newRecentComicsSet.add(this.comicId)
      localStorage.recentComicsIdList = JSON.stringify(Array.from(newRecentComicsSet))
    },
    getEpisodesList: async function () {
      const episodesObject = await this.$api.episodes(this.token, this.comicId)
      const episodesList = [ ...episodesObject.docs ]
      this.$set(this, 'episodesList', [ ...episodesList ])
      console.log(episodesList)
    },
    nextEpisodes: async function () {
      const nextEpisodeOrder = this.episodesList[+this.currentEpisodeIndex - 1].order
      this.$router.push({ path: `/comic/${this.comicId}/${nextEpisodeOrder}` })
    },
    backToDetail: async function () {
      this.$router.push({ path: `/comicdetail/${this.comicId}` })
    },
    nextAction: async function () {
      if (!this.isUpdating && !this.isAll) {
        this.updateNewPicturePage()
      } else if (this.isAll && this.episodesList.length) {
        console.log('here')
        if (this.episodesList.length && this.currentEpisodeIndex) {
          this.nextEpisodes()
        } else {
          this.backToDetail()
        }
      }
    },
    scrollToTop: async function () {
      const container = this.$refs.container
      container.scrollTo(0, 0)
    },
    scrollToBottom: async function () {
      const container = this.$refs.container
      container.scrollTo(0, container.scrollHeight)
    }
  },
  watch: {
    $route () {
      // init result data.
      Object.assign(this.$data, this.$options.data())
      // call for new data.
      this.updateRecentStorage()
      this.updateNewPicturePage()
      this.getEpisodesList()
      console.log('route_update_watch')
    }
  },
  created () {
    this.updateRecentStorage()
    this.updateNewPicturePage()
    this.getEpisodesList()
  }
}
</script>

<style lang="less" scoped>
@import '../assets/less/color';
.picture-container {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  height: 100%;
  overflow-y: scroll;
  scroll-behavior: smooth;
}
.main {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 90%;
}
.display-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  img {
    width: 50%;
    background-color: @color-theme-sub;
  }
  .more-btn-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    color: @color-anti-theme-sub;
    margin-bottom: 10px;
    cursor: pointer;
    user-select: none;
    .loading-btn,
    .more-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50%;
      height: 100px;
      background-color: @color-theme-sub;
    }
    .end-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50%;
      height: 100px;
      background-color: @color-theme-sub;
      .next-action-btn{
        margin-left: 1em;
      }
    }
  }
}
</style>
