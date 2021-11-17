<template>
  <div class="search-container" ref="searchContainer">
    <div class="main">
      <div class="display-card">
        <div class="title">随机</div>
        <div class="list-area">
          <ItemLarge v-for="item in searchResultList" :key="item._id" :item="item"
            :link="{ name: 'ComicDetailView', params: {id: item._id} }"/>
        </div>
        <LoadingRow v-if="isSearching"/>
        <TipRowBtn v-if="searchResultList.length && !isSearching" @click.native="updatePage()">刷新</TipRowBtn>
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
    border-top: 1px solid @color-theme;
  }
  .list-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
}
</style>
