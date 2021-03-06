import * as P from './type/pica'

import { sendGet, sendPost, sendPut } from './request'

/**
 * @type ua: 默认
 * @type dd: 新到旧
 * @type da: 旧到新
 * @type ld: 最多爱心
 * @type vd: 最多指名
 */
type sorts = 'ua' | 'dd' | 'da' | 'ld' | 'vd'

// android 信息
async function androidInfo (diversionUrl: string, token: string): Promise<string> {
  const url = `init?platform=android`
  const respData = await sendGet(diversionUrl, url, token)
  return respData.data
}

// 验证token
async function checkToken (diversionUrl: string, token: string): Promise<any> {
  const respData = await sendGet(diversionUrl, 'keywords', token, [401])
  return respData.code !== 401
}

// 登录并返回token
async function authorize (diversionUrl: string, username: string, password: string): Promise<string | any> {
  const url = `auth/sign-in`
  const body = { 'email': username, 'password': password }
  const respData = await sendPost(diversionUrl, url, body, null)
  return respData.data.token
}

// 返回分类页目录
async function categories (diversionUrl: string, token: string): Promise<P.Category[]> {
  const respData = await sendGet(diversionUrl, 'categories', token)
  return respData.data.categories
}

// 根据分类（cate）和标签返回漫画列表
async function comics (diversionUrl: string, token: string, page: number = 1,
  title: string = '嗶咔漢化', tag: string = 'jk', sort: sorts = 'ua'): Promise<P.ComicList> {
  const titleEscaped = escape(title)
  const tagEscaped = escape(tag)
  const url = `comics?page=${page}&c=${titleEscaped}&t=${tagEscaped}&s=${sort}`
  const respData = await sendGet(diversionUrl, url, token)
  return respData.data.comics
}

// 返回某一本漫画详细信息
async function info (diversionUrl: string, token: string, bookId: string): Promise<P.ComicDetail> {
  const url = `comics/${bookId}`
  const respData = await sendGet(diversionUrl, url, token)
  return respData.data.comic
}

// 返回某一本漫画的分化话
async function episodes (diversionUrl: string, token: string, bookId: string, page: number = 1): Promise<P.Eps> {
  const url = `comics/${bookId}/eps?page=${page}`
  const respData = await sendGet(diversionUrl, url, token)
  return respData.data.eps
}

// 返回漫画本体（某一话的某一分页面所有图片）
async function picture (diversionUrl: string, token: string, bookId: string, epsOrder: string, page: number = 1): Promise<P.Pictures> {
  const url = `comics/${bookId}/order/${epsOrder}/pages?page=${page}`
  const respData = await sendGet(diversionUrl, url, token)
  return respData.data
}

// 返回「看了這本子的人也在看」数组
async function recommend (diversionUrl: string, token: string, bookId: string): Promise<P.ComicDetail[]> {
  const url = `comics/${bookId}/recommendation`
  const respData = await sendGet(diversionUrl, url, token)
  return respData.data.comics
}

// 返回「大家都在搜」关键词数组
async function keyword (diversionUrl: string, token: string): Promise<string[]> {
  const url = `keywords`
  const respData = await sendGet(diversionUrl, url, token)
  return respData.data.keywords
}

// 分类搜索
async function categoriesSearch (diversionUrl: string, token: string, categories: string, page: number = 1, sort: sorts = 'ua'): Promise<P.ComicList> {
  const url = `comics?page=${page}&c=${encodeURI(categories)}&s=${sort}`
  const respData = await sendGet(diversionUrl, url, token)
  return respData.data.comics
}

// 标签搜索
async function tagSearch (diversionUrl: string, token: string, tag: string, page: number = 1, sort: sorts = 'ua'): Promise<P.ComicList> {
  const url = `comics?page=${page}&t=${encodeURI(tag)}&s=${sort}`
  const respData = await sendGet(diversionUrl, url, token)
  return respData.data.comics
}

// 搜索
async function search (diversionUrl: string, token: string, keyword: string, page: number = 1, sort: sorts = 'ua'): Promise<P.ComicList> {
  const url = `comics/advanced-search?page=${page}`
  const body = {
    "categories": [],
    "keyword": keyword,
    "sort": sort
  }
  const respData = await sendPost(diversionUrl, url, body, token)
  return respData.data.comics
}

// toggle like or unlike 标记(不)喜欢此漫画
async function like (diversionUrl: string, token: string, bookId: string): Promise<P.likeAction> {
  const url = `comics/${bookId}/like`
  const body = { bookId }
  const respData = await sendPost(diversionUrl, url, body, token)
  return respData.data.action
}

// 返回某一本漫画的评论
async function comments (diversionUrl: string, token: string, bookId: string, page: number = 1): Promise<P.CommentList> {
  const url = `comics/${bookId}/comments?page=${page}`
  const respData = await sendGet(diversionUrl, url, token)
  return respData.data
}

// toggle favourite 标记(不)收藏此漫画
type favouriteAction = 'favourite' | 'un_favourite'
async function favourite (diversionUrl: string, token: string, bookId: string): Promise<favouriteAction> {
  const url = `comics/${bookId}/favourite`
  const body = { bookId }
  const respData = await sendPost(diversionUrl, url, body, token)
  return respData.data.action
}

