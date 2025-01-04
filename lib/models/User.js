import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName:{type:String,required:true,trim:true},
    lastName:{type:String,required:true,trim:true},
    phoneNumber:{type:String,required:true,trim:true},
    email:{type:String,required:true,trim:true,unique:true,lowercase:true}, 
    password:{type:String,required:true,trim:true}, 
    is_verified:{type:Boolean,default:false},  
    roles:{type:Number,default:0},
    payment_history:[],
    booking_history:[],
    total_charging_duration:{type:String}
},{timestamps:true})

const UserModel = mongoose.models.user || mongoose.model("user",userSchema)
export default UserModel