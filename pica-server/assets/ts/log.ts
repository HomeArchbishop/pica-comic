import fs from 'fs'
import { join } from 'path'

const writeMsg = async function writeMsg (message: string) {
  const date =
    new Date().getFullYear().toString() +
    new Date().getMonth().toString() +
    new Date().getDate().toString()
  const fileName = `${date}.log`
  const logDirPath = join(__dirname, '../../log/', date)
  const filePath = join(logDirPath, fileName)
  const logDirExist = fs.existsSync(logDirPath)
  const fileExist = fs.existsSync(filePath)
  if (!fileExist) {
    logDirExist ||
      fs.mkdirSync(logDirPath, {recursive: true})
    fs.writeFileSync(filePath, '')
  }
  fs.appendFileSync(filePath, message)
}


const log = {
  debug: async function (title: string = '', message: string | object = 'unknown debug') {
    const msg = typeof message === 'object' ? JSON.stringify(message) : message
    const logStr = `${title && '[' + title + '] '}${msg}`
    writeMsg(`[DEBUG] ${new Date().getTime()} ${logStr}\n`);
  },
  info: async function (title: string = '', message: string | object = 'unknown info') {
    const msg = typeof message === 'object' ? JSON.stringify(message) : message
    const logStr = `${title && '[' + title + '] '}${msg}`
    writeMsg(`[INFO] ${new Date().getTime()} ${logStr}\n`);
  },
  error: async function (title: string = '', message: string | object = 'unknown error') {
    const msg = typeof message === 'object' ? JSON.stringify(message) : message
    const logStr = `${title && '[' + title + '] '}${msg}`
    writeMsg(`[ERROR] ${new Date().getTime()} ${logStr}\n`);
  },
  warn: async function (title: string = '', message: string | object = 'unknown warn') {
    const msg = typeof message === 'object' ? JSON.stringify(message) : message
    const logStr = `${title && '[' + title + '] '}${msg}`
    writeMsg(`[WARN] ${new Date().getTime()} ${message}\n`);
  },
  fatal: async function (title: string = '', message: string | object = 'unknown fatal') {
    const msg = typeof message === 'object' ? JSON.stringify(message) : message
    const logStr = `${title && '[' + title + '] '}${msg}`
    writeMsg(`[FATAL] ${new Date().getTime()} ${logStr}\n`);
  }
}

export default log
