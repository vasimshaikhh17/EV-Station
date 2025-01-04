import { ConnectDB } from "@/lib/config/db";
 import UserModel from "@/lib/models/User";
 import { NextResponse } from "next/server";
import {signinSchema, signupSchema} from '@/lib/middlewares/validator';
import { doHash, doHashValidation } from "@/lib/utils/hashing";
import jwt from 'jsonwebtoken'
import { serialize } from "cookie";
 const loadDB = async() =>{
    await ConnectDB();  
 }
 loadDB()
 const MAX_AGE = 60 * 60 * 24 * 30

 export async function POST(request) {
    const { email, password } = await request.json();
    try {
        const { error, value } = signinSchema.validate({ email, password });
        if (error) {
            return NextResponse
                .json({ success: false,message:error.details[0].message},{status:401}); 
        }
        const existingUser = await UserModel.findOne({email}).select('+password');
        if(!existingUser){
            return NextResponse
                .json({success:false,message:'User does not exists!'},{status:401});
        }
        const result = await doHashValidation(password,existingUser.password);

       if(!result){
        return NextResponse.json({success: false, message: 'Invalid credentials!'},{status:401})
       }
       const token = jwt.sign(
        {
            userId:existingUser._id,
            email:existingUser.email,
            verified:existingUser.is_verified
       },process.env.TOKEN_SECRET,
       {
        expiresIn:'8h'
       }       
    );
    const serialized = serialize('OutSiteJWT',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        sameSite:"strict",
        maxAge:MAX_AGE,
        path:'/',
        expires:new Date(Date.now() + 8 * 3600000)  
    })    
    console.log('existingUser: ', existingUser);

    return NextResponse.json({
        success: true,
        token,
        headers:{'Set-Cookie':serialized}, 
        message: 'Authenticated',
        user:{
            firstName:existingUser.firstName,
            lastName:existingUser.lastName,
            is_verified:existingUser.is_verified,
            phoneNumber:existingUser.phoneNumber
        } 
    },{ status: 200 })

    } catch (error) {
        console.error('Error in POST /api/auth/login', error);
        return NextResponse.json(
          { success: false, message: 'Internal Server Error' },
          { status: 500 }
        );
    }
 }