import { Server, createServer } from 'http'

export function createApiServer() {
  const server: Server = createServer()
  return server
}
