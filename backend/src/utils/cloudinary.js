import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config(); // ✅ Make sure .env is loaded here too

import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'final_hackathon',
      allowed_type: ['jpg','png'],
    },
  });

export {
    cloudinary,
    storage
}