import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import {errorHandler} from '../utils/error.js';
export const signup = async (req,res,next)=>{
    const {username, email, password} = req.body;
    const hashedPassword = await bcryptjs.hash(password,10);
    const newUser = new User({username,email, password:hashedPassword});
    try{
        await newUser.save();
        res.status(201).json({message:"Signup success from the Frontend",newUser});
    }catch(error){
        /*
            res.status(500).json({message:"Signup failed",error:error.message})
            custom error handler
            next(errorHandler(501,"Something went wrong"))
        */
       next(error);
    }

}