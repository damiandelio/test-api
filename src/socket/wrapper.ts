import { NextFunction } from 'express'
import { Socket } from 'socket.io'

export const wrapMiddleware =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (middleware: any) => (socket: Socket, next: NextFunction) =>
    middleware(socket.request, {}, next)
