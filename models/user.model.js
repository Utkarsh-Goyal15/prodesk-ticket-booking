import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema=new mongoose.Schema(
        {
            name:{
                type:String,
                required:true
            },
            email:{
                type:String,
                required:true,
                unique:true
            },
            mobile:{
                type:Number,
                required:true,
                unique:true
            },
            password:{
                type:String,
                required:true
            }
        },
        {
            timestamps:true
        }
    )
userSchema.pre('save',async (next)=>{
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,10);
    }
    next();
})

userSchema.methods.isPasswordCorrect=async (password)=>{
    return await bcrypt.compare(password,this.password);
}
export const User=mongoose.model(
    'User',
    userSchema
)