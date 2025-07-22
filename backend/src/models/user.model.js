import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        userName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        },
        role: {
            type: String,
            default: 'user'
        },
        otp: {
            type: Number
        },
        isActive: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

export const User = model( 'user', userSchema );