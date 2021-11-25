import * as api from '../../api/pica'
import download from 'download'
import fs from 'fs'

interface download {
  diversionUrl: string,
  token: string,
  comicId: string,
  episodesOrder: string
}

let totalPictureNumber: number = 0
let downloadedNumber: number = 0

const downloadPicture = async function (pictureUrl: string, savePath: string, filename: string,
  comicId: string, episodesOrder: string) {
  download(pictureUrl, savePath, { filename })
    .then(() => {
      downloadedNumber++
      const downloadedPercent: number = Number((downloadedNumber / totalPictureNumber).toFixed(3))
      console.log('downloadedPercent', downloadedNumber, downloadedPercent)
      // update flag file. 
      const flagSavePath = `./static/download/${comicId}/${String(episodesOrder)}/FLAG`
      fs.writeFileSync(flagSavePath, downloadedPercent === 1 ? 'completed' : 'downloading')    
    })
    .catch(() => {
      downloadPicture(pictureUrl, savePath, filename, comicId, episodesOrder)
    })
}

const downloadComic = async function ({diversionUrl, token, comicId, episodesOrder}: download): Promise<'succeed' | 'fail'> {
  // ask for first page as a templet.
  const firstPictureObject = await api.picture(diversionUrl, token,
    comicId,episodesOrder, 1)
  const totalPages = Number(firstPictureObject.pages.pages)
  const savePictureObject = {...firstPictureObject}
  // mkdir.
  fs.mkdirSync(`./static/download/${comicId}/${episodesOrder}`, {recursive: true})
  // ask for rest pages.
  for (let cPage = 2; cPage < totalPages + 1; cPage++) {
    const pictureObject = await api.picture(diversionUrl, token,
      comicId,episodesOrder, cPage)
    savePictureObject.pages.docs.push(...pictureObject.pages.docs)
  }
  // download each page.
  totalPictureNumber = savePictureObject.pages.docs.length
  downloadedNumber = 0
  savePictureObject.pages.docs.forEach(item => {
    const pictureUrl = `https://storage1.picacomic.com/static/${item.media.path}`
    const fileName = item.media.path
    const savePath = `./static/download/${comicId}/${String(episodesOrder)}/`
    // async download
    downloadPicture(pictureUrl, savePath, fileName, comicId, episodesOrder)
  })
  // format save object
  savePictureObject.pages.page = savePictureObject.pages.pages
  savePictureObject.pages.docs.forEach((item) => {
    item.media.fileServer = `@`,
    item.media.path = `download/${comicId}/${episodesOrder}/${item.media.path}`
  })
  // save index tree files.
  const objectSavePath = `./static/download/${comicId}/${String(episodesOrder)}/info.json`
  fs.writeFileSync(objectSavePath, JSON.stringify(savePictureObject))
  // return
  return 'succeed'
}

export default downloadComic