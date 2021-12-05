import fs from 'fs'
import path from 'path'

const favouriteChinese = async function (authorName: string): Promise<'favourite' | 'un_favourite'> {
  const dirPath = path.resolve(__dirname, `../../db/user/favouriteChinese`)
  const filePath = path.resolve(dirPath, `data.json`)
  // mkdir.
  fs.mkdirSync(dirPath, {recursive: true})
  // mkfile.
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '{}')
  }
  // modify file.
  const originObj = JSON.parse(fs.readFileSync(filePath).toString())
  const originList = originObj.list || []
  const newSet = new Set(originList)
  originList.includes(authorName) ? newSet.delete(authorName) : newSet.add(authorName)
  const newList = Array.from(newSet).sort()
  const newObj = {
    ...originObj,
    list: [ ...newList ]
  }
  fs.writeFileSync(filePath, JSON.stringify(newObj))
  // finished.
  return newList.includes(authorName)
    ? 'favourite'
    : 'un_favourite'
}

const favouriteChineseList = async function (): Promise<string[]> {
  const filePath = path.resolve(__dirname, `../../db/user/favouriteChinese/data.json`)
  // no file.
  if (!fs.existsSync(filePath)) {
    return []
  }
  // has file.
  const dataObj = JSON.parse(fs.readFileSync(filePath).toString())
  const favouriteAuthorList = dataObj.list || []
  return favouriteAuthorList
}

export { favouriteChinese, favouriteChineseList }