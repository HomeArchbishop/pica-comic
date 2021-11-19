import fs from 'fs'

type downloadInfo = {
  [comicId: string]: string[]
}

export default async function (): Promise<downloadInfo> {
  const comicIdList = fs.readdirSync('./static/download')
  const downloadInfo: downloadInfo = {}
  comicIdList.forEach(comicId => {
    const dirPath = `./static/download/${comicId}`
    if (fs.lstatSync(dirPath).isFile()) { return }
    const epsList = fs.readdirSync(dirPath)
    const tmpComicEpsList: string[] = []
    epsList.forEach(eps => {
      const dirPath = `./static/download/${comicId}/${eps}`
      if (fs.lstatSync(dirPath).isFile()) { return }
      if (!fs.existsSync(`${dirPath}/FLAG`)) { return }
      tmpComicEpsList.push(eps)
    })
    tmpComicEpsList.length && (downloadInfo[comicId] = tmpComicEpsList)
  })
  return downloadInfo
}