import Razorpay from 'razorpay';


export const instance = new Razorpay({
    key_id: process.env.razorpay_ApiKey,
    key_secret: process.env.razorpayKeySecret,
});
