import asyncHandler from 'express-async-handler';
import { ApiError } from '../utils/ApiError.js';
import crypto from 'crypto';

export const verifyPayment = asyncHandler(
    async (req, res, next) => {
        const { payment_id, order_id,signature } = req.body;
        
        try {
            const hmac = crypto.createHmac('sha256', process.env.razorpay_KeySecret); // 'key' is your secret key
            hmac.update(order_id + "|" + payment_id);
            const generated_signature = hmac.digest('hex');
            
            // generated_signature = hmac_sha256(order_id + "|" + payment_id, process.env.razorpay_KeySecret);
    
            if (generated_signature === signature) {
                req.body.payment_id=payment_id;
            }else{
                req.body.payment_id=null;
            }
        } catch (error) {
            throw new ApiError(500,error.message);
        }
        next();
    }
)
