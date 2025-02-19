import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

app.listen(3000,async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected');
    }catch(error){
        console.log('Error: ', error.message);
    }
    console.log('Server is running on port 3000');
})