import fs from 'fs'
import JSZip from 'jszip'
import path from 'path'
import isJSON from '@stdlib/assert-is-json'

export async function downloadZip (comicId: string, episodesOrder: string): Promise<string> {
  const dirPath = `./static/download/${comicId}/${episodesOrder}`
  // if unexist download dir.
  if (!fs.existsSync(dirPath) ||
    !fs.existsSync(`${dirPath}/FLAG`) ||
    fs.readFileSync(`${dirPath}/FLAG`).toString() !== 'completed' ||
    !fs.existsSync(`${dirPath}/info.json`)) {
      throw JSON.stringify({
        errType: 'clientError',
        errObj: { message: 'comic not downloaded.' }
      })
    }
  // else.
  const comicInfoBuffer = fs.readFileSync(`./static/download/${comicId}/${episodesOrder}/info.json`)
  const comicInfoString = comicInfoBuffer.toString()
  if (!isJSON(comicInfoString)) {
    throw JSON.stringify({
      errType: 'clientError',
      errObj: { message: 'comic not downloaded correctly.' }
    })
  }
  const comicInfo: any = JSON.parse(comicInfoString)
  const comicPictureList: any[] = comicInfo.pages.docs
  // pack to zip.
  const zip = new JSZip()
  comicPictureList.forEach((item, index) => {
    const imgStorePath = path.join('./static', item.media.path)
    const imgData = fs.readFileSync(imgStorePath)
    const imgExtname = path.extname(imgStorePath)
    const imgZipName = `${index}${imgExtname}`
    zip.file(imgZipName, imgData, {base64: true})
  })
  const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' })
  // save zip.
  const saveDir = `./static/tmp/download`
  const saveName = `${comicId}-${episodesOrder}.zip`
  const savePath = `${saveDir}/${saveName}`
  fs.mkdirSync(saveDir, { recursive: true })
  fs.writeFileSync(savePath, zipBuffer)
  return savePath
}
