import { ConnectDB } from "@/lib/config/db";
 import UserModel from "@/lib/models/User";
 import { NextResponse } from "next/server";
import {signupSchema} from '@/lib/middlewares/validator';
import { doHash } from "@/lib/utils/hashing";

 const loadDB = async() =>{
    await ConnectDB();  
 }
 loadDB()

 export async function POST(request) {
    const {firstName,lastName,phoneNumber,gender,email,password} = await request.json();   
    try {
        const { error, value } = signupSchema.validate({ email, password });
        if (error) {
            return NextResponse
                .json({ success: false,message:'password not Strong' },{status:401}); 
        }
        const existingUser = await UserModel.findOne({email})   ;
        if(existingUser){
            return NextResponse
                // .status(401)
                .json({success:false,message:'User already exists!'});
        }
        const hashedPassword = await doHash(password,12);   
        const newUser = new UserModel({
            firstName,lastName,phoneNumber,gender,email,password:hashedPassword
        })
        const result = await newUser.save();
        result.password = undefined;
        return NextResponse.
        // status(201).
        json({
            success: true,
            message: 'Your account has been created successfully',
            result,
        }, { status: 201 })     
    } catch (error) {
        console.error('Error in POST /api/auth/register:', error);
        return NextResponse.json(
          { success: false, message: 'Internal Server Error' },
          { status: 500 }
        );
    }
 }