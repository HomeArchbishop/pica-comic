<template>
  <div class="picture-container">
    <div class="main">
      <div class="display-card">
        <img v-for="item in pictureListDocsList" :key="item._id" :src="$util.formatImgUrl(item.media.fileServer, item.media.path)">
        <div class="more-btn-area" v-if="pictureListDocsList.length">
          <div class="more-btn" @click="updateNewPicturePage()" v-if="!isUpdating && !isAll">加载更多</div>
          <div class="end-btn" v-else-if="isAll">本章结束</div>
          <div class="loading-btn" v-else>正在加载，请等待</div>
        </div>
      </div>
    </div>
    <DarkmodeWidget/>
  </div>
</template>

<script>
import DarkmodeWidget from '../components/DarkmodeWidget'
export default {
  name: 'ComicPictureView',
  components: {
    DarkmodeWidget
  },
  data () {
    return {
      token: localStorage.token,
      comicId: this.$route.params.id,
      comicOrder: this.$route.params.order,
      pictureListDocsList: [],
      currentPage: 1,
      isAll: false,
      isUpdating: false
    }
  },
  methods: {
    updateNewPicturePage: async function () {
      // change states.
      this.$set(this, 'isUpdating', true)
      // call api to update
      const pictureObjectResults = await this.$api.picture(this.token, this.comicId, this.comicOrder, this.currentPage)
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
    }
  },
  created () {
    this.updateRecentStorage()
    this.updateNewPicturePage()
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
    padding-top: 10px;
    margin-bottom: 10px;
    .loading-btn,
    .more-btn {
      cursor: pointer;
    }
  }
}
</style>
