import { sendGet, sendPost, sendPut } from './util/request'

/**
 * sorts
 * @type ua: 默认
 * @type dd: 新到旧
 * @type da: 旧到新
 * @type ld: 最多爱心
 * @type vd: 最多指名
 */

const diversionUrl = process.env.NODE_ENV === 'development' // && process.env.ELECTRON
  ? '/apiProxy/'
  : 'https://picaapi.picacomic.com/' // JSON.parse(localStorage.diversionUrlList || '[]')[+localStorage.diversionIndex || 0] ||

async function getDiversionUrlList () {
  const requestUrl = process.env.NODE_ENV === 'development' ? '/diversionUrlProxy/' : 'http://68.183.234.72/'
  const list = (await sendGet(requestUrl, 'init')).addresses || []
  console.log(list)
  list.forEach((ip, index) => {
    list[index] = `http://${ip}/`
  })
  return list
}

// 验证token
async function checkToken (token) {
  const respData = await sendGet(diversionUrl, 'keywords', token, [401])
  return respData.message !== 'unauthorized'
}

// 登录并返回token
async function authorize (username, password) {
  const url = `auth/sign-in`
  const body = { 'email': username, 'password': password }
  const respData = await sendPost(diversionUrl, url, body, null)
  return respData.data.token
}

// 返回分类页目录
async function categories (token) {
  const respData = await sendGet(diversionUrl, 'categories', token)
  return respData.data.categories
}

// 根据分类（cate）和标签返回漫画列表
async function comics (token, page = 1,
  title = '嗶咔漢化', tag = 'jk', sort = 'ua') {
  const titleEscaped = escape(title)
  const tagEscaped = escape(tag)
  const url = `comics?page=${page}&c=${titleEscaped}&t=${tagEscaped}&s=${sort}`
  const respData = await sendGet(diversionUrl, url, token)
  return respData.data.comics
}

// 返回某一本漫画详细信息
async function info (token, comicId) {
  const url = `comics/${comicId}`
  const respData = await sendGet(diversionUrl, url, token)
  return respData.data.comic
}

// 返回某一本漫画的分化话
async function episodes (token, comicId, page = 1) {
  const url = `comics/${comicId}/eps?page=${page}`
  const respData = await sendGet(diversionUrl, url, token)
  return respData.data.eps
}

// 返回漫画本体（某一话的某一分页面所有图片）
async function picture (token, bookId, epsOrder, page = 1) {
  const url = `comics/${bookId}/order/${epsOrder}/pages?page=${page}`
  const respData = await sendGet(diversionUrl, url, token)
  return respData.data
}

// 返回「看了這本子的人也在看」数组
async function recommend (token, bookId) {
  const url = `comics/${bookId}/recommendation`
  const respData = await sendGet(diversionUrl, url, token)
  return respData.data.comics
}

// 返回「大家都在搜」关键词数组
async function keyword (token) {
  const url = `keywords`
  const respData = await sendGet(diversionUrl, url, token)
  return respData.data.keywords
}

// 分类搜索
async function categoriesSearch (token, categories, page = 1, sort = 'ua') {
  const url = `comics?page=${page}&c=${encodeURI(categories)}&s=${sort}`
  const respData = await sendGet(diversionUrl, url, token)
  return respData.data.comics
}

// 标签搜索
async function tagSearch (token, tag, page = 1, sort = 'ua') {
  const url = `comics?page=${page}&t=${encodeURI(tag)}&s=${sort}`
  const respData = await sendGet(diversionUrl, url, token)
  return respData.data.comics
}

// 搜索
async function search (token, keyword, page = 1, sort = 'ua') {
  const url = `comics/advanced-search?page=${page}`
  const body = {
    categories: [],
    keyword: keyword,
    sort: sort
  }
  const respData = await sendPost(diversionUrl, url, body, token)
  return respData.data.comics
}

// toggle like or unlike 标记(不)喜欢此漫画
async function like (token, bookId) {
  const url = `comics/${bookId}/like`
  const body = { bookId }
  const respData = await sendPost(diversionUrl, url, body, token)
  return respData.data.action
}

// 返回某一本漫画的评论
async function comments (token, bookId, page = 1) {
  const url = `comics/${bookId}/comments?page=${page}`
  const respData = await sendGet(diversionUrl, url, token)
  return respData.data
}

// toggle favourite 标记(不)收藏此漫画
// type favouriteAction = 'favourite' | 'un_favourite'
async function favourite (token, bookId) {
  const url = `comics/${bookId}/favourite`
  const body = { bookId }
  const respData = await sendPost(diversionUrl, url, body, token)
  return respData.data.action
}

