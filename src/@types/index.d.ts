import { Server, Socket } from 'socket.io'

type SocketHandlersHub = (io: Server, socket: Socket) => void
