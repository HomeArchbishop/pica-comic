<template>
  <div class="search-container" ref="searchContainer">
    <div class="main">
      <div class="input-card">
        <form @submit.prevent="search()">
          <input type="text" placeholder="关键词" v-model="inputKeyword">
        </form>
        <div class="keyword-tag-div">
          <div class="keyword-tag"
            v-for="word in keywordList" :key="word"
            @click.stop="inputKeyword = word; search()">{{ word }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchEmptyView',
  data () {
    return {
      token: localStorage.token,
      inputKeyword: '',
      keywordList: [...this.$store.state.global.keywordList] || [] // 热词列表 string[]
    }
  },
  methods: {
    search: async function () {
      this.$router.push({ path: `/search/${this.inputKeyword}` })
    },
    getKeywordList: async function () {
      const keywordList = await this.$api.keyword(this.token)
      this.$set(this, 'keywordList', [...keywordList])
      console.log(keywordList)
      // update Vuex.
      this.$store.commit('global/updateKeywordList', { newKeywordList: [...keywordList] })
    }
  },
  created () {
    if (!this.$store.state.global.keywordList.length) {
      this.getKeywordList()
    }
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
.input-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 30px;
  form {
    display: flex;
    padding: 0;
    margin: 0;
    height: fit-content;
    width: 100%;
    input {
      width: 100%;
      display: block;
      box-sizing: border-box;
      height: 40px;
      padding: 2px 1px 2px 5px;
      font-size: 20px;
      border: 2px solid @color-theme;
      outline: none;
    }
  }
  .keyword-tag-div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    margin-top: 4px;
    .keyword-tag {
      display: flex;
      align-items: center;
      font-size: 18px;
      color: @color-theme;
      border: 1px solid @color-theme;
      margin-right: 4px;
      cursor: pointer;
      &:hover {
        background-color: @color-anti-theme-sub;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
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
