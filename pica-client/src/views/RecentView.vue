<template>
  <div class="recent-container">
    <div class="main">
      <div class="display-card">
        <span class="title">最近观看</span>
        <div class="list-area">
          <ItemLarge v-for="item in recentComicsList" :key="item._id" :item="item"
            :link="`../comicdetail/${item._id}`"/>
        </div>
        <div class="empty-area" v-if="!recentComicsList.length && !isSearching">
          <div class="empty-tips">什么都没有</div>
        </div>
        <div class="more-btn-area" v-if="recentComicsList.length && !isAll && !isSearching">
          <div class="more-btn" @click="updatePage()">加载更多</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecentView',
  data () {
    return {
      token: localStorage.token,
      recentComicsIdList: JSON.parse(localStorage.recentComicsIdList || '[]'),
      recentComicsList: [],
      currentPage: 0,
      isAll: false,
      isSearching: true
    }
  },
  methods: {
    initEmptyList: async function () {
      const askedIdList = this.recentComicsIdList.slice(this.currentPage * 20, this.currentPage * 20 + 20)
      const length = askedIdList.length
      const newArray = []
      for (let index = 0; index < length; index++) {
        newArray[index] = {
          _id: Math.random().toString(),
          thumb: {
            fileServer: '#',
            originalName: '#',
            path: '#'
          }
        }
      }
      this.recentComicsList.push(...newArray)
    },
    getOneComicDetail: async function (index, bookId) {
      const detailObject = await this.$api.info(this.token, bookId)
      console.log(detailObject)
      this.$set(this.recentComicsList, index, detailObject)
      console.log('list', [...this.recentComicsList])
    },
    updatePage: async function () {
      // change state.
      this.$set(this, 'isSearching', true)
      // call api for each.
      const askedIdList = this.recentComicsIdList.slice(this.currentPage * 20, this.currentPage * 20 + 20)
      askedIdList.reverse().forEach((bookId, index) => {
        this.getOneComicDetail(index + this.currentPage * 20, bookId)
      })
      // update isAll and currentPage.
      this.$set(this, 'isAll', (this.currentPage + 1) * 20 >= this.recentComicsIdList.length)
      this.$set(this, 'currentPage', this.currentPage + !!this.isAll)
      // change state.
      this.$set(this, 'isSearching', false)
    }
  },
  created: async function () {
    await this.initEmptyList()
    this.updatePage()
  }
}
</script>

<style lang="less" scoped>
@import '../assets/less/color';
.recent-container {
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
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  .title {
    font-weight: 800;
    font-size: 25px;
  }
  .list-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 220px;
    padding-top: 10px;
    border-top: 1px solid black;
  }
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
