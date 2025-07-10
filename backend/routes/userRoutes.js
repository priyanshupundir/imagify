import express from 'express'
import {registerUser, loginUser, userCredits, paymentRazorPay} from '../controllers/userController.js'
import userAuth from '../middlewears/auth.js'

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/credits',userAuth, userCredits)
userRouter.get('/pay-razor',userAuth, paymentRazorPay)

export default userRouter

//http://localhost:4000/api/user/register
//http://localhost:4000/api/user/login