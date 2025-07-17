import asyncHandler from 'express-async-handler';
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';

export const register =asyncHandler(
    async (req,res)=>{
        const {email,password}=req.body;
        if(email.trim()==='' && password.trim()===''){
            throw new ApiError(401,'all fields are required');
        }
        const user=User.findOne({email});
        if(user){
            throw new ApiError(401,'User already regustered');
        }
        const newUser=User.create(
            {
                email,
                password
            }
        )
        if(!newUser){
            throw new ApiError(500,'User not Registered');
        }
        res.status(200).json(
            {
                message : "User registered Sucessfully"
            }
        )
    }
)

export const login=asyncHandler(
    async (req,res)=>{
        const {email,password}=req.body;
        if(email.trim()==='' && password.trim()===''){
            throw new ApiError(401,"All feilds Are Required");
        }
        const user=User.findOne({email});
        if(!user){
            throw new ApiError(404,"User not Registered");
        }
        if(!user.isPasswordCorrect(password)){
            throw new ApiError(401,"you enter wrong credentials");
        }
        res.status(200).json(
            {
                message:"user logged in Successfully"
            }
        )
    }
)