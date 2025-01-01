import mongoose from "mongoose"

export const ConnectDB = async () =>{
    mongoose.connect("mongodb+srv://vasimshaikhh17:NMN7z4e426UlaXYZ@cluster0.3qcsg.mongodb.net/test-app")
    console.log("DB connected")
}