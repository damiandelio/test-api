import { corsConfig } from '@common/config/cors.js'
import { Server as HttpServer } from 'http'
import { Server } from 'socket.io'

export function setupSocket(server: HttpServer) {
  const io = new Server(server, {
    cors: corsConfig
  })

  return io
}
