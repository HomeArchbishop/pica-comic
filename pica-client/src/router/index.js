import Vue from 'vue'
import Router from 'vue-router'

import LoginView from '@/views/LoginView'
import RegisterView from '@/views/RegisterView'
import HomeView from '@/views/HomeView'
import FavouriteView from '@/views/FavouriteView'
import DownloadView from '@/views/DownloadView'
import CategoryView from '@/views/CategoryView'
import CategorySearchView from '@/views/CategorySearchView'
import TagSearchView from '@/views/TagSearchView'
import RecentView from '@/views/RecentView'
import SearchView from '@/views/SearchView'
import SearchEmptyView from '@/views/SearchEmptyView'
import ComicDetailView from '@/views/ComicDetailView'
import ComicPictureView from '@/views/ComicPictureView'
import UserView from '@/views/UserView'
import CommentsView from '@/views/CommentsView'
import LinkView from '@/views/LinkView'
import HideView from '@/views/HideView'
import SettingView from '@/views/SettingView'
import RandomView from '@/views/RandomView'
import AboutView from '@/views/AboutView'
import KnightView from '@/views/KnightView'
import RankView from '@/views/RankView'
import GameView from '@/views/GameView'
import GameDetailView from '@/views/GameDetailView'
import GameCommentsView from '@/views/GameCommentsView'
import CoffeeView from '@/views/CoffeeView'

import auth from './middleware/auth'
import historyState from './middleware/historyState'
import setTitle from './middleware/setTitle'
import checkConnect from './middleware/checkConnect'

import { checkToken } from '../api/index'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      alias: '/login',
      name: 'LoginView',
      component: LoginView,
      meta: {
        title: '登录',
        authExclude: true
      },
      beforeEnter (to, from, next) {
        checkToken(localStorage.token)
          .then(res => {
            res
              ? next({ name: 'HomeView' })
              : next()
          })
      }
    },
    {
      path: '/home',
      name: 'HomeView',
      component: HomeView,
      meta: {
        title: '主页',
        keepAlive: true
      }
    },
    {
      path: '/register',
      name: 'RegisterView',
      component: RegisterView,
      meta: {
        title: '注册',
        authExclude: true
      }
    },
    {
      path: '/favourite',
      name: 'FavouriteView',
      component: FavouriteView,
      meta: {
        title: '收藏'
      }
    },
    {
      path: '/download',
      name: 'DownloadView',
      component: DownloadView,
      meta: {
        title: '下载'
      }
    },
    {
      path: '/recent',
      name: 'RecentView',
      component: RecentView,
      meta: {
        title: '最近观看'
      }
    },
    {
      path: '/category',
      name: 'CategoryView',
      component: CategoryView,
      meta: {
        title: '分类',
        keepAlive: true
      }
    },
    {
      path: '/category/:c',
      name: 'CategorySearchView',
      component: CategorySearchView,
      meta: {
        title: '分类搜索',
        keepAlive: true
      }
    },
    {
      path: '/tag/:t',
      name: 'TagSearchView',
      component: TagSearchView,
      meta: {
        title: '标签搜索',
        keepAlive: true
      }
    },
    {
      path: '/search/:kw',
      name: 'SearchView',
      component: SearchView,
      meta: {
        title: '搜索',
        keepAlive: true
      }
    },
    {
      path: '/search',
      name: 'SearchEmptyView',
      component: SearchEmptyView,
      meta: {
        title: '搜索',
        keepAlive: true
      }
    },
    {
      path: '/comicdetail/:id',
      name: 'ComicDetailView',
      component: ComicDetailView,
      meta: {
        title: '漫画简介'
      }
    },
    {
      path: '/comic/:id/:order',
      name: 'ComicPictureView',
      component: ComicPictureView,
      meta: {
        title: '漫画'
      }
    },
    {
      path: '/user',
      name: 'UserView',
      component: UserView,
      meta: {
        title: '用户',
        keepAlive: true
      }
    },
    {
      path: '/comments/:id',
      name: 'CommentsView',
      component: CommentsView,
      meta: {
        title: '评论'
      }
    },
    {
      path: '/link/:link',
      alias: '/link',
      name: 'LinkView',
      component: LinkView,
      meta: {
        title: '网页'
      }
    },
    {
      path: '/%E5%A2%A8%E5%AD%90',
      alias: ['/hide'],
      name: 'HideView',
      component: HideView,
      meta: {
        title: '墨子-古诗文',
        keepAlive: true
      }
    },
    {
      path: '/setting',
      name: 'SettingView',
      component: SettingView,
      meta: {
        title: '设置'
      }
    },
    {
      path: '/random',
      name: 'RandomView',
      component: RandomView,
      meta: {
        title: '随机',
        keepAlive: true
      }
    },
    {
      path: '/about',
      name: 'AboutView',
      component: AboutView,
      meta: {
        title: '关于',
        keepAlive: true
      }
    },
    {
      path: '/knight',
      name: 'KnightView',
      component: KnightView,
      meta: {
        title: '骑士榜'
      }
    },
    {
      path: '/rank',
      name: 'RankView',
      component: RankView,
      meta: {
        title: '排行榜',
        keepAlive: true
      }
    },
    {
      path: '/game',
      name: 'GameView',
      component: GameView,
      meta: {
        title: '游戏区',
        keepAlive: true
      }
    },
    {
      path: '/game/:id',
      name: 'GameDetailView',
      component: GameDetailView,
      meta: {
        title: '游戏'
      }
    },
    {
      path: '/game/comments/:id',
      name: 'GameCommentsView',
      component: GameCommentsView,
      meta: {
        title: '游戏评论'
      }
    },
    {
      path: '/coffee',
      alias: ['/vip', '/cafe', '/levelup'],
      name: 'CoffeeView',
      component: CoffeeView,
      meta: {
        title: '升级',
        keepAlive: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // token验证
  const context = {
    to,
    from,
    next
  }
  // next 拦截
  auth({ ...context })
  next()
})

router.afterEach((to, from) => {
  // token验证
  const context = {
    to,
    from
  }
  checkConnect({ ...context })
  historyState({ ...context })
  setTitle({ ...context })
})

export default router
