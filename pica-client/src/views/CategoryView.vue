<template>
  <div class="category-container">
    <div class="main">
      <div class="display-card">
        <div class="title">小程序</div>
        <div class="program-area" v-if="!appList.length && !webList.length">
          <LoadingItemSmall v-for="i in 12" :key="i"/>
        </div>
        <div class="program-area">
          <ItemSmall v-for="item in webList" :key="item._id + item.title" :item="item"
            :link="{ name: 'LinkView', params: {link: item.link} }"/>
          <ItemSmall v-for="item in appList" :key="item._id + item.title" :item="item"
            :link="`/${item.path}`"/>
        </div>
      </div>
      <div class="display-card">
        <div class="title">分类</div>
        <div class="program-area" v-if="!cateList.length">
          <LoadingItemSmall v-for="i in 12" :key="i"/>
        </div>
        <div class="list-area">
          <ItemSmall v-for="item in cateList" :key="item._id + item.title" :item="item"
            :link="`/category/${item.title}`"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingItemSmall from '@/components/LoadingItemSmall'
export default {
  name: 'CategoryView',
  components: {
    LoadingItemSmall
  },
  data () {
    return {
      token: localStorage.token,
      categoryList: this.$store.state.global.categoryList || [], // contain web & app & cate.
      appList: [],
      webList: [],
      cateList: []
    }
  },
  methods: {
    getCategoryList: async function () {
      const categoryList = await this.$api.categories(this.token)
      this.$set(this, 'categoryList', categoryList)
      console.log(this.categoryList)
      // set values in each data.
      this.categoryList.forEach(item => {
        if (item.isWeb) {
          this.webList.push(item)
          return
        }
        if (item.isApp) {
          this.appList.push(item)
          return
        }
        this.cateList.push(item)
      })
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
  min-height: 300px;
  margin-top: 20px;
  &:last-child {
    margin-bottom: 20px;
  }
  .title {
    font-weight: 800;
    font-size: 25px;
    border-bottom: 1px solid @color-theme;
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
  }
}
</style>
