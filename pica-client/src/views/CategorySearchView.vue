<template>
  <div class="search-container" ref="searchContainer">
    <div class="main">
      <div class="display-card">
        <div class="title">分类：{{ category }}</div>
        <div class="list-area" v-if="isFoundAny">
          <ItemLarge v-for="item in searchResultList" :key="item._id" :item="item" :link="`../comicdetail/${item._id}`"/>
          <div class="tip-note" v-if="isSearching">正在加载，请等待</div>
        </div>
        <div class="empty-area" v-else>
          <div class="empty-tips">什么都没有</div>
        </div>
        <div class="more-btn-area" v-if="searchResultList.length && !isAll && !isSearching">
          <div class="more-btn" @click="updatePage()">加载更多</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchView',
  data () {
    return {
      token: localStorage.token,
      category: '',
      searchResultList: [],
      currentPage: 1,
      sort: 'ld',
      isAll: false,
      isFoundAny: true,
      isSearching: false
    }
  },
  methods: {
    updatePage: async function () {
      if (this.isAll) { return }
      // change state.
      this.$set(this, 'isSearching', true)
      // call api to search.
      const searchResultInfo = await this.$api.categoriesSearch(this.token, this.category, this.currentPage, this.sort)
      this.searchResultList.push(...searchResultInfo.docs)
      console.log(searchResultInfo, searchResultInfo.page, searchResultInfo.pages)
      // change state.
      this.$set(this, 'isSearching', false)
      // judge if empty.
      if (!searchResultInfo.total) {
        this.$set(this, 'isFoundAny', false)
      }
      // judge if is all, if not, then pageCount++.
      if (+searchResultInfo.page === +searchResultInfo.pages) {
        this.$set(this, 'isAll', true)
      } else {
        this.$set(this, 'currentPage', this.currentPage + 1)
      }
    }
  },
  watch: {
    $route () {
      // init result data.
      this.$set(this, 'isAll', false)
      this.$set(this, 'isFoundAny', true)
      this.$set(this, 'category', this.$route.params.c)
      this.$set(this, 'currentPage', 1)
      this.$set(this, 'searchResultList', [])
      // call for new data.
      this.updatePage()
      console.log('route_update_watch')
    }
  },
  created () {
    this.$set(this, 'category', this.$route.params.c)
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
  .list-area,
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
