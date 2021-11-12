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
  debug: async function (message: string) {
    writeMsg(`[DEBUG] ${new Date().getTime()} ${message}\n`);
  },
  info: async function (message: string) {
    writeMsg(`[INFO] ${new Date().getTime()} ${message}\n`);
  },
  error: async function (message: string) {
    writeMsg(`[ERROR] ${new Date().getTime()} ${message}\n`);
  },
  warn: async function (message: string) {
    writeMsg(`[WARN] ${new Date().getTime()} ${message}\n`);
  },
  fatal: async function (message: string) {
    writeMsg(`[FATAL] ${new Date().getTime()} ${message}\n`);
  }
}

export default log
