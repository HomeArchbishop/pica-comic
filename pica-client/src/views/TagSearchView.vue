<template>
  <div class="search-container" ref="searchContainer">
    <div class="main">
      <div class="display-card">
        <div class="title">标签：{{ tag }}</div>
        <div class="menu-area" v-if="isFoundAny || isSearching">
          <div class="sort-list">
            <div class="sort-item" @click.stop="changeSort(item.code)" :class="{ current: sort === item.code }"
              v-for="item in $store.state.global.sortList" :key="item.code">{{ item.name }}</div>
          </div>
        </div>
        <div class="list-area" v-if="isFoundAny">
          <ItemLarge v-for="item in searchResultList" :key="item._id" :item="item" :link="`../comicdetail/${item._id}`"/>
        </div>
        <LoadingRow v-if="isFoundAny && isSearching"/>
        <TipRow v-if="!isFoundAny">什么都没有</TipRow>
        <TipRowBtn v-if="searchResultList.length && !isAll && !isSearching" @click.native="updatePage()">加载更多</TipRowBtn>
        <TipRow v-if="isFoundAny && isAll">没有更多了</TipRow>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TagSearchView',
  data () {
    return {
      token: localStorage.token,
      searchResultList: [],
      currentPage: 1,
      isAll: false,
      isFoundAny: true,
      isSearching: false
    }
  },
  computed: {
    tag () {
      return this.$route.params.t
    },
    sort () {
      const sort = this.$route.query.s || localStorage.sort || 'ua'
      // auto update localStorage.
      localStorage.sort = sort
      return sort
    }
  },
  methods: {
    updatePage: async function () {
      if (this.isAll) { return }
      // change state.
      this.$set(this, 'isSearching', true)
      // call api to search.
      const searchResultInfo = await this.$api.tagSearch(this.token, this.tag, this.currentPage, this.sort)
      this.searchResultList.push(...searchResultInfo.docs)
      console.log(searchResultInfo, searchResultInfo.page, searchResultInfo.pages)
      this.$set(this, 'isAll', +searchResultInfo.page === +searchResultInfo.pages)
      this.$set(this, 'currentPage', this.currentPage + !this.isAll)
      this.$set(this, 'isFoundAny', !!searchResultInfo.total)
      // change state.
      this.$set(this, 'isSearching', false)
    },
    changeSort: async function (sortCode) {
      if (this.sort === sortCode) { return }
      this.$router.push({ path: `./`, params: {t: this.tag}, query: {s: sortCode} })
    }
  },
  watch: {
    $route () {
      // init result data.
      Object.assign(this.$data, this.$options.data())
      // call for new data.
      this.updatePage()
      console.log('route_update_watch')
    }
  },
  created () {
    this.updatePage()
  }
}
</script>

<style lang="less" scoped>
@import '../assets/less/color';
@import '../assets/less/var';
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
    border-bottom: 1px solid @color-theme;
  }
  .menu-area {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 50px;
    margin-top: 10px;
    padding: 10px;
    box-shadow: 0 0 8px 2px @color-anti-theme-sub;
    border-radius: @card-radius-default;
    .sort-list {
      display: flex;
      overflow-x: scroll;
      width: 50%;
      &::-webkit-scrollbar {
        display: none;
      }
      .sort-item{
        display: flex;
        min-width: 2em;
        cursor: pointer;
        color: @color-theme-sub;
        &:not(:first-child) {
          margin-left: 10px;
        }
        &.current {
          cursor: default;
          color: @color-theme;
          font-weight: bold;
        }
      }
    }
  }
  .list-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
}
</style>
