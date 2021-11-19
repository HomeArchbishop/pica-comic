// this error mw is for those request to pica
// official api sever - picaapi.picacomic.com.

import { NextFunction, Request, Response } from "express"
import log from "../ts/log"

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
  const errJson: any = JSON.parse(err.message)
  const errType: string = errJson.errType
  const errObj: any = errJson.errObj
  const errApiUrl: string = errJson.errApiUrl
  // judge err type.
  if (errType !== 'apiProxy') { next(err) }
  // log.
  log.error('apiProxy', {
    code: errObj.code,
    proxyTo: errApiUrl,
    resData: errObj
  })
  // handle err.
  res.status(errObj.code).json(errObj)
  next(err)
}