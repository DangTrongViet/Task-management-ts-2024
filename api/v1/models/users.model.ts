import mongoose from "mongoose";

const userSchema=new mongoose.Schema(
    {
        fullName: String,
        email: String,
        password: String,
        token: String,
        phone: String,
        avatar: String,
        status: {
            type: String,
            default:"active"
        },
        deleted:{
            type: Boolean,
            default: false
        },
        deletedAt: Date,
        resetAt: Date
    },
    //để update các time tạo sp và sửa 
    {
        timestamps:true
        
    });



const User=mongoose.model("User",userSchema,"users");

export default User;