<template>
  <div class="favourite-container">
    <div class="main">
      <div class="display-card">
        <span class="title">我的收藏</span>
        <div class="list-area" v-if="isFoundAny">
          <ItemLarge v-for="item in myFavouriteList" :key="item._id" :item="item" :link="`../comicdetail/${item._id}`"/>
          <div class="tip-note" v-if="isUpdating">正在加载，请等待</div>
        </div>
        <div class="empty-area" v-else>
          <div class="empty-tips">暂无收藏</div>
        </div>
        <div class="more-btn-area" v-if="myFavouriteList.length && !isAll && !isUpdating">
          <div class="more-btn" @click="updateNewPage()">加载更多</div>
        </div>
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
    updateNewPage: async function () {
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
    this.updateNewPage()
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
  }
  .list-area,
  .empty-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding-top: 10px;
    border-top: 1px solid @color-theme;
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
