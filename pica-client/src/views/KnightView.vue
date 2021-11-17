<template>
  <div class="search-container" ref="searchContainer">
    <div class="main">
      <div class="display-card">
        <div class="title">骑士榜</div>
        <div class="top-list-area" v-if="!isSearching && rankList[0]">
          <div class="top-item-div" v-for="className in ['second', 'first', 'third']"
            :key="className" :class="className">
            <div class="img-div">
              <img :src="avatarSrc(topReference[className].avatar)" alt="">
            </div>
            <div class="info-div">
              <div class="name">{{ topReference[className].name }}</div>
              <div class="comic-count">贡献数：{{ topReference[className].comicsUploaded }}</div>
            </div>
          </div>
        </div>
        <div class="rest-list-area" v-if="!isSearching && rankList[0]">
          <div class="table-head">
            <div class="rank-num">排名</div>
            <div class="name">用户名</div>
            <div class="comic-count">贡献数/本</div>
          </div>
          <div class="row" v-for="item in rankList" :key="item._id">
            <div class="rank-num">{{ rankList.indexOf(item) + 1 }}</div>
            <div class="name">{{ item.name }}</div>
            <div class="comic-count">{{ item.comicsUploaded }}</div>
          </div>
        </div>
        <LoadingRow v-if="isSearching"/>
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
      rankList: [],
      isSearching: true
    }
  },
  computed: {
    topReference () {
      return {
        first: this.rankList[0],
        second: this.rankList[1],
        third: this.rankList[2]
      }
    }
  },
  methods: {
    getRank: async function () {
      // change state.
      this.$set(this, 'isSearching', true)
      // call api to search.
      const rankList = await this.$api.knightRank(this.token)
      this.$set(this, 'rankList', [ ...rankList ])
      console.log([...rankList])
      // change state.
      this.$set(this, 'isSearching', false)
    },
    avatarSrc (avatarObject) {
      return this.$util.formatImgUrl(avatarObject.fileServer, avatarObject.path)
    }
  },
  created () {
    this.getRank()
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
    border-bottom: 1px solid @color-theme;
  }
  .top-list-area {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    margin-top: 20px;
    .top-item-div {
      display: flex;
      flex-direction: column;
      .img-div {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 6px solid;
        border-radius: 76px;
        width: 152px;
        height: 152px;
        img {
          min-height: 140px;
          min-width: 140px;
          max-height: 140px;
          max-width: 140px;
          border-radius: 70px;
        }
      }
      .info-div {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 6px;
        font-size: 18px;
        .comic-count {
          color: @color-theme-sub;
        }
      }
      &.first {
        .img-div {
          border-color: gold !important;
        }
      }
      &.second {
        margin-top: 30px;
        .img-div {
          border-color: silver !important;
        }
      }
      &.third {
        margin-top: 50px;
        .img-div {
          border-color: coral !important;
        }
      }
    }
  }
  .rest-list-area {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-top: 10px;
    .table-head {
      display: flex;
      flex-direction: row;
      font-weight: 800;
      .rank-num {
        display: flex;
        justify-content: center;
        width: 3em;
        border-right: 1px solid @color-theme-sub;
      }
      .name {
        padding-left: 1em;
      }
      .comic-count {
        display: flex;
        flex: 1;
        justify-content: flex-end;
        color: @color-theme-sub;
      }
    }
    .row {
      display: flex;
      flex-direction: row;
      border-top: 1px solid @color-theme-sub;
      height: 26px;
      .rank-num {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 3em;
        border-right: 1px solid @color-theme-sub;
      }
      .name {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: 1em;
      }
      .comic-count {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex: 1;
        color: @color-theme-sub;
      }
    }
  }
}
</style>
