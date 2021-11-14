<template>
  <div class="home-container">
    <div class="main">
      <div class="display-card">
        <span class="title">神推荐</span>
        <div class="list-area">
          <div class="tip-note" v-if="isRequesting">正在加载，请等待</div>
          <ItemSmall v-for="item in shenTuiJianList" :item="item" :key="item._id" :link="`../comicdetail/${item._id}`"/>
        </div>
      </div>
      <div class="display-card">
        <span class="title">魔推荐</span>
        <div class="list-area">
          <div class="tip-note" v-if="isRequesting">正在加载，请等待</div>
          <ItemSmall v-for="item in moTuiJianList" :item="item" :key="item._id" :link="`../comicdetail/${item._id}`"/>
        </div>
      </div>
      <div class="tips" v-if="shenTuiJianList.concat(moTuiJianList).length !== 8 && !isRequesting">※个别推荐不满四个，这是哔咔官方算法问题，与客户端无关</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data () {
    return {
      token: localStorage.token,
      isRequesting: false,
      shenTuiJianList: [],
      moTuiJianList: [],
      lastUpdateDate: 0 // means long time ago.
    }
  },
  methods: {
    getList: async function () {
      // change state.
      this.$set(this, 'isRequesting', true)
      // call api.
      const shenMoTuiJianList = await this.$api.collections(this.token)
      shenMoTuiJianList.forEach(element => {
        if (element.title === '本子神推薦') {
          this.$set(this, 'shenTuiJianList', element.comics)
        } else if (element.title === '本子魔推薦') {
          this.$set(this, 'moTuiJianList', element.comics)
        }
      })
      // change state.
      this.$set(this, 'isRequesting', false)
      // change date
      this.$set(this, 'lastUpdateDate', new Date().getDate())
    }
  },
  activated () {
    if (new Date().getDate() - this.lastUpdateDate) {
      this.getList()
    }
  }
}
</script>

<style lang="less" scoped>
@import '../assets/less/color';
@import '../assets/less/var';
.home-container {
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
  margin-bottom: 20px;
  .tips {
    font-size: 18px;
    margin-top: 10px;
  }
}
.display-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 288px;
  margin-top: 20px;
  // box-shadow: 0px 0 3px 0 @color-anti-theme-sub inset;
  // border-radius: @card-radius-default;
  padding: 20px;
  .title {
    font-weight: 800;
    font-size: 25px;
    border-bottom: 1px solid black;
  }
  .list-area {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    width: 100%;
    min-height: 50px;
    margin-top: 0;
    .tip-note {
      padding-top: 10px;
      cursor: pointer;
    }
  }
}
</style>
