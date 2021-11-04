<template>
  <div class="search-container" ref="searchContainer">
    <div class="main">
      <div class="display-card">
        <div class="title">随机</div>
        <div class="list-area">
          <ItemLarge v-for="item in searchResultList" :key="item._id" :item="item" :link="`../comicdetail/${item._id}`"/>
          <div class="tip-note" v-if="isSearching">正在加载，请等待</div>
        </div>
        <div class="more-btn-area" v-if="searchResultList.length && !isSearching">
          <div class="more-btn" @click="updatePage()">刷新</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RandomView',
  data () {
    return {
      token: localStorage.token,
      searchResultList: [],
      isSearching: false
    }
  },
  methods: {
    updatePage: async function () {
      this.$set(this, 'searchResultList', [])
      // change state.
      this.$set(this, 'isSearching', true)
      // call api to search.
      const searchResultList = await this.$api.randomComic(this.token)
      this.$set(this, 'searchResultList', [ ...searchResultList ])
      // change state.
      this.$set(this, 'isSearching', false)
    }
  },
  created () {
    this.updatePage()
  }
}
</script>

<style lang="less" scoped>
@import '../assets/less/color';
.search-container {
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
