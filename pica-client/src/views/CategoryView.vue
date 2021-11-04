<template>
  <div class="category-container">
    <div class="main">
      <div class="display-card">
        <div class="title">小程序</div>
        <div class="program-area">
          <ItemSmall v-for="item in categoryList" :key="item._id" :item="item" v-show="item.isWeb"
            :link="`/link/${$util.transferOutURL(item.link)}`"/>
        </div>
      </div>
      <div class="display-card">
        <div class="title">分类</div>
        <div class="list-area">
          <ItemSmall v-for="item in categoryList" :key="item._id" :item="item" v-show="!item.isWeb"
            :link="`/category/${item.title}`"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryView',
  data () {
    return {
      token: localStorage.token,
      categoryList: this.$store.state.global.categoryList || []
    }
  },
  methods: {
    getCategoryList: async function () {
      const categoryList = await this.$api.categories(this.token)
      this.$set(this, 'categoryList', categoryList)
      console.log(this.categoryList)
      console.log('aaa', await this.$api.categoriesSearch(this.token, '妹妹系', 1, 'ua'))
      // change vuex.
      this.$store.commit('global/updateCategoryList', { newCategoryList: categoryList })
    }
  },
  created: async function () {
    if (!this.$store.state.global.categoryList.length) {
      this.getCategoryList()
    }
  }
}
</script>

<style lang="less" scoped>
@import '../assets/less/color';
.category-container {
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
  &:last-child {
    margin-bottom: 20px;
  }
  .title {
    font-weight: 800;
    font-size: 25px;
  }
  .program-area,
  .list-area {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    width: 100%;
    min-height: 50px;
    padding-top: 10px;
    border-top: 1px solid black;
  }
}
</style>
