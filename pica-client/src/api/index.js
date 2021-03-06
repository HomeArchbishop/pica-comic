import axios from 'axios'

import { config as reqConfig, error as reqError } from './middleware/request'
import { response as resResponse, error as resError } from './middleware/response'

const baseUrl = `//localhost:1210/api/`

axios.interceptors.request.use(reqConfig, reqError)
axios.interceptors.response.use(resResponse, resError)

const getDiversionUrlList = async function () {
  const list = (await axios.get(`${baseUrl}diversionurl`)).data || []
  list.forEach((ip, index) => {
    list[index] = `http://${ip}/`
  })
  return list
}

const checkConnect = async function () {
  const connectWord = (await axios.get(`${baseUrl}`)).data
  return connectWord // 'connected' || undefined
}

const authorize = async function (username, password) {
  const token = (await axios.get(`${baseUrl}authorize`, {
    params: {
      username,
      password
    }
  })).data
  return token
}

const checkToken = async function (token) {
  const resString = (await axios.get(`${baseUrl}checkToken`, {
    params: {
      token
    }
  })).data
  return Boolean(resString)
}

const categories = async function (token) {
  const categoryList = (await axios.get(`${baseUrl}categories`, {
    params: {
      token
    }
  })).data
  return categoryList
}

const categoriesSearch = async function (token, categories, page = 1, sort = 'ua') {
  const searchResultInfo = (await axios.get(`${baseUrl}categoriesSearch`, {
    params: {
      token,
      categories,
      page,
      sort
    }
  })).data
  return searchResultInfo
}

const tagSearch = async function (token, tag, page = 1, sort = 'ua') {
  const searchResultInfo = (await axios.get(`${baseUrl}tagSearch`, {
    params: {
      token,
      tag,
      page,
      sort
    }
  })).data
  return searchResultInfo
}

const search = async function (token, keyword, page = 1, sort = 'ua') {
  const searchResultInfo = (await axios.get(`${baseUrl}search`, {
    params: {
      token,
      keyword,
      page,
      sort
    }
  })).data
  return searchResultInfo
}

const keyword = async function (token) {
  const keywordList = (await axios.get(`${baseUrl}keyword`, {
    params: {
      token
    }
  })).data
  return keywordList
}

// the detail info of one comic
const info = async function (token, comicId) {
  const comicDetailObject = (await axios.get(`${baseUrl}info`, {
    params: {
      token,
      comicId
    }
  })).data
  return comicDetailObject
}

const episodes = async function (token, comicId) {
  const episodesList = (await axios.get(`${baseUrl}episodes`, {
    params: {
      token,
      comicId
    }
  })).data
  return episodesList
}

const picture = async function (token, comicId, episodesOrder, page = 1) {
  const pictureObject = (await axios.get(`${baseUrl}picture`, {
    params: {
      token,
      comicId,
      episodesOrder,
      page
    }
  })).data
  return pictureObject
}

const myFavourite = async function (token, page = 1) {
  const myFavouriteListObject = (await axios.get(`${baseUrl}myFavourite`, {
    params: {
      token,
      page
    }
  })).data
  return myFavouriteListObject
}

const like = async function (token, bookId) {
  const likeAction = (await axios.get(`${baseUrl}like`, {
    params: {
      token,
      bookId
    }
  })).data
  return likeAction
}

const favourite = async function (token, bookId) {
  const favouriteAction = (await axios.get(`${baseUrl}favourite`, {
    params: {
      token,
      bookId
    }
  })).data
  return favouriteAction
}

const collections = async function (token) {
  const ShenMoTuiJianList = (await axios.get(`${baseUrl}collections`, {
    params: {
      token
    }
  })).data
  return ShenMoTuiJianList
}

const comments = async function (token, bookId, page) {
  const commentsResults = (await axios.get(`${baseUrl}comments`, {
    params: {
      token,
      bookId,
      page
    }
  })).data
  return commentsResults
}

const myComments = async function (token, page) {
  const commentsResults = (await axios.get(`${baseUrl}mycomments`, {
    params: {
      token,
      page
    }
  })).data
  return commentsResults
}

const personInfo = async function (token) {
  const personInfo = (await axios.get(`${baseUrl}personinfo`, {
    params: {
      token
    }
  })).data
  return personInfo
}

const punch = async function (token) {
  const punchActionRes = (await axios.get(`${baseUrl}punch`, {
    params: {
      token
    }
  })).data
  return punchActionRes
}

