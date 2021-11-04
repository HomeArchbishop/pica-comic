const state = () => ({
  keywordList: [],
  categoryList: [],
  diversionUrlList: []
})

const mutations = {
  // 更新热门搜索词数组
  updateKeywordList (state, { newKeywordList }) {
    state.keywordList = [...newKeywordList]
  },
  // 更新分类数组
  updateCategoryList (state, { newCategoryList }) {
    state.categoryList = [...newCategoryList]
  },
  // 更新分流ip数组
  updateDiversionUrlList (state, { newDiversionUrlList }) {
    state.diversionUrlList = [...newDiversionUrlList]
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
