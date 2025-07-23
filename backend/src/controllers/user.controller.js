import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer'

const signupUser = async(req,res)=>{
    try {
        const { userName, email, password, imageUrl } = req.body;
        
        if( !userName || !email || !password || !imageUrl ){
            return res.status(400).json({
                message: 'All fields are required'
            })
        }

        const existUser = await User.findOne({email});
        
        if (existUser) {
          return res.status(409).json({
            message: "User with email already exists",
          });
        }


        const otp = Math.floor(Math.random() * 9000) + 1000;
        
        // hash password
        const hashPass = bcrypt.hashSync(password, 10);
        
        // sent the object in the database
        const objToSend = {
            userName,
            email,
            password: hashPass,
            imageUrl,
            otp
        };

        const createUser = await User.create(objToSend);
        
        const user = await User.findById(createUser._id).select('-password -otp')
        console.log(user)
        let token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOption = {
        from: process.env.EMAIL,
        to: email,
        subject: "Your OTP Code",
        html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
          <h2 style="color: #333;">Welcome to Our Website</h2>
          <p>Hi there,</p>
          <p>Thank you for registering. Please use the following One-Time Password (OTP) to verify your email address:</p>
          <h3 style="color: #0056b3;">${otp}</h3>
          <p>This OTP is valid for 10 minutes. Please do not share it with anyone.</p>
          <br>
          <p>Regards,<br>Team</p>
        </div>
      `,
      };

      await transporter.sendMail(mailOption);

        // Signup user
        return res.status(200).json({
            message: 'User registered successfully',
        })

    } catch (error) {
        return res.status(500).json({
            message: 'An error occur while registering user',
            error : error.message,
        })
    }
}

const loginUser = async (req, res)=>{
  try {
    const { email, password } = req.body;

    if( !email || !password ){
      return res.status(401).json({
        message: 'Required field is missing'
      })
    }

    const existUser = await User.findOne({email});

    if(!existUser){
      return res.status(400).json({
        message: 'Invalid credentials'
      })
    }

    if(!existUser.isActive){
      return res.status(400).json({
        message: 'Please verify your email'
      })
    }

    const checkPass = await bcrypt.compare(password, existUser.password);

    if(!checkPass){
      return res.status(400).json({
        message: 'Invalid credentials'
      })
    }

    let token = jwt.sign(
    { id: existUser._id },
    process.env.JWT_SECRET, 
    { expiresIn: "1h" }
    );

    
    const user = await User.findById(existUser._id).select("-password -otp")

    return res.status(201).json({
      message: 'User login successfully',
      token,
      user
    })

  } catch (error) {
    return res.status(500).json({
      message: 'An error occur while login user',
      error: error.message
    })
  }
}

const verifyUser = async (req, res)=>{

  try {
    const { email, otp } = req.body;
    const existUser = await User.findOne({email});
    
    if(existUser.otp !== otp){
      return res.status(401).json({
        message: 'OTP not match',
      })
    }

    existUser.isActive = true;
    await existUser.save();

    return res.status(201).json({
      message: 'Email verified successfully'
    })

  } catch (error) {
    return res.status(600).json({
      message: 'An error occur while verifying user',
      error: error.message
    })
  }
}

const uploadImage = async(req,res)=>{
    try {
      return res.status(201).json({
        imageUrl: req.file.path,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Image not upload",
        error: error.message,
      });
    }
}

export { signupUser, uploadImage, loginUser, verifyUser }