<template>
  <div class="game-container">
    <div class="main">
      <div class="display-card">
        <span class="title">游戏区</span>
        <div class="list-area" v-if="gameList.length">
          <GameSmall v-for="item in gameList" :key="item._id" :link="{ name: 'GameDetailView', params: {id: item._id} }" :item="item"/>
        </div>
        <div class="tip-note" v-if="isSearching">正在加载，请等待</div>
        <div class="more-btn-area" v-if="gameList.length && !isAll && !isSearching">
          <div class="more-btn" @click="updatePage()">加载更多</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GameSmall from '../components/GameSmall'
export default {
  name: 'GameView',
  components: {
    GameSmall
  },
  data () {
    return {
      token: localStorage.token,
      gameList: [],
      currentPage: 1,
      isAll: false,
      isSearching: true
    }
  },
  methods: {
    updatePage: async function () {
      // change state.
      this.$set(this, 'isSearching', true)
      // call api.
      const gameListObject = await this.$api.gameList(this.token, this.currentPage)
      console.log(gameListObject)
      this.gameList.push(...gameListObject.docs)
      // update isAll and currentPage.
      this.$set(this, 'isAll', +gameListObject.pages === +gameListObject.page)
      this.$set(this, 'currentPage', this.currentPage + !this.isAll)
      // change state.
      this.$set(this, 'isSearching', false)
    }
  },
  created: async function () {
    this.updatePage()
  }
}
</script>

<style lang="less" scoped>
@import '../assets/less/color';
.game-container {
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
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 100%;
    min-height: 220px;
    padding-top: 10px;
    border-top: 1px solid black;
  }
  .tip-note {
    display: flex;
    flex: 1;
    justify-content: center;
    padding-top: 10px;
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
