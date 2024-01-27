import { HelmetOptions } from 'helmet'

export const helmetConfig: HelmetOptions = {
  noSniff: true,
  frameguard: true,
  xPoweredBy: false
}
