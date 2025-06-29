import express from 'express'

import { register, login } from "../controllers/userController.js"
import authMiddleware from '../middleware/authMiddleware.js'
import { addHabit, deleteHabit, editHabits, getHabits, Markcompleted } from '../controllers/habitController.js'
import userModel from '../models/userModel.js'

const userRouter = express.Router()

userRouter.post("/register", register)
userRouter.post("/login", login)

userRouter.post('/add-habits', authMiddleware, addHabit)
userRouter.delete('/habits/:id', deleteHabit)
userRouter.get('/habits', authMiddleware, getHabits)
userRouter.put('/habits/:id', authMiddleware, editHabits)
userRouter.put('/habits/completed/:id', authMiddleware, Markcompleted )


export default userRouter