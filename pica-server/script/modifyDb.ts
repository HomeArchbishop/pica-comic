import levelup from 'levelup'
import leveldown from 'leveldown'

const db = levelup(leveldown('./db/static'))

const extraCategories = [
  {
    active: true,
    isWeb: false,
    isApp: true,
    thumb: {
      fileServer: 'x',
      originalName: 'x',
      path: 'every-see.jpg',
    },
    title: '随机本子'
  }
]

db.put('extraCategories', JSON.stringify(extraCategories))