// 返回 person Info 个人信息
async function personInfo (diversionUrl: string, token: string): Promise<P.Creator> {
  const url = `users/profile`
  const respData = await sendGet(diversionUrl, url, token)
  return respData.data.user
}

// 返回 favourite 已收藏漫画
async function myFavourite (diversionUrl: string, token: string, page: number = 1): Promise<P.ComicList> {
  const url = `users/favourite?s=ua&page=${page}`
  const respData = await sendGet(diversionUrl, url, token)
  return respData.data.comics
}

// 返回 我发表的评论
async function myComments (diversionUrl: string, token: string, page: number = 1): Promise<P.CommentList['comments']> {
  const url = `users/my-comments?page=${page}`
  const json = await sendGet(diversionUrl, url, token)
  return json.data?.comments || json
}

// 返回神魔推荐
async function collections (diversionUrl: string, token: string): Promise<P.ShenMoTuiJianItem[]> {
  const url = `collections`
  const json = await sendGet(diversionUrl, url, token)
  return json.data?.collections || json
}

// 签到
async function punch (diversionUrl: string, token: string): Promise<P.PunchAction> {
  const url = `users/punch-in`
  const body = { token }
  const json = await sendPost(diversionUrl, url, body, token)
  return json.data?.res || json
  // { status: 'ok', punchInLastDay: '2021-10-17' }
}

// 获取随机本子
async function randomComic (diversionUrl: string, token: string): Promise<P.Comic[]> {
  const url = `comics/random`
  const json = await sendGet(diversionUrl, url, token)
  return json.data?.comics || json
}

// 获取小程序列表
async function appList (diversionUrl: string, token: string): Promise<P.App[]> {
  const url = `pica-apps`
  const json = await sendGet(diversionUrl, url, token)
  return json.data?.apps || json
}

// 获取game列表
async function gameList (diversionUrl: string, token: string, page: number = 1): Promise<P.GameList> {
  const url = `games?page=${page}`
  const json = await sendGet(diversionUrl, url, token)
  return json.data?.games || json
}

// 获取某个game详情
async function gameInfo (diversionUrl: string, token: string, gameId: string): Promise<P.GameDetail> {
  const url = `games/${gameId}`
  const json = await sendGet(diversionUrl, url, token)
  return json.data?.game || json
}

// 获取某个game评论
async function gameComments (diversionUrl: string, token: string, gameId: string, page: number = 1): Promise<null> {
  const url = `games/${gameId}/comments?page=${page}`
  const json = await sendGet(diversionUrl, url, token)
  return json.data || json
}

// 爱心某个game
async function gameLike (diversionUrl: string, token: string, gameId: string): Promise<P.likeAction> {
  const url = `games/${gameId}/like`
  const body = { gameId }
  const json = await sendPost(diversionUrl, url, body, token)
  return json.data?.action || json
}

// 聊天频道
async function chat (diversionUrl: string, token: string): Promise<P.ChatRoom[]> {
  const url = `chat`
  const json = await sendGet(diversionUrl, url, token)
  return json.data?.chatList || json
}

// 发送评论
async function sendComments (diversionUrl: string, token: string, bookId: string, content: string = ''): Promise<'success' | string> {
  const url = `comics/${bookId}/comments`
  const body = { content }
  const json = await sendPost(diversionUrl, url, body, token)
  return json.message
  // json { code: 200, message:'success' | string, error?: number }
}

// 排行榜
async function rank (diversionUrl: string, token: string, tt: 'H24' | 'D7' | 'D30'): Promise<P.Comic[]> {
  const url = `comics/leaderboard?tt=${tt}&ct=VC`
  const json = await sendGet(diversionUrl, url, token)
  return json.data?.comics || json
}

// 骑士榜
async function knightRank (diversionUrl: string, token: string): Promise<P.Creator[]> {
  const url = `comics/knight-leaderboard`
  const json = await sendGet(diversionUrl, url, token)
  return json.data?.users || json
}

// 设置头衔
async function setTitle (diversionUrl: string, token: string, userId: string, title: string): Promise<any> {
  const url = `users/${userId}/title`
  const body = { title }
  const json = await sendPut(diversionUrl, url, body, token)
  return json
}

// 注册
async function register (diversionUrl: string, registerData: P.RegisterData): Promise<P.RegisterRes> {
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
async function commentLike (diversionUrl: string, token: string, commentId: string): Promise<P.likeAction> {
  const url = `comments/${commentId}/like`
  const json = await sendPost(diversionUrl, url, null, token)
  return json.data?.action || json
}

// 获得子评论
async function childrenComments (diversionUrl: string, token: string, commentId: string, page: number = 1): Promise<P.CommentList['comments']> {
  const url = `comments/${commentId}/childrens?page=${page}`
  const json = await sendGet(diversionUrl, url, token)
  return json.data.comments
}

export {
  androidInfo, checkToken, authorize, categories, comics, info, episodes, picture,
  recommend, keyword, categoriesSearch, tagSearch, search, like, comments, favourite,
  personInfo, myFavourite, myComments, collections, punch, randomComic, appList,
  gameList, gameInfo, gameComments, gameLike, chat, sendComments, rank, knightRank,
  setTitle, register, commentLike, childrenComments
}
