/// <reference path = "apiProxyRouter.d.ts" /> 

import express from 'express'
import axios from 'axios'
import levelup from 'levelup'
import leveldown from 'leveldown'
import fs from 'fs'

import * as api from '../api/pica'
import { Sorts } from '../static/util/transform'
import download from '../static/ts/download'
import downloadInfo from '../static/ts/downloadInfo'

const staticDb = levelup(leveldown('./db/static'))

const router = express.Router()

router
  // /
  // data: null
  .get('/', async function (req, res) {
    res.end()
  })
  // /
  // data: null
  .get('/diversionurl', async function (req, res) {
    const resp = await axios.get('http://68.183.234.72/init')
    res.json(resp.data?.addresses || resp)
  })
  // /authorize?username={_}&password={_}
  // data: <string> token
  .get('/authorize', async function (req, res) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      username: String(req.query.username),
      password: String(req.query.password)
    }
    const apiRes = await api.authorize(args.diversionUrl, args.username, args.password)
    res.end(apiRes)
  })
  // /checkToken?token={_}
  // data: <boolean> hasPassed
  .get('/checkToken', async function (req, res) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token)
    }
    const apiRes = await api.checkToken(args.diversionUrl, args.token)
    res.end(String(apiRes))
  })
  // /categories?token={_}
  // data: object[]
  .get('/categories', async function (req, res) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token)
    }
    const extraCategoriesListBuf = await staticDb.get('extraCategories')
    const extraCategoriesList = JSON.parse(extraCategoriesListBuf.toString())
    const apiRes = [
      ...extraCategoriesList,
      ...await api.categories(args.diversionUrl, args.token)
    ]
    res.json(apiRes)
  })
  // /categoriesSearch?token={_}&categories={_}&page={1}&sort={ua}
  // data: <ComicList>
  .get('/categoriesSearch', async function (req, res) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token),
      categories: String(req.query.categories),
      page: Number(req.query.page || 1),
      sort: Sorts(req.query.sort || 'ua')
    }
    const apiRes = await api.categoriesSearch(args.diversionUrl, args.token,
      args.categories, args.page, args.sort)
    res.json(apiRes)
  })
  // /tagSearch?token={_}&tag={_}&page={1}&sort={ua}
  // data: <ComicList>
  .get('/tagSearch', async function (req, res) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token),
      tag: String(req.query.tag),
      page: Number(req.query.page || 1),
      sort: Sorts(req.query.sort || 'ua')
    }
    const apiRes = await api.tagSearch(args.diversionUrl, args.token,
      args.tag, args.page || 1, args.sort || 'ua')
    res.json(apiRes)
  })
  // /search?token={_}&keyword={_}&page={1}&sort={ua}
  // data: <ComicList>
  .get('/search', async function (req, res) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token),
      keyword: String(req.query.keyword),
      page: Number(req.query.page || 1),
      sort: Sorts(req.query.sort || 'ua')
    }
    const apiRes = await api.search(args.diversionUrl, args.token, args.keyword,
      args.page || 1, args.sort || 'ua')
    res.json(apiRes)
  })
  // /keyword?token={_}
  // data: string[]
  .get('/keyword', async function (req, res) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token)
    }
    const apiRes = await api.keyword(args.diversionUrl, args.token)
    res.json(apiRes)
  })
  // /info?token={_}&comicId={_}
  // data: object<ComicDetail>
  .get('/info', async function (req, res) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token),
      comicId: String(req.query.comicId)
    }
    const apiRes = await api.info(args.diversionUrl, args.token, args.comicId)
    res.json(apiRes)
  })
  // /episodes?token={_}&comicId={_}
  // data: object<Eps>
  .get('/episodes', async function (req, res) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token),
      comicId: String(req.query.comicId)
    }
    const apiRes = await api.episodes(args.diversionUrl, args.token, args.comicId)
    res.json(apiRes)
  })
  // /picture?token={_}&comicId={_}&episodesOrder={_}&page={1}
  // data: object<Pictures>
  .get('/picture', async function (req, res) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token),
      comicId: String(req.query.comicId),
      episodesOrder: String(req.query.episodesOrder || 1),
      page: Number(req.query.page || 1)
    }
    // check if is downloaded.
    // (1) has downloaded.
    const downloadFlagPath = `./static/download/${args.comicId}/${args.episodesOrder}/FLAG`
    console.log(downloadFlagPath, fs.existsSync(downloadFlagPath))
    if (fs.existsSync(downloadFlagPath)) {
      console.log('downloaded')
      const downloadIndexPath = `./static/download/${args.comicId}/${args.episodesOrder}/info.json`
      const apiRes = JSON.parse(fs.readFileSync(downloadIndexPath).toString())
      res.json(apiRes)
      return
    }
    // (2) has not downloaded.
    const apiRes = await api.picture(args.diversionUrl, args.token, args.comicId, args.episodesOrder, args.page)
    res.json(apiRes)
  })
  // /myFavourite?token={_}&page={1}
  // data: ComicList
  .get('/myFavourite', async function (req, res) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token),
      page: Number(req.query.page || 1)
    }
    const apiRes = await api.myFavourite(args.diversionUrl, args.token, args.page)
    res.json(apiRes)
  })
  // /like?token={_}&bookId={_}
  // data: likeAction
  .get('/like', async function (req, res) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token),
      bookId: String(req.query.bookId)
    }
    const apiRes = await api.like(args.diversionUrl, args.token, args.bookId)
    res.json(apiRes)
  })
  // /favourite?token={_}&bookId={_}
  // data: favouriteAction
  .get('/favourite', async function (req, res) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token),
      bookId: String(req.query.bookId)
    }
    const apiRes = await api.favourite(args.diversionUrl, args.token, args.bookId)
    res.json(apiRes)
  })
  // /collections?token={_}
  // data: ShenMoTuiJianItem[]
  .get('/collections', async function (req, res) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token)
    }
    const apiRes = await api.collections(args.diversionUrl, args.token)
    res.json(apiRes)
  })
  // /comments?token={_}&bookId={_}&page={1}
  // data: CommentList
  .get('/comments', async function (req, res) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token),
      bookId: String(req.query.bookId),
      page: Number(req.query.page)
    }
    const apiRes = await api.comments(args.diversionUrl, args.token, args.bookId, args.page)
    res.json(apiRes)
  })
  // /comments?token={_}&page={1}
  // data: CommentList['comments']
  .get('/mycomments', async function (req, res) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token),
      page: Number(req.query.page)
    }
    const apiRes = await api.myComments(args.diversionUrl, args.token, args.page)
    res.json(apiRes)
  })
  // /personinfo?token={_}
  // data: favouriteAction
  .get('/personinfo', async function (req, res) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token)
    }
    const apiRes = await api.personInfo(args.diversionUrl, args.token)
    res.json(apiRes)
  })
  // /punch?token={_}
  // data: PunchAction
  .get('/punch', async function (req, res) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token)
    }
    const apiRes = await api.punch(args.diversionUrl, args.token)
    res.json(apiRes)
  })
  // /randomComic?token={_}
  // data: Comic[]
  .get('/punch', async function (req, res) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token)
    }
    const apiRes = await api.punch(args.diversionUrl, args.token)
    res.json(apiRes)
  })
  // /randomComic?token={_}
  // data: Comic[]
  .get('/punch', async function (req, res) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token)
    }
    const apiRes = await api.punch(args.diversionUrl, args.token)
    res.json(apiRes)
  })
  // /register
  // POST body: RegisterData
  // data: RegisterRes
  .post('/register', async function (req, res) {
    const args = {
      diversionUrl: String(req.body.diversionUrl),
      registerData: { ...req.body.registerData }
    }
    const apiRes = await api.register(args.diversionUrl, { ...args.registerData })
    res.json(apiRes)
  })
  // /commentLike?token={_}&commentId={_}
  // data: likeAction
  .get('/commentLike', async function (req, res) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token),
      commentId: String(req.query.commentId)
    }
    const apiRes = await api.commentLike(args.diversionUrl, args.token, args.commentId)
    res.json(apiRes)
  })
  // /randomComic?token={_}
  // data: likeAction
  .get('/randomComic', async function (req, res) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token)
    }
    const apiRes = await api.randomComic(args.diversionUrl, args.token)
    res.json(apiRes)
  })
  // /download?token={_}&comicId={_}&episodesOrder={_}
  // data: 'succeed' | 'fail'
  .get('/download', async function (req, res) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token),
      comicId: String(req.query.comicId),
      episodesOrder: String(req.query.episodesOrder || 1)
    }
    const resp = await download({ ...args })
    res.end(resp)
  })
  // /downloadInfo?token={_}&comicId={_}&episodesOrder={_}
  // data: downloadInfo
  .get('/downloadInfo', async function (req, res) {
    const resp = await downloadInfo()
    res.json(resp)
  })
  // /knightRank?token={_}
  // data: Creator[]
  .get('/knightRank', async function (req, res) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token)
    }
    const apiRes = await api.knightRank(args.diversionUrl, args.token)
    res.json(apiRes)
  })
  // /appList?token={_}
  // data: App[]
  .get('/appList', async function (req, res) {
    const args = {
      diversionUrl: String(req.query.diversionUrl),
      token: String(req.query.token)
    }
    const apiRes = await api.appList(args.diversionUrl, args.token)
    res.json(apiRes)
  })
export default router
