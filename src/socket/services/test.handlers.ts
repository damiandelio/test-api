import { SocketHandlersHub } from '@src/@types'
import { Server, Socket } from 'socket.io'

const socketHub: SocketHandlersHub = (io: Server, socket: Socket) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const testingFunction1 = function (payload: any) {
    socket.emit('message', 'from testingFunction1 handler')
    console.log(payload)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const testingFunction2 = function (payload: any) {
    socket.emit('message', 'from testingFunction2 handler')
    console.log(payload)
  }

  socket.on('testingFunction1', testingFunction1)
  socket.on('testingFunction2', testingFunction2)
}

export default socketHub
