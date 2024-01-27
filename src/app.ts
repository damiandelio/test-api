import { corsConfig } from '@common/config/cors.js'
import { helmetConfig } from '@common/config/helmet.js'
import { createApiServer } from '@common/http.js'
import { onConnectionHandler } from '@socket/onConnection.js'
import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import * as autoload from 'express-autoload-routes'
import helmet from 'helmet'
import { Server as HttpServer } from 'http'
import morgan from 'morgan'
import path from 'path'
import { Server, Socket } from 'socket.io'
import { fileURLToPath } from 'url'

/* This lines could be move it to another .ts file but for simplicity we decided to put on here.
 * There are important lines in typescript to know the real current path to the autoload routes system
 * Do not touch them if it is not neccessary.
 */
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export class ExpressApi {
  private app: Application | null
  private server: HttpServer | null
  private io: Server | null
  constructor() {
    this.app = null
    this.server = null
    this.io = null
  }

  public async init(
    port: number,
    callback: (() => void) | (() => Promise<void>)
  ) {
    this.server = createApiServer()
    this.io = new Server(this.server)
    this.app = express()

    this.bindSocketIoMiddleware()

    this.app.use(helmet(helmetConfig))
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.json())
    this.app.use(morgan('dev'))
    this.app.use(cors(corsConfig))
    console.info(
      '👷‍♂️ Auto loading routes based on src/routes folder structure...'
    )
    this.app.use(await autoload.loadRoutes(path.join(__dirname, 'routes')))
    console.info('✅ Routes loaded successfully.\n')

    this.initSockets()
    this.server.addListener('request', this.app)
    this.server.listen(port, callback)
  }

  private initSockets() {
    console.info('👷‍♂️ Initialization of socket services...')
    if (this.io) {
      this.io.on('connection', (socket: Socket) => {
        onConnectionHandler(this.io as Server, socket)
      })
    }
    console.info('✅ Socket services instantiated.\n')
  }

  private bindSocketIoMiddleware() {
    console.info('👷‍♂️ Creating socket instance...')
    this.app?.use(async (req: Request, res: Response, next: NextFunction) => {
      if (this.io instanceof Server) {
        req.io = this.io
      }
      next()
    })
    console.info('✅ Socket instance bounded to request api object.\n')
  }
}

export default ExpressApi
