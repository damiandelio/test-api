import { configService } from '@common/config/config.service.js'
import ExpressApi from './app.js'

const application = new ExpressApi()

application.init(configService.PORT, () => {
  console.log(`🚀 Server up and running on port ${configService.PORT}`)
})
