import asyncHandler from 'express-async-handler';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import { Ticket } from '../models/ticket.model.js';
import { instance } from '../utils/razorpayConfig.js';
import { Service } from '../models/services.model.js';

export const createOrder = asyncHandler(
    async (req, res) => {
        const { service_id, count } = req.body;
        if (service_id.trim() === '' && count === 0) {
            throw new ApiError(401, "all fields are required");
        }
        const service = Service.findById(service_id);
        if (!service) {
            throw new ApiError(500, "service not found");
        }
        if (service.seatsAvailable === 0) {
            return res.status(200).json(
                {
                    message: "Sold Out"
                }
            )
        }
        const orderDetail = {
            amount: service.price * count * 100,
            currency: 'INR',
            receipt: "receipt_".Math.round(Math.random() * 1E9)
        }
        try {
            instance.orders.create(orderDetail, (err, order) => {
                if (err) {
                    return res.status(500).json(
                        {
                            message: "order not created"
                        }
                    )
                }else{
                    return res.status(200).json(order);
                }
            })
        } catch (error) {
            return res.status(500).json(
                {
                    message: "order not created"
                }
            )
        }
    }
)

export const bookTicket = asyncHandler(
    async (req, res) => {
        const { user_id, service_id, count, payment_id } = req.body;
        if (user_id.trim() === '' && service_id.trim() === '' && count.trim() === '') {
            throw new ApiError(401, "all fields are required");
        }
        if(!payment_id){
            return res.status(401,"Payment failed");
        }
        const user = User.findById(user_id);
        if (!user) {
            throw new ApiError(401, "User not registered");
        }
        const ticket = Ticket.create(
            {
                user_id,
                service_id,
                count,
                payment_id
            }
        )
        if (!ticket) {
            throw new ApiError(500, "ticket not booked");
        }
        res.status(200).json(
            {
                message: "ticket booked Successfully"
            }
        )
    }
)
