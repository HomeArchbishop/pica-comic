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
      fileServer: '#',
      originalName: 'x',
      path: 'every-see.jpg',
    },
    title: '随机本子'
  }
]

db.put('extraCategories', JSON.stringify(extraCategories))
