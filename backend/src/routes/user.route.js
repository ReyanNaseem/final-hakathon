import { Router } from "express";
import { loginUser, signupUser, uploadImage, verifyUser } from "../controllers/user.controller.js";
import multer from "multer";
import { authMiddleware } from "../middlewears/auth.middlewear.js";
import { storage } from "../utils/cloudinary.js";
import { addMember, deleteMember, getAllMember, getMember, updateMember } from "../controllers/member.controller.js";



const router = Router()

router.route('/signup').post(signupUser);
router.route('/login').post(loginUser);
router.route('/verify').post(verifyUser);


const upload = multer({storage});
router.route('/upload').post( upload.single('image'),uploadImage );


router.route('/add-member').post( authMiddleware, addMember );
router.route('/get-member').get( authMiddleware, getAllMember );
router.route('/get-memberdetails:id').get( authMiddleware, getMember );
router.route('/delete-member:id').delete( authMiddleware, deleteMember );
router.route('/update-member:id').put( authMiddleware, updateMember );

export default router;