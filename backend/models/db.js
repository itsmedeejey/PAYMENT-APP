import dotenv from "dotenv";
dotenv.config();

import mongoose from 'mongoose';
import { number, union } from 'zod';
mongoose.connect("mongodb+srv://deejey:deejey081121@cluster0.3qtet.mongodb.net/paytm")
.then(()=>{console.log("connnected successfull")})
.catch((error)=>{console.log(error)})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique:false
    },
    username: {
        type:String,
        unique:true
    },
    password: {
        type:String,
        required:true,
        minLength: 6
    }
})
const accountSchema = new mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, 
        ref:"User",
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})
const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);

export {User,Account};