
import {User} from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { generateToken } from "../utils/token.js";
export async function signup(req, res) {
    const { username, email, password } = req.body;
  
    // Trim and normalize inputs
    const trimmedUsername = username?.trim();
    const normalizedEmail = email?.trim().toLowerCase();
  
    // Field existence validation
    if (!trimmedUsername || !normalizedEmail || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
  
    // Username validation: Minimum 3 characters, alphanumeric only
    const usernameregex = /^[a-zA-Z0-9]{3,}$/;
    if (!usernameregex.test(trimmedUsername)) {
      return res.status(400).json({
        success: false,
        message: "Username must be at least 3 characters long and contain only letters and numbers",
      });
    }
  
    // Email validation
    const emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/;
    if (!emailregex.test(normalizedEmail)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }
  
    // Password validation: Minimum 8 characters, at least 1 uppercase, 1 lowercase, 1 number, and 1 special character
    const passwordregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordregex.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character",
      });
    }

    const salt = await bcryptjs.genSalt(10)
    const hashedpassword = await bcryptjs.hash(password,salt);
  
    // Proceed with signup logic
    try {
      // Check if email already exists
      const existingEmail = await User.findOne({ email: normalizedEmail });
      if (existingEmail ) {
        return res.status(400).json({ success: false, message: "Email already in use" });
      }
      const existingUser = await User.findOne({ username: trimmedUsername });
      if (existingUser ) {
        return res.status(400).json({ success: false, message: "username already in use" });
      }


      
    const pic = ["https://drive.google.com/file/d/15pTwA9SJLl9s_2ESmwgLVG61sN1ccYNt/view?usp=sharing","https://drive.google.com/file/d/1q7YulUUHGeRwwQehcr_COXqvI-Vkz2Dg/view?usp=sharing","https://drive.google.com/file/d/1z9hHBmG7kyDlbsWg--bEQtYuW8uSYkCE/view?usp=sharing"]
    const image = pic[Math.floor(Math.random() *pic.length)]
    const newUser =  new User({
        username: trimmedUsername,
        email: normalizedEmail,
        password:hashedpassword,
        image
    })
    generateToken(newUser,res)
    await newUser.save()
return res.status(201).json({
      success: true,
      message:"User saved successfully",
      user:{
        username: newUser.username, 
        email   : newUser.email, 
        image : newUser.image
      }  
    })
    } catch (error) {
      console.error("Signup Error:", error.message);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }

  }
  export async function login(req, res) {
    const {email,password} = req.body

    if (!email || !password) return res.status(403).json({ success: false, message: "all fields are required" });

    const user = await User.findOne({ email: email})
    if(!user) return res.status(400).json({ success: false, message: "no user found" });
    const passwordCheck = await bcryptjs.compare( password,user.password)
    if (!passwordCheck) return res.status(400).json({success: false, message: "password incorrect" });
    generateToken(user,res)
    res.status(200).json({ success: true, message:"user logged in"})
}
export async function logout(req, res) {
  res.clearCookie("jwt-netflix")
  res.send("logged out")
}


