import levelup from 'levelup'
import leveldown from 'leveldown'

const db = levelup(leveldown('./db/static'))

const extraCategories = [
  {
    active: true,
    isWeb: false,
    isApp: true,
    path: 'random',
    thumb: {
      fileServer: '@',
      originalName: 'x',
      path: 'img/random.jpg',
    },
    title: '随机本子'
  },
  {
    active: true,
    isWeb: false,
    isApp: true,
    path: 'knight',
    thumb: {
      fileServer: '@',
      originalName: 'x',
      path: 'img/knight.jpg',
    },
    title: '骑士榜'
  },
  {
    active: true,
    isWeb: false,
    isApp: true,
    path: 'game',
    thumb: {
      fileServer: '@',
      originalName: 'x',
      path: 'img/game.jpg',
    },
    title: '游戏区'
  }
]

db.put('extraCategories', JSON.stringify(extraCategories))
