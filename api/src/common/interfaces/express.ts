import type {
  ParamsDictionary,
  Request,
  Response,
} from 'express-serve-static-core'
import type QueryString from 'qs'

export interface IExpressVariable {
  req: Request<
    ParamsDictionary,
    any,
    any,
    QueryString.ParsedQs,
    Record<string, any>
  >
  res: Response<any, Record<string, any>, number>
}
