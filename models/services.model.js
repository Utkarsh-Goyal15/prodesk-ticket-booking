import mongoose from "mongoose";

const serviceSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        type:{
            type:String,
            required:true
        },
        location:{
            type:String,
            required:true
        },
        date:{
            type:Date,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        seats:{
            type:Number,
            required:true
        },
        seatsAvailable:{
            type:Number,
            min:0
        }
    },
    {
        timestamps:true
    }
)

export const Service=mongoose.model('Service',serviceSchema);