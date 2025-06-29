import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB  from './config/mongoDB.js'
import userRouter from './routes/userRoutes.js'

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(cors())

connectDB()

app.use('/api/user', userRouter)

app.listen(PORT, () => {
    console.log(`server connected to port : ${PORT}`)
})

