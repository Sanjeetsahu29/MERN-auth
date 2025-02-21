import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import {errorHandler} from '../utils/error.js';
export const signup = async (req,res,next)=>{
    const {username, email, password} = req.body;
    const existingUser = await User.findOne({ email});
    if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password,10);
    const newUser = new User({username,email, password:hashedPassword});
    try{
        await newUser.save();
        res.status(201).json({message:"Created account successfully"});
    }catch(error){
        /*
            res.status(500).json({message:"Signup failed",error:error.message})
            custom error handler
            next(errorHandler(501,"Something went wrong"))
        */
       next(error);
    }

}

export const signin = async(req,res,next)=>{
    const {email, password} = req.body;
    try{
        const validUser = await User.findOne({email}).select("+password");
        if(!validUser){
            res.status(404).json({message:"User not found"});
        }
        const isValidPassword = await bcryptjs.compare(password,validUser.password);
        if(!isValidPassword){
            res.status(400).json({message:"Invalid credentials"});
        }
        const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET);
        validUser.password = undefined; 
        res
            .cookie('access_token', token, {httpOnly:true, expires:new Date(Date.now()+3600000)}) //3600000 ms = 1 hour and Date.now() return current timestamp in ms
            .status(200)
            .json({message:"Signin success",validUser});

    }catch(error){
        next(error);
    }
}