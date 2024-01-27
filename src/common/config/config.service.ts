import dotenv from 'dotenv'
import path from 'path'
import process from 'process'
import z from 'zod'

enum Environments {
  development = 'dev',
  production = 'prod',
  test = 'test'
}

const environment = process.env.NODE_ENV as string
const rootPath = process.cwd()

switch (environment) {
  case Environments.development:
    dotenv.config({ path: path.join(rootPath, '.env') })
    break
  case Environments.production:
    dotenv.config({ path: path.join(rootPath, '.env.prod') })
    break
  case Environments.test:
    dotenv.config({ path: path.join(rootPath, '.env.test') })
    break
  default:
    dotenv.config({ path: path.join(rootPath, '.env.prod') })
    break
}

const envSchema = z.object({
  PORT: z
    .string()
    .default('3000')
    .transform((port) => +port),
  NODE_ENV: z
    .enum([
      Environments.development,
      Environments.production,
      Environments.test
    ])
    .default(Environments.development)
})

const envServer = envSchema.safeParse({
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV
})

if (!envServer.success) {
  console.error(envServer.error.issues)
  throw new Error('There is an error with the server environment variables')
}

export const configService = envServer.data
