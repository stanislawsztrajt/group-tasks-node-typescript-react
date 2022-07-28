import express, { Request, Response } from 'express'
import dotenv from "dotenv"
import { connectToMongoDB } from './config/database'

dotenv.config()
connectToMongoDB()
const app = express()

app.get('/', (req: Request, res: Response) => {
  console.log('home page')
  res.send('its home page')
})

app.listen(8000, () => {
  console.log('listening on port 8000')
})