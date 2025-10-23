import {Schema, model} from 'mongoose';

const memberschema = new Schema(
    {   
        user:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        name:{
            type: String,
            required:true
        },
        age:{
            type: Number,
            required: true
        },
        relation:{
            type: String,
            required: true
        },
        gender:{
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Member = model('Member', memberschema);