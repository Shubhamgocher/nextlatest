import {connectDB} from "@/db/db";
const { NextResponse } = require("next/server");
import User from '@/models/User'
import bcryptjs from 'bcryptjs'

connectDB();


export async function POST(request){
      try {
        const reqBody= await request.json();
        const {name,email,password}=reqBody;
        console.log(reqBody);
         

        const user = await User.findOne({email});

        if(user){
            return NextResponse.json(
                {error:"User already exist"},{status:400})
        }
        const salt= await bcryptjs.genSalt(10)
        const hashPassword=await bcryptjs.hash(password,salt);

        const newUser = new User({
            name,
            email,
            password:hashPassword,

        })

        const savedUser = await newUser.save();
        console.log(savedUser);
        return NextResponse.json({
            success:true,
            message:"User Sign up Successfully",
            savedUser,
        });
      } catch (error) {
        return NextResponse.json({
            success:false,
            message:"error is found",
            


        });
        
      }

}