const register = async function (registerData) {
  const registerRes = (await axios.post(`${baseUrl}register`, {
    registerData: { ...registerData }
  })).data
  return registerRes
}

const commentLike = async function (token, commentId) {
  const likeAction = (await axios.get(`${baseUrl}commentLike`, {
    params: {
      token,
      commentId
    }
  })).data
  return likeAction
}

const randomComic = async function (token) {
  const comicList = (await axios.get(`${baseUrl}randomComic`, {
    params: {
      token
    }
  })).data
  return comicList
}

const download = async function (token, comicId, episodesOrder) {
  const downloadRes = (await axios.get(`${baseUrl}download`, {
    params: {
      token,
      comicId,
      episodesOrder
    }
  })).data
  return downloadRes
}

const downloadInfo = async function () {
  const downloadInfo = (await axios.get(`${baseUrl}downloadInfo`)).data
  return downloadInfo
}

const downloadZipUrl = async function (comicId, episodesOrder) {
  const downloadZipUrl = `${baseUrl}downloadZip?comicId=${comicId}&episodesOrder=${episodesOrder}`
  return downloadZipUrl
}

const knightRank = async function (token) {
  const knightRank = (await axios.get(`${baseUrl}knightRank`, {
    params: {
      token
    }
  })).data
  return knightRank
}

const recommend = async function (token, comicId) { // ???????????????????????????
  const recommend = (await axios.get(`${baseUrl}recommend`, {
    params: {
      token,
      comicId
    }
  })).data
  return recommend
}

const rank = async function (token, tt = 'H24') {
  const rank = (await axios.get(`${baseUrl}rank`, {
    params: {
      token,
      tt
    }
  })).data
  return rank
}

const gameList = async function (token, page = 1) {
  const gameList = (await axios.get(`${baseUrl}gameList`, {
    params: {
      token,
      page
    }
  })).data
  return gameList
}

const gameInfo = async function (token, gameId) {
  const gameInfo = (await axios.get(`${baseUrl}gameInfo`, {
    params: {
      token,
      gameId
    }
  })).data
  return gameInfo
}

const gameLike = async function (token, gameId) {
  const gameLike = (await axios.get(`${baseUrl}gameLike`, {
    params: {
      token,
      gameId
    }
  })).data
  return gameLike
}

const gameComments = async function (token, gameId, page) {
  const gameCommentsList = (await axios.get(`${baseUrl}gameComments`, {
    params: {
      token,
      gameId,
      page
    }
  })).data
  return gameCommentsList
}

const chatRoomList = async function (token) {
  const chatRoomList = (await axios.get(`${baseUrl}chat`, {
    params: {
      token
    }
  })).data
  return chatRoomList
}

const sendComments = async function (token, comicId, content) {
  const sendState = (await axios.get(`${baseUrl}sendComments`, {
    params: {
      token,
      comicId,
      content
    }
  })).data
  return sendState
}

const childrenComments = async function (token, commentId, page) {
  const comment = (await axios.get(`${baseUrl}childrenComments`, {
    params: {
      token,
      commentId,
      page
    }
  })).data
  return comment
}

const favouriteAuthor = async function (author) {
  const state = (await axios.get(`${baseUrl}favouriteAuthor`, {
    params: {
      author
    }
  })).data
  return state // 'favourite' | 'un_favourite'
}

const favouriteAuthorList = async function () {
  const list = (await axios.get(`${baseUrl}favouriteAuthorList`)).data
  return list
}

const favouriteChinese = async function (author) {
  const state = (await axios.get(`${baseUrl}favouriteChinese`, {
    params: {
      author
    }
  })).data
  return state // 'favourite' | 'un_favourite'
}

const favouriteChineseList = async function () {
  const list = (await axios.get(`${baseUrl}favouriteChineseList`)).data
  return list
}

export {
  checkConnect, authorize, checkToken, categories, categoriesSearch, search,
  keyword, info, episodes, picture, myFavourite, like, favourite, collections,
  comments, personInfo, myComments, punch, register, getDiversionUrlList,
  tagSearch, commentLike, randomComic, download, downloadInfo, downloadZipUrl,
  knightRank, recommend, rank, gameList, gameInfo, gameLike, gameComments,
  chatRoomList, sendComments, childrenComments, favouriteAuthor, favouriteAuthorList,
  favouriteChinese, favouriteChineseList
}
