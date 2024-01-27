import { Request, Response } from 'express'
import { RouteMetadata } from 'express-autoload-routes'

export const metadata: RouteMetadata = {
  middlewares: {
    before: [],
    after: []
  }
}

export default async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({
    success: true,
    id: req.params.id
  })
}
