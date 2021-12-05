export default async function chinesize (errObjOrigin: any, errCode: number): Promise<any> {
  // if typeof errObjOrigin is object, the var should be like below:
  // {
  //   code: 401
  //   error: "1005"
  //   message: "unauthorized"
  // }
  if (typeof errObjOrigin !== 'object') {
    return { code: errCode, chineseDetail: errObjOrigin.toString() }
  }
  const chineseDetail = errObjOrigin.message
  return {
    ...errObjOrigin,
    chineseDetail
  }
}