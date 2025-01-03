import { envVars } from "../config/envVars.js";
import jwt from "jsonwebtoken"

export const generateToken = (newUser,res)=>{

    const token = jwt.sign({id:newUser._id,email:newUser.email},envVars.JWT_SECRET,{expiresIn:"15d"})

    res.cookie("jwt-netflix", token,{
        maxAge:15000000,
        httpOnly:true,
        sameSite: "strict",
        secure : envVars.NODE_ENV !== "development",

    })
    return token
}