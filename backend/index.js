import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import { stat } from 'fs';
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.json({message:"Hello from the Backend"})
})
app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);

//middleware for error Handling
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).send({
        success:false,
        message,
        statusCode
    })
})

app.listen(3000,async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected');
    }catch(error){
        console.log('Error: ', error.message);
    }
    console.log('Server is running on port 3000');
})

