// this error mw is for those request to pica
// official api sever - picaapi.picacomic.com.

import isJSON from "@stdlib/assert-is-json"
import { NextFunction, Request, Response } from "express"
import log from "../ts/log"

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
  try { JSON.parse(err.message) } catch { return next(err) }
  const errJson: any = JSON.parse(err.message)
  const errType: string = errJson.errType
  const errObj: any = errJson.errObj
  const errApiUrl: string = errJson.errApiUrl
  // judge err type.
  if (errType !== 'apiProxy') { return next(err) }
  // log.
  log.error('apiProxy', {
    code: errObj.code,
    proxyTo: errApiUrl,
    resData: errObj
  })
  // handle err.
  console.log(errObj, typeof errObj)
  if (typeof errObj === 'object') {
    res.status(errObj.code).json(errObj)
  } else {
    res.status(errObj.code).end(errObj) 
  }
  next(err)
}