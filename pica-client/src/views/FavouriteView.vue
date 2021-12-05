<template>
  <div class="favourite-container">
    <div class="main">
      <div class="display-card">
        <div class="title">
          我的收藏
          <div class="option-div">
            <div class="option" @click.stop="changeType('comic')" :class="{active: currentType === 'comic'}">漫画</div>
            <div class="option" @click.stop="changeType('author')" :class="{active: currentType === 'author'}">作者</div>
            <div class="option" @click.stop="changeType('chinese')" :class="{active: currentType === 'chinese'}">汉化组</div>
          </div>
        </div>
        <!-- FOR TYPE COMIC start -->
        <div class="list-area" v-if="isFoundAny && currentType === 'comic'">
          <ItemLarge v-for="item in myFavouriteList" :key="item._id" :item="item" :link="{ name: 'ComicDetailView', params: {id: item._id} }"/>
        </div>
        <LoadingRow v-if="myFavouriteList.length && isUpdating && currentType === 'comic'"/>
        <TipRow v-if="!myFavouriteList.length && isAll && currentType === 'comic'">什么都没有</TipRow>
        <TipRowBtn v-if="myFavouriteList.length && !isAll && !isUpdating && currentType === 'comic'"
          @click.native="updatePageComic()">加载更多</TipRowBtn>
        <TipRow v-if="myFavouriteList.length && isAll && currentType === 'comic'">没有更多了</TipRow>
        <!-- FOR TYPE COMIC end -->
        <!-- FOR TYPE AUTHOR | CHINESE start -->
        <div class="name-card-area" v-if="isFoundAny && currentType !== 'comic' && (typeof myFavouriteList[0]) !== 'object'">
          <router-link v-for="word in myFavouriteList" :key="word" tag="div" class="name-card"
            :to="{ name: 'SearchView', params: {kw: word} }">{{ word }}</router-link>
        </div>
        <TipRow v-if="!myFavouriteList.length && currentType !== 'comic'">什么都没有</TipRow>
        <!-- FOR TYPE AUTHOR | CHINESE end -->
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
      favouriteComicList: [],
      favouriteAuthorList: [],
      favouriteChineseList: [],
      currentType: 'comic', // ? 'comic' | 'author' | 'chinese'
      currentPage: 1, // for 'comic' type
      isUpdating: false, // for 'comic' type
      isAll: false, // for 'comic' type
      isFoundAny: true // for 'comic' type
    }
  },
  methods: {
    updatePageComic: async function () { // for 'comic' type.
      // change states.
      this.$set(this, 'isUpdating', true)
      // call api to update.
      const myFavouriteListObject = await this.$api.myFavourite(this.token, this.currentPage)
      this.favouriteComicList.push(...myFavouriteListObject.docs)
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
    },
    changeType: async function (type) {
      this.$set(this, 'currentType', type)
    },
    getFavouriteAuthorList: async function () {
      const list = await this.$api.favouriteAuthorList()
      this.$set(this, 'favouriteAuthorList', list)
    },
    getFavouriteChineseList: async function () {
      const list = await this.$api.favouriteChineseList()
      this.$set(this, 'favouriteChineseList', list)
    }
  },
  watch: {
    currentType: {
      immediate: true,
      handler: async function () {
        // get list
        if (!{
          'comic': this.favouriteComicList,
          'author': this.favouriteAuthorList,
          'chinese': this.favouriteChineseList
        }[this.currentType].length) {
          await ({
            'comic': this.updatePageComic,
            'author': this.getFavouriteAuthorList,
            'chinese': this.getFavouriteChineseList
          }[this.currentType])()
        }
        // copy into target.
        this.$set(this, 'myFavouriteList', {
          'comic': this.favouriteComicList,
          'author': this.favouriteAuthorList,
          'chinese': this.favouriteChineseList
        }[this.currentType])
      }
    }
  },
  created () {
    // this.updatePageComic()
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
    display: flex;
    font-weight: 800;
    font-size: 25px;
    border-bottom: 1px solid @color-theme;
    .option-div {
      display: flex;
      flex: 1;
      align-items: flex-end;
      justify-content: flex-end;
      user-select: none;
      .option {
        font-size: 20px;
        color: @color-anti-theme-sub;
        cursor: pointer;
        &.active {
          color: @color-theme;
        }
        &:not(:first-child)::before {
          content: '|';
          color: @color-theme-sub
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
  .name-card-area {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 100%;
    .name-card {
      display: flex;
      font-size: 20px;
      cursor: pointer;
      border: 1px solid @color-theme;
      margin-top: 10px;
      margin-right: 10px;
      padding: 2px;
    }
  }
}
</style>
