/// <reference path = "./index.d.ts"/>

const fs = require('fs')
const { join } = require('path')

const LightDb = class {
  constructor (__dir, path) {
    this.file = join(__dir, path, './data.json')
    this.dir = join(__dir, path)
  }
  
  file = ''
  dir = ''

  set = async (key, newValue) => {
    if (!fs.existsSync(this.dir)) {
      fs.mkdirSync(this.dir)
    }
    if (!fs.existsSync(this.file)) {
      fs.writeFileSync(this.file, '{}')
    }

    const oldJson = JSON.parse(fs.readFileSync(this.file).toString())
    const newJson = {
      ...oldJson,
      [key]: newValue
    }

    fs.writeFileSync(this.file, JSON.stringify(newJson))

    return newJson
  }

  get = async (key) => {
    if (!fs.existsSync(this.dir)) {
      return undefined
    }

    const oldJson = JSON.parse(fs.readFileSync(this.file).toString())

    const value = oldJson[key] || undefined

    return value
  }

  delete = async (key) => {
    if (!fs.existsSync(this.dir)) {
      return undefined
    }
    if (!fs.existsSync(this.file)) {
      fs.writeFileSync(this.file, '{}')
    }

    const oldJson = JSON.parse(fs.readFileSync(this.file).toString())
    const newJson = { ...oldJson }
    const deleteAction = delete newJson[key]

    fs.writeFileSync(this.file, JSON.stringify(newJson))

    return deleteAction
  }
}

module.exports = LightDb
