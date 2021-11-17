<template>
  <div class="favourite-container">
    <div class="main">
      <div class="display-card">
        <span class="title">我的收藏</span>
        <div class="list-area" v-if="isFoundAny">
          <ItemLarge v-for="item in myFavouriteList" :key="item._id" :item="item" :link="{ name: 'ComicDetailView', params: {id: item._id} }"/>
        </div>
        <LoadingRow v-if="myFavouriteList.length && isUpdating"/>
        <TipRow v-if="!myFavouriteList.length && isAll">什么都没有</TipRow>
        <TipRowBtn v-if="myFavouriteList.length && !isAll && !isUpdating" @click.native="updatePage()">加载更多</TipRowBtn>
        <TipRow v-if="myFavouriteList.length && isAll">没有更多了</TipRow>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FavouriteView',
  data () {
    return {
      token: localStorage.token,
      myFavouriteList: [],
      currentPage: 1,
      isUpdating: false,
      isAll: false,
      isFoundAny: true
    }
  },
  methods: {
    updatePage: async function () {
      // change states.
      this.$set(this, 'isUpdating', true)
      // call api to update.
      const myFavouriteListObject = await this.$api.myFavourite(this.token, this.currentPage)
      this.myFavouriteList.push(...myFavouriteListObject.docs)
      if (myFavouriteListObject.page === myFavouriteListObject.pages) {
        this.$set(this, 'isAll', true)
      } else {
        this.$set(this, 'currentPage', this.currentPage + 1)
      }
      if (!myFavouriteListObject.pages) {
        this.$set(this, 'isFounAny', false)
      }
      // change states.
      this.$set(this, 'isUpdating', false)
    }
  },
  created () {
    this.updatePage()
  }
}
</script>

<style lang="less" scoped>
@import '../assets/less/color';
.favourite-container {
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
  .list-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
}
</style>
