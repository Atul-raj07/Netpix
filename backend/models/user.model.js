import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type : 'string',
        required: true,
        unique : true
    },
    email : {
        type : 'string',
        required: true,
        unique : true
    },
    password : {
        type : 'string',
        required: true,


    },
    image:{
        type : 'string',
        default: '',

    },
    searchHistory :{
        type : 'array',
        default :[]
    }
})

export const User = mongoose.model('User', userSchema)