// 返回 person Info 个人信息
async function personInfo (token) {
  const url = `users/profile`
  const respData = await sendGet(diversionUrl, url, token)
  return respData.data.user
}

// 返回 favourite 已收藏漫画
async function myFavourite (token, page = 1) {
  const url = `users/favourite?s=ua&page=${page}`
  const respData = await sendGet(diversionUrl, url, token)
  return respData.data.comics
}

// 返回 我发表的评论
async function myComments (token, page = 1) {
  const url = `users/my-comments?page=${page}`
  const json = await sendGet(diversionUrl, url, token)
  return json.data.comments
}

// 返回神魔推荐
async function collections (token) {
  const url = `collections`
  const json = await sendGet(diversionUrl, url, token)
  return json.data.collections
}

// 签到
async function punch (token) {
  const url = `users/punch-in`
  const body = { token }
  const json = await sendPost(diversionUrl, url, body, token)
  return json.data.res
  // { status: 'ok', punchInLastDay: '2021-10-17' }
}

// 获取随机本子
async function randomComic (token) {
  const url = `comics/random`
  const json = await sendGet(diversionUrl, url, token)
  return json.data.comics
}

// 获取小程序列表
async function appList (token) {
  const url = `pica-apps`
  const json = await sendGet(diversionUrl, url, token)
  return json.data.apps
}

// 获取game列表
async function gameList (token, page = 1) {
  const url = `games?page=${page}`
  const json = await sendGet(diversionUrl, url, token)
  return json.data.games
}

// 获取某个game详情
async function gameInfo (token, gameId) {
  const url = `games/${gameId}`
  const json = await sendGet(diversionUrl, url, token)
  return json.data.game
}

// 获取某个game评论
async function gameComments (token, gameId, page = 1) {
  const url = `games/${gameId}/comments?page=${page}`
  const json = await sendGet(diversionUrl, url, token)
  return json.data
}

// 爱心某个game
async function gameLike (token, gameId) {
  const url = `games/${gameId}/like`
  const body = { gameId }
  const json = await sendPost(diversionUrl, url, body, token)
  return json.data.action
}

// 聊天频道
async function chatRoomList (token) {
  const url = `chat`
  const json = await sendGet(diversionUrl, url, token)
  return json.data.chatList
}

// 发送评论
async function sendComments (token, bookId, content = '') {
  const url = `comics/${bookId}/comments`
  const body = { content }
  const json = await sendPost(diversionUrl, url, body, token)
  return json.message
  // json { code: 200, message:'success' | string, error? }
}

// 排行榜
// tt: 'H24' | 'D7' | 'D30'
async function rank (token, tt) {
  const url = `comics/leaderboard?tt=${tt}&ct=VC`
  const json = await sendGet(diversionUrl, url, token)
  return json.data.comics
}

// 骑士榜
async function knightRank (token) {
  const url = `comics/knight-leaderboard`
  const json = await sendGet(diversionUrl, url, token)
  return json.data.users
}

// 设置头衔
async function setTitle (token, userId, title) {
  const url = `users/${userId}/title`
  const body = { title }
  const json = await sendPut(diversionUrl, url, body, token)
  return json
}

// 注册
async function register (registerData) {
  // data = {
  //    "email": email,
  //    "password": password,
  //    "name": name,
  //    "birthday": birthday,
  //    "gender": gender,  // m, f, bot
  //    "answer1": answer1,
  //    "answer2": answer2,
  //    "answer3": answer3,
  //    "question1": question1,
  //    "question2": question2,
  //    "question3": question3
  // }
  const url = `auth/register`
  const body = { ...registerData }
  const json = await sendPost(diversionUrl, url, body, null)
  return json.data
}

// 评论点赞
async function commentLike (token, commentId) {
  const url = `comments/${commentId}/like`
  const json = await sendPost(diversionUrl, url, null, token)
  return json.data.action
}

// 获得子评论
async function childrenComments (token, commentId, page = 1) {
  const url = `comments/${commentId}/childrens?page=${page}`
  const json = await sendGet(diversionUrl, url, token)
  return json.data.comments
}

export {
  getDiversionUrlList, checkToken, authorize, categories, comics, info, episodes, picture,
  recommend, keyword, categoriesSearch, tagSearch, search, like, comments, favourite,
  personInfo, myFavourite, myComments, collections, punch, randomComic, appList,
  gameList, gameInfo, gameComments, gameLike, chatRoomList, sendComments, rank, knightRank,
  setTitle, register, commentLike, childrenComments
}
