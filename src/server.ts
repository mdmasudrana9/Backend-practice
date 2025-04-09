import app from './app'
import mongoose from 'mongoose'
import config from './app/config'
import { Server } from 'http'
import seedSuperAdmin from './app/DB'

let server: Server
async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    seedSuperAdmin()
    server = app.listen(config.port, () => {
      console.log(`App listening on port ${config.port}`)
    })
  } catch (error) {
    console.error(error)
  }
}

main()

process.on('unhandledRejection', () => {
  console.log(`unhandledRejection is detection.... `)
  if (server) {
    server.close(() => {
      process.exit(1)
    })
  }
  process.exit(1)
})

process.on('uncaughtException', () => {
  console.log(`👹uncaughtException is detection.... `)
  process.exit(1)
})
