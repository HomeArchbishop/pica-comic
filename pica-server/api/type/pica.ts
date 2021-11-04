export type likeAction = 'like' | 'unlike'

export class Img {
  originalName!: string
  path!: string
  fileServer!: string
}

export class Category {
  title!: string
  thumb!: Img
  description?: string
  isWeb?: boolean
  active?: boolean
  link?: string
  _id?: string
}

// 简介
export class Comic {
  _id!: string
  title!: string
  author!: string
  totalViews!: number
  totalLikes!: number
  pagesCount!: number
  epsCount!: number
  finished!: true
  categories!: string[]
  thumb!: Img
  id!: string
  likesCount!: number
}

export class ComicList {
  docs!: Comic[]
  total!: number
  limit!: number
  page!: number
  pages!: number
}

export class ShenMoTuiJianItem {
  title!: '本子神推薦' | '本子魔推薦'
  comics!: Comic[]
}

export type gender = 'm' | 'f' | 'bot'

export class Creator {
  _id!: string
  gender!: gender
  name!: string
  slogan?: string
  title!: string
  verified!: boolean
  exp!: number
  level!: number
  characters!: string[]
  role?: string
  avatar!: Img
  character!: string // character icon url
 // character icon url
}

// 详细信息
export class ComicDetail {
  _id!: string
  _creator!: Creator
  title!: string
  description!: string
  thumb!: Img
  author!: string
  chineseTeam!: string // 汉化组
 // 汉化组
  categories!: string[]
  tags!: string[]
  pagesCount!: number
  epsCount!: number
  finished!: boolean
  updated_at!: string // timestamp string
 // timestamp string
  created_at!: string // timestamp string
 // timestamp string
  allowDownload!: boolean
  viewsCount!: number
  likesCount!: number
  isFavourite!: boolean
  isLiked!: boolean
  commentsCound!: number
}

// 分话
export class EpsItem {
  _id!: string
  title!: string
  order!: number // eps id, used for getting ep info
      // eps id, used for getting ep info
  updated_at!: string // timestamp string
 // timestamp string
  id!: string
}

export class Eps {
  docs!: EpsItem[]
  total!: number
  limit!: number
  page!: number
  pages!: number
}

export class PictureImg {
  _id!: string
  media!: Img
  id!: string
}

export class Pictures {
  pages!: {
    docs: PictureImg[]
    total: number
    limit: number
    page: number
    pages: number
  }
  ep!: {
    _id: string
    title: string
  }
}

export class CommentItem {
  _id!: string
  content!: string
  _user?: Creator
  _comic!: string
  isTop!: boolean
  hide!: boolean
  created_at!: string
  likesCount!: number
  commentsCount!: number
  isLiked!: boolean
}

export class CommentList {
  comments!: {
    docs: CommentItem[]
    total: number
    limit: number
    page: number
    pages: number
  }
  topComments!: []
}

export class PunchAction {
  status!: 'ok' | 'fail'
  punchInLastDay?: string
}

export class App {
  title!: string
  url!: string
  icon!: string
  showTitleBar!: boolean
  description!: string
}

export class RegisterData {
  email!: string
  password!: string
  name!: string
  birthday!: string
  gender!: gender
  answer1!: string
  answer2!: string
  answer3!: string
  question1!: string
  question2!: string
  question3!: string
}

export class RegisterRes {
  code!: number
  error?: string
  message!: string
}
