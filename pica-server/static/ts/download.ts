import * as api from '../../api/pica'
import download from 'download'
import fs from 'fs'

interface download {
  diversionUrl: string,
  token: string,
  comicId: string,
  episodesOrder: string
}
export default async function ({diversionUrl, token, comicId, episodesOrder}: download): Promise<'succeed' | 'fail'> {
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
  const totalPictureNumber: number = savePictureObject.pages.docs.length
  let downloadedNumber: number = 0
  let downloadedPercent: number = 0 // fix to 0.xx, such as 0.88.
  savePictureObject.pages.docs.forEach(item => {
    const pictureUrl = `https://storage1.picacomic.com/static/${item.media.path}`
    const fileName = item.media.path
    const savePath = `./static/download/${comicId}/${String(episodesOrder)}/`
    console.log(pictureUrl, savePath)
    // async download
    download(pictureUrl, savePath, { filename: fileName })
      .then(() => {
        downloadedNumber++
        downloadedPercent = Number((downloadedNumber / totalPictureNumber).toFixed(3))
        // update flag file. 
        const flagSavePath = `./static/download/${comicId}/${String(episodesOrder)}/FLAG`
        fs.writeFileSync(flagSavePath, `${new Date().getTime().toString()}\n${downloadedPercent}`)    
      })
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