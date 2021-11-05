import { register } from '../dist/pica.js'
import diversionUrl from './diversionUrl.js'

// globalThis.proxy = null

(async function () {
  const registerData = {
    email: 'hmacbsp',
    password: 'Cdy20041212',
    name: '拆家机器人',
    birthday: '1996-12-12T00:00:00.000Z',
    gender: 'bot',
    answer1: '1',
    answer2: '2',
    answer3: '3',
    question1: '1',
    question2: '2',
    question3: '3'
  }
    const data = await register(diversionUrl, registerData)
    console.log(data)
})()