<template>
  <div class="recent-container">
    <div class="main">
      <div class="display-card">
        <span class="title">最近观看</span>
        <div class="list-area">
          <ItemLarge v-for="item in recentComicsList" :key="item._id" :item="item" :link="`../comicdetail/${item._id}`"/>
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
      recentComicsList: []
    }
  },
  created () {
    this.recentComicsIdList.reverse().forEach((bookId, index) => {
      this.$set(this.recentComicsList, index, {})
      this.$set(this.recentComicsList[index], '_id', index)
      this.$api.info(this.token, bookId)
        .then(item => {
          console.log(item)
          this.$set(this.recentComicsList, index, item)
        })
        .catch()
    })
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
}
</style>
