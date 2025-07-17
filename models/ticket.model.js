import mongoose, { mongo } from "mongoose";

const ticketSchema=new mongoose.Schema(
    {
        user_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        service_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Service",
            required:true
        },
        count:{
            type:Number,
            required:true,
            default:1
        },
        date:{
            type:Date,
            required:true,
            default : Date.now
        },
        payment_id:{
            type:String,
            required:true
        }

    },
    {
        timestamps:true
    }
)

export const Ticket=mongoose.model('Ticket',ticketSchema);