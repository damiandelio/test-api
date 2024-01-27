import { CorsOptions } from 'cors'

export const corsConfig: CorsOptions = {
  credentials: true,
  methods: ['*'],
  origin: ['*']
}
