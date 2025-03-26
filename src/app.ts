import express, { Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import notFound from './app/middleware/notFound'
import router from './app/routes'
import cookieParser from 'cookie-parser'

const app = express()

//parser
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: 'http://localhost:3000' }))

//application routes

app.use('/api/v1', router)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World! hiiiii')
})

// Middleware usage
app.use(globalErrorHandler as any)
app.use(notFound as any)

export default app
