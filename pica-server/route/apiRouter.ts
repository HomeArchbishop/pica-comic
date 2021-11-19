/// <reference path = "apiRouter.d.ts" /> 

import express from 'express'
import axios from 'axios'
import fs from 'fs'

import * as api from '../api/pica'
import { Sorts, Tt } from '../assets/util/transform'
import download from '../assets/ts/download'
import downloadInfo from '../assets/ts/downloadInfo'
import log from '../assets/ts/log'
import LightDb from '../assets/lightDb'

const staticDb = new LightDb(__dirname, '../db/static')

const router = express.Router()

router.use((req, res, next) => {
  log.info('apiRouteIn', { path: req.path })
  next()
})

router
  // /
  // data: null
  .get('/', async function (req, res, next) {
    res.end('connected')
  })
  // /
  // data: null
  .get('/diversionurl', async function (req, res, next) {
    try {
      const apiData = (await axios.get('http://68.183.234.72/init')).data
      res.json(apiData.addresses)  
    } catch (err) { next(err) }
  })
  // /authorize?username={_}&password={_}
  // data: <string> token
  .get('/authorize', async function (req, res, next) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      username: String(req.query.username),
      password: String(req.query.password)
    }
    try {
      const apiData = await api.authorize(args.diversionUrl, args.username, args.password)
      res.end(apiData)
    } catch (err) { next(err) }
  })
  // /checkToken?token={_}
  // data: <boolean> hasPassed
  .get('/checkToken', async function (req, res, next) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token)
    }
    try {
      const apiData = await api.checkToken(args.diversionUrl, args.token)
      res.end(String(apiData))
    } catch (err) { next(err) }
  })
  // /categories?token={_}
  // data: object[]
  .get('/categories', async function (req, res, next) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token)
    }
    try {
      const extraCategoriesList = await staticDb.get('extraCategories')
      const apiData = [
        ...extraCategoriesList,
        ...await api.categories(args.diversionUrl, args.token)
      ]
      res.json(apiData)
    } catch (err) { next(err) }
  })
  // /categoriesSearch?token={_}&categories={_}&page={1}&sort={ua}
  // data: <ComicList>
  .get('/categoriesSearch', async function (req, res, next) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token),
      categories: String(req.query.categories),
      page: Number(req.query.page || 1),
      sort: Sorts(req.query.sort || 'ua')
    }
    try {
      const apiData = await api.categoriesSearch(args.diversionUrl, args.token,
        args.categories, args.page, args.sort)
      res.json(apiData)
    } catch (err) { next(err) }
  })
  // /tagSearch?token={_}&tag={_}&page={1}&sort={ua}
  // data: <ComicList>
  .get('/tagSearch', async function (req, res, next) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token),
      tag: String(req.query.tag),
      page: Number(req.query.page || 1),
      sort: Sorts(req.query.sort || 'ua')
    }
    try {
      const apiData = await api.tagSearch(args.diversionUrl, args.token,
        args.tag, args.page || 1, args.sort || 'ua')
      res.json(apiData)
    } catch (err) { next(err) }
  })
  // /search?token={_}&keyword={_}&page={1}&sort={ua}
  // data: <ComicList>
  .get('/search', async function (req, res, next) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token),
      keyword: String(req.query.keyword),
      page: Number(req.query.page || 1),
      sort: Sorts(req.query.sort || 'ua')
    }
    try {
      const apiData = await api.search(args.diversionUrl, args.token, args.keyword,
        args.page || 1, args.sort || 'ua')
      res.json(apiData)
    } catch (err) { next(err) }
  })
  // /keyword?token={_}
  // data: string[]
  .get('/keyword', async function (req, res, next) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token)
    }
    try {
      const apiData = await api.keyword(args.diversionUrl, args.token)
      res.json(apiData)
    } catch (err) { next(err) }
  })
  // /info?token={_}&comicId={_}
  // data: object<ComicDetail>
  .get('/info', async function (req, res, next) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token),
      comicId: String(req.query.comicId)
    }
    try {
      const apiData = await api.info(args.diversionUrl, args.token, args.comicId)
      res.json(apiData)
    } catch (err) { next(err) }
  })
  // /episodes?token={_}&comicId={_}
  // data: object<Eps>
  .get('/episodes', async function (req, res, next) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token),
      comicId: String(req.query.comicId)
    }
    try {
      const apiData = await api.episodes(args.diversionUrl, args.token, args.comicId)
      res.json(apiData)
    } catch (err) { next(err) }
  })
  // /picture?token={_}&comicId={_}&episodesOrder={_}&page={1}
  // data: object<Pictures>
  .get('/picture', async function (req, res, next) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token),
      comicId: String(req.query.comicId),
      episodesOrder: String(req.query.episodesOrder || 1),
      page: Number(req.query.page || 1)
    }
    // check if is downloaded.
    // (1) has downloaded.
    try {
      const downloadFlagPath = `./static/download/${args.comicId}/${args.episodesOrder}/FLAG`
      console.log(downloadFlagPath, fs.existsSync(downloadFlagPath))
      if (fs.existsSync(downloadFlagPath)) {
        console.log('downloaded')
        const downloadIndexPath = `./static/download/${args.comicId}/${args.episodesOrder}/info.json`
        const apiData = JSON.parse(fs.readFileSync(downloadIndexPath).toString())
        res.json(apiData)
        return
      }
    } catch (err) { next(err) }
    // (2) has not downloaded.
    try {
      const apiData = await api.picture(args.diversionUrl, args.token, args.comicId, args.episodesOrder, args.page)
      res.json(apiData)
    } catch (err) { next(err) }

  })
  // /myFavourite?token={_}&page={1}
  // data: ComicList
  .get('/myFavourite', async function (req, res, next) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token),
      page: Number(req.query.page || 1)
    }
    try {
      const apiData = await api.myFavourite(args.diversionUrl, args.token, args.page)
      res.json(apiData)
    } catch (err) { next(err) }
  })
  // /like?token={_}&bookId={_}
  // data: likeAction
  .get('/like', async function (req, res, next) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token),
      bookId: String(req.query.bookId)
    }
    try {
      const apiData = await api.like(args.diversionUrl, args.token, args.bookId)
      res.json(apiData)
    } catch (err) { next(err) }
  })
  // /favourite?token={_}&bookId={_}
  // data: favouriteAction
  .get('/favourite', async function (req, res, next) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token),
      bookId: String(req.query.bookId)
    }
    try {
      const apiData = await api.favourite(args.diversionUrl, args.token, args.bookId)
      res.json(apiData)
    } catch (err) { next(err) }
  })
  // /collections?token={_}
  // data: ShenMoTuiJianItem[]
  .get('/collections', async function (req, res, next) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token)
    }
    try {
      const apiData = await api.collections(args.diversionUrl, args.token)
      res.json(apiData)  
    } catch (err) { next(err) }
  })
  // /comments?token={_}&bookId={_}&page={1}
  // data: CommentList
  .get('/comments', async function (req, res, next) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token),
      bookId: String(req.query.bookId),
      page: Number(req.query.page)
    }
    try {
      const apiData = await api.comments(args.diversionUrl, args.token, args.bookId, args.page)
      res.json(apiData)
    } catch (err) { next(err) }
  })
  // /comments?token={_}&page={1}
  // data: CommentList['comments']
  .get('/mycomments', async function (req, res, next) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token),
      page: Number(req.query.page)
    }
    try {
      const apiData = await api.myComments(args.diversionUrl, args.token, args.page)
      res.json(apiData)
    } catch (err) { next(err) }
  })
  // /personinfo?token={_}
  // data: favouriteAction
  .get('/personinfo', async function (req, res, next) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token)
    }
    try {
      const apiData = await api.personInfo(args.diversionUrl, args.token)
      res.json(apiData)
    } catch (err) { next(err) }
  })
  // /punch?token={_}
  // data: PunchAction
  .get('/punch', async function (req, res, next) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token)
    }
    try {
      const apiData = await api.punch(args.diversionUrl, args.token)
      res.json(apiData)
    } catch (err) { next(err) }
  })
  // /register
  // POST body: RegisterData
  // data: RegisterRes
  .post('/register', async function (req, res, next) {
    const args = {
      diversionUrl: String(req.body.diversionUrl),
      registerData: { ...req.body.registerData }
    }
    try {
      const apiData = await api.register(args.diversionUrl, { ...args.registerData })
      res.json(apiData)
    } catch (err) { next(err) }
  })
  // /commentLike?token={_}&commentId={_}
  // data: likeAction
  .get('/commentLike', async function (req, res, next) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token),
      commentId: String(req.query.commentId)
    }
    try {
      const apiData = await api.commentLike(args.diversionUrl, args.token, args.commentId)
      res.json(apiData)
    } catch (err) { next(err) }
  })
  // /randomComic?token={_}
  // data: likeAction
  .get('/randomComic', async function (req, res, next) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token)
    }
    try {
      const apiData = await api.randomComic(args.diversionUrl, args.token)
      res.json(apiData)  
    } catch (err) { next(err) }
  })
  // /download?token={_}&comicId={_}&episodesOrder={_}
  // data: 'succeed' | 'fail'
  .get('/download', async function (req, res, next) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token),
      comicId: String(req.query.comicId),
      episodesOrder: String(req.query.episodesOrder || 1)
    }
    try {
      const resp = await download({ ...args })
      res.end(resp)
    } catch (err) { next(err) }
  })
  // /downloadInfo?token={_}&comicId={_}&episodesOrder={_}
  // data: downloadInfo
  .get('/downloadInfo', async function (req, res, next) {
    try {
      const resp = await downloadInfo()
      res.json(resp)
    } catch (err) { next(err) }
  })
  // /knightRank?token={_}
  // data: Creator[]
  .get('/knightRank', async function (req, res, next) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token)
    }
    try {
      const apiData = await api.knightRank(args.diversionUrl, args.token)
      res.json(apiData)
    } catch (err) { next(err) }
  })
  // /appList?token={_}
  // data: App[]
  .get('/appList', async function (req, res, next) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token)
    }
    try {
      const apiData = await api.appList(args.diversionUrl, args.token)
      res.json(apiData)  
    } catch (err) { next(err) }
  })
  // /recommend?token={_}&comicId={_}
  // data: []
  .get('/recommend', async function (req, res, next) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      comicId: String(req.query.comicId),
      token: String(req.query.token)
    }
    try {
      const apiData = await api.recommend(args.diversionUrl, args.token, args.comicId)
      res.json(apiData)
    } catch (err) { next(err) }
  })
  // /rank?token={_}&comicId={_}
  // data: Comic[]
  .get('/rank', async function (req, res, next) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token),
      tt: Tt(req.query.tt)
    }
    try {
      const apiData = await api.rank(args.diversionUrl, args.token, args.tt)
      res.json(apiData)
    } catch (err) { next(err) }
  })
  // /gameList?token={_}&page={1}
  // data: Comic[]
  .get('/gameList', async function (req, res, next) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token),
      page: Number(req.query.page)
    }
    try {
      const apiData = await api.gameList(args.diversionUrl, args.token, args.page)
      res.json(apiData)
    } catch (err) { next(err) }
  })
  // /gameInfo?token={_}&gameId={_}
  // data: Comic[]
  .get('/gameInfo', async function (req, res, next) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token),
      gameId: String(req.query.gameId)
    }
    try {
      const apiData = await api.gameInfo(args.diversionUrl, args.token, args.gameId)
      res.json(apiData)
    } catch (err) { next(err) }
  })
  // /gameLike?token={_}&gameId={_}
  // data: 'like' | 'unlike'
  .get('/gameLike', async function (req, res, next) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token),
      gameId: String(req.query.gameId)
    }
    try {
      const apiData = await api.gameLike(args.diversionUrl, args.token, args.gameId)
      res.json(apiData)
    } catch (err) { next(err) }
  })
  // /gameComments?token={_}&gameId={_}&page={_}
  // data: CommentList
  .get('/gameComments', async function (req, res, next) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token),
      gameId: String(req.query.gameId),
      page: Number(req.query.page)
    }
    try {
      const apiData = await api.gameComments(args.diversionUrl, args.token, args.gameId, args.page)
      res.json(apiData)
    } catch (err) { next(err) }
  })
  // /chat?token={_}
  // data: ChatRoom[]
  .get('/chat', async function (req, res, next) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token)
    }
    try {
      const apiData = await api.chat(args.diversionUrl, args.token)
      res.json(apiData)
    } catch (err) { next(err) }
  })
  // /sendComments?token={_}
  // data: 'success' | string
  .get('/sendComments', async function (req, res, next) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token),
      comicId: String(req.query.comicId),
      content: String(req.query.content)
    }
    try {
      const apiData = await api.sendComments(args.diversionUrl, args.token, args.comicId, args.content)
      res.json(apiData)
    } catch (err) { next(err) }
  })
  // /childrenComments?token={_}&commentId={_}&page={1}
  // data: 'success' | string
  .get('/childrenComments', async function (req, res, next) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token),
      commentId: String(req.query.commentId),
      page: Number(req.query.page || 1)
    }
    try {
      const apiData = await api.childrenComments(args.diversionUrl, args.token, args.commentId, args.page)
      res.json(apiData)
    } catch (err) { next(err) }
  })

export default router
