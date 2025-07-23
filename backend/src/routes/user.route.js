import { Router } from "express";
import { loginUser, signupUser, uploadImage, verifyUser } from "../controllers/user.controller.js";
import multer from "multer";
import { storage } from "../utils/cloudinary.js";



const router = Router()

router.route('/signup').post(signupUser);
router.route('/login').post(loginUser);
router.route('/verify').post(verifyUser);


const upload = multer({storage});
router.route('/upload').post( upload.single('image'),uploadImage );

export default router;