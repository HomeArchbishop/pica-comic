import fs from 'fs'

type downloadInfo = {
  [comicId: string]: string[]
}

export default async function (): Promise<downloadInfo> {
  // if unexist download dir.
  if (!fs.existsSync('./static/download')) { return {} }
  // else
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
      if (fs.readFileSync(`${dirPath}/FLAG`).toString() !== 'completed') { return }
      tmpComicEpsList.push(eps)
    })
    tmpComicEpsList.length && (downloadInfo[comicId] = tmpComicEpsList)
  })
  return downloadInfo
}