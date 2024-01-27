import { type NextFunction, type Request, type Response } from 'express'

export const testMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('Test Middleware')
  next()
}
