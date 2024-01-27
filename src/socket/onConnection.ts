import testHandlers from '@socket/services/test.handlers.js'
import { Server, Socket } from 'socket.io'

export const onConnectionHandler = (io: Server, socket: Socket) => {
  // Here we subscribes all the socket handlers
  testHandlers(io, socket)
  console.info('User connected')
}
