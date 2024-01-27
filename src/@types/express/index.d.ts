import { Server } from 'socket.io'

declare global {
  declare namespace Express {
    export interface Request {
      // Here you can declare all your properies you need to add to the request object in express
      io: Server
    }
  }
}
