<template>
  <div class="rank-container">
    <div class="main">
      <div class="display-card">
        <div class="title">
          排行榜
          <small>（双击对应排行榜选项快速刷新）</small>
          <div class="tt-option-div">
            <div class="tt-option" @click.stop="changeTt('H24')" :class="{active: tt === 'H24'}"
              @dblclick.stop="updatePage()">日榜</div>
            <div class="tt-option" @click.stop="changeTt('D7')" :class="{active: tt === 'D7'}"
              @dblclick.stop="updatePage()">周榜</div>
            <div class="tt-option" @click.stop="changeTt('D30')" :class="{active: tt === 'D30'}"
              @dblclick.stop="updatePage()">月榜</div>
          </div>
        </div>
        <div class="list-area">
          <ItemLarge v-for="item in rankList" :key="item._id" :item="item"
            :link="{ name: 'ComicDetailView', params: {id: item._id} }"/>
          <div class="tip-note" v-if="isSearching">正在加载，请等待</div>
        </div>
        <div class="more-btn-area" v-if="rankList.length && !isSearching">
          <div class="more-btn" @click="updatePage()">刷新</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RankView',
  data () {
    return {
      token: localStorage.token,
      H24List: [],
      D7List: [],
      D30List: [],
      tt: 'H24', // H24 D7 D30
      isSearching: false
    }
  },
  computed: {
    rankList () {
      return this[`${this.tt}List`]
    }
  },
  methods: {
    updatePage: async function () {
      this.$set(this, `${this.tt}List`, [])
      // change state.
      this.$set(this, 'isSearching', true)
      // call api to search.
      const rankList = await this.$api.rank(this.token, this.tt)
      console.log(rankList)
      this.$set(this, `${this.tt}List`, [ ...rankList ])
      // change state.
      this.$set(this, 'isSearching', false)
    },
    changeTt: async function (tt = 'H24') {
      this.$set(this, 'tt', tt)
    }
  },
  watch: {
    tt: async function () {
      if (!this[`${this.tt}List`].length) {
        await this.updatePage()
      }
    }
  },
  created: async function () {
    await this.updatePage()
  }
}
</script>

<style lang="less" scoped>
@import '../assets/less/color';
.rank-container {
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
    small {
      display: flex;
      align-items: flex-end;
      color: @color-anti-theme-sub;
      font-size: 16px;
    }
    .tt-option-div {
      display: flex;
      flex: 1;
      align-items: flex-end;
      justify-content: flex-end;
      user-select: none;
      .tt-option {
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
