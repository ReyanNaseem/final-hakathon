import express from 'express';
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

// routes
import router from './routes/user.route.js';

app.use("/api/v1/users", router)

export {app};