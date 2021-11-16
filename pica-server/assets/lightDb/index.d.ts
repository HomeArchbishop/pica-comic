declare class LightDb {
  constructor (__dir: string, path: string)

  file: string
  dir: string

  set (key: string, newValue: any): Promise<any>
  get (key: string): Promise<any>
  delete (key: string): Promise<boolean>
}

export default LightDb
