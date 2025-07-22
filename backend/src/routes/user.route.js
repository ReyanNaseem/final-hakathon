import { Router } from "express";
import { signupUser, uploadImage } from "../controllers/user.controller.js";
import multer from "multer";
import { storage } from "../utils/cloudinary.js";



const router = Router()

router.route('/signup').post(signupUser)


const upload = multer({storage});
router.route('/upload').post( upload.single('image'),uploadImage );

export default router;