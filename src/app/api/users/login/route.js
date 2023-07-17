import {connectDB} from "@/db/db";
const { NextResponse } = require("next/server");
import User from '@/models/User'
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken";

connectDB();


export async function POST(request){
      try {
        const reqBody= await request.json();
        const {email,password}=reqBody;
        console.log(reqBody);
         

        const user = await User.findOne({email});

        if(!user){
            return NextResponse.json(
                {error:"User not exist "},{status:400})
        }
         
        const validPassword=await bcryptjs.compare(password,user.password);
        if(!validPassword){
            return NextResponse.json({error:"Usernot found"},{status:400});
        }
        const tokendata={
            userid:user._id,
            name:user.name,
            email:user.email,
        }
        const token =await jwt.sign(tokendata,process.env.SECRET_KEY,{expiresIn:"1d"});
        const response=NextResponse.json({
            success:true,
            message:"Login Successfully",
        })
        response.cookies.set("token",token,{
            httpOnly:true,
        })
        return response;

        

        
      } catch (error) {
        return NextResponse.json({
            success:false,
            message:"error is found",
            


        });
        
      }

}