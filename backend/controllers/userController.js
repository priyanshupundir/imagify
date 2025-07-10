import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Razorpay from 'razorpay'

const registerUser = async (req,res) =>{
    try{
        const{name,email, password} = req.body;

        if(!name || !email || !password){
            return res.json({success:false, message:'Missing Details'})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }
        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

        res.json({success: true, token, user: {name: user.name}})

    }catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

const loginUser = async (req,res) => {
    try{
        const{email,password} = req.body;
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false, message:'User does not exist'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(isMatch){
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

            res.json({success: true, token, user: {name: user.name}})
        }else{
            return res.json({success:false, message:'Invalid credentials'})
        }
    }catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

const userCredits = async (req, res) => {
    try{
        const userId = req.userId;

        const user = await userModel.findById(userId)
        if(!user){
            return res.json({
                success: false,
                message:"user not found"
            });
        }
        res.json({success: true, credits: user.creditBalance, user:{name: user.name}})

    }catch(error){
        console.log(error.message)
        res.json({success:false, message: error.message})
    }
}

const RazorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const paymentRazorPay = async(req, res) => {
    try{
        const {userId, planId} = req.body

        const userData = await userModel.findById(userId)
        if(!userId || !planId){
            return res.json({
                success: false, 
                message: 'Missing Details'
            })
        }

        let credits, plan, amount, date

        switch(planId){
            case 'Basic':
                plan = 'Basic'
                credits = 100
                amount = 10
                break;

            case 'Advanced':
                plan = 'Advanced'
                credits = 500
                amount = 50
                break;

            case 'Business':
                plan = 'Business'
                credits = 5000
                amount = 250
                break;
            default:
                return res.json({
                    success:false, 
                    message: 'Plan not found'
                });
        }
        
        date = Date.now();
        const transactionData = {
            userId, plan, amount, credits, date
        }

        // ✅ FIXED: Proper Razorpay order creation
        const options = {
            amount: amount * 100, // Amount in paise
            currency: process.env.CURRENCY || 'INR',
            receipt: `receipt_${Date.now()}` // ✅ FIXED: Use proper receipt ID
        }

        const order = await RazorpayInstance.orders.create(options)
        
        // ✅ FIXED: Proper response structure
        res.json({
            success: true, 
            order,
            transactionData
        })

    }catch(error){
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

export {registerUser, loginUser, userCredits, paymentRazorPay}