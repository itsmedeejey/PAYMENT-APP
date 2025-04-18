import express, {Router}  from "express";
const userRouter =  express.Router()
import {z} from "zod";
import { User,Account } from "../models/db.js";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/userMiddleware.js";



const JWT_SECRET  = process.env.JWT_SECRET;



const signupSchema = z.object({
    name: z.string(),
    username: z.string(),
    password:z.string()
})

const signinSchema = z.object({
    username: z.string(),
    password:z.string()
})

const updateBody = z.object({
    name: z.string().optional(),
	password: z.string().optional(),
})

userRouter.post("/signup",async(req,res)=>{
    try{

        const body = req.body;
        const {success} = signupSchema.safeParse(req.body);
        if(!success){
           return res.json({
               msg:" invalid inputs"
           })
        }

       const user = await User.findOne({
           username: body.username
           })
       if(user){

           return res.json({
               msg:"user already exist"
           })
       }

       const dbUser = await User.create(body);
       const userId = dbUser._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

       res.json({
           msg:"user created succesfully"
       })
    }catch(err){
        console.error("Signup Error:", err); 
        res.status(411).json({err})
    }
});

userRouter.post("/signin", async (req, res)=>{
    try{
    const {success} = signinSchema.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            msg:"invalid inputs"
        })
    }
    const existingUser = await User.findOne({
        username: req.body.username
    })

    if(!existingUser){
      return  res.status(404).json({msg:"user not found"}) 
    }
    if(existingUser.password == req.body.password){
        const token = jwt.sign({userId:existingUser._id},JWT_SECRET)
        res.status(201).json({msg:"user signed in successfully",token})
    }else{
      return  res.status(401).json({msg:"password is incorrect"})
    }
    }catch(err){
       return res.status(411).json({msg:"something went wrong",err})
    }   
})

userRouter.put("/",authMiddleware,async(req,res)=>{
    try{
        const { success } = updateBody.safeParse(req.body)
        if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }
        await User.updateOne({ _id: req.userId }, req.body);
        res.status(201).json({msg:"updated successfully"})

    }catch(err){
        res.json({err})
    }
})

userRouter.get("/bulk",async(req,res)=>{

    try {
        const filter = req.query.filter || "";
        const users = await User.find({
        name:{$regex: filter,$options:"i"} }) 
     
        res.json({
            users: users.map(user => ({
                username: user.username,
                name: user.name,
                _id: user._id
            }))
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
    
    
   })


export default userRouter;

