<template>
  <div class="search-container" ref="searchContainer">
    <div class="main">
      <div class="input-card">
        <form @submit.prevent="searchNew()">
          <input type="text" placeholder="关键词" v-model="inputKeyword">
        </form>
        <div class="keyword-tag-div">
          <div class="keyword-tag"
            v-for="word in keywordList" :key="word"
            @click.stop="inputKeyword = word; searchNew(word)">{{ word }}</div>
        </div>
      </div>
      <div class="display-card" v-if="keyword">
        <div class="title">搜索结果</div>
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
      inputKeyword: this.keyword || '',
      isAll: false,
      isFoundAny: true,
      isSearching: false,
      searchResultList: [],
      currentPage: 1,
      sort: 'ld'
    }
  },
  computed: {
    keyword: {
      set () {},
      get () {
        return this.$route.params.kw
      }
    },
    keywordList: {
      set () {},
      get () {
        return [...this.$store.state.global.keywordList] || [] // 热词列表 string[]
      }
    }
  },
  methods: {
    updatePage: async function () {
      if (this.isAll) { return }
      // change state.
      this.$set(this, 'isSearching', true)
      // call api to search.
      const searchResultInfo = await this.$api.search(this.token, this.keyword, this.currentPage, this.sort)
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
    },
    searchNew: async function () {
      // if: empty keyword, return.
      if (!this.inputKeyword) { return }
      // if: search the same as the url's query.kw, return.
      if (this.inputKeyword === this.keyword) { return }
      // else: a new search, ask for new page url.
      this.$router.replace({ path: `/search/${this.inputKeyword}` })
    },
    getKeywordList: async function () {
      const keywordList = await this.$api.keyword(this.token)
      this.$set(this, 'keywordList', [...keywordList])
      console.log(keywordList)
      // update Vuex.
      this.$store.commit('global/updateKeywordList', { newKeywordList: [...keywordList] })
    }
  },
  watch: {
    $route () {
      // init $data.
      Object.assign(this.$data, this.$options.data())
      this.$set(this, 'inputKeyword', this.keyword)
      // call for new data.
      this.updatePage()
      // console.log('route_update_watch')
    }
  },
  created () {
    if (!this.$store.state.global.keywordList.length) {
      this.getKeywordList()
    }
    this.$set(this, 'inputKeyword', this.keyword)
    this.keyword && this.updatePage()
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
.input-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 30px;
  form {
    display: flex;
    padding: 0;
    margin: 0;
    height: fit-content;
    width: 100%;
    input {
      width: 100%;
      display: block;
      box-sizing: border-box;
      height: 40px;
      padding: 2px 1px 2px 5px;
      font-size: 20px;
      border: 2px solid @color-theme;
      outline: none;
    }
  }
  .keyword-tag-div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    margin-top: 4px;
    .keyword-tag {
      display: flex;
      align-items: center;
      font-size: 18px;
      color: @color-theme;
      border: 1px solid @color-theme;
      margin-right: 4px;
      cursor: pointer;
      &:hover {
        background-color: @color-anti-theme-sub;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
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
