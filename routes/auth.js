import express from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import { setUser } from '../utils/jwtfuncs.js';
import { checkAuth } from '../middlewares/auth.js';
import { loginSchema, registerSchema } from '../utils/zodSchemas.js';
import { fileURLToPath } from "url";
import path from "path";
import { connectMqtt } from '../db/mqtt.js';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// import sendMail from '../utils/mail.js';

dotenv.config();
const router = express.Router();

router.route('/register')
    .get((req, res) => {
        const filePath = path.join(__dirname, '../public/register.html');
        res.sendFile(filePath);
    })
    .post(async (req, res) => {
        try {
            const { email, password } = registerSchema.parse(req.body);
            const user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({
                    status: 'error',
                    message: 'User already exists'
                });
            }
            const hash = await bcrypt.hash(password, 12);
            const newUser = new User({ email, password: hash });
            await newUser.save();
            return res.status(201).json({
                status: 'success',
                message: 'User registered successfully'
            })
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.errors
            })
        }
    });

router.route('/login')
    .get(checkAuth, (req, res) => {
        if (req.user) {
            return res.redirect('/relay');
        }
        const filePath = path.join(__dirname, '../public/login.html');
        res.sendFile(filePath);
    })
    .post(async (req, res) => {
        try {
            const { email, password } = loginSchema.parse(req.body);
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Invalid credentials'
                });
            }
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Invalid credentials'
                });
            }
            const token = setUser({ _id: user._id });
            res.cookie('token', token, { httpOnly: true, secure: (process.env.NODE_ENV || 'dev') === 'prod' });
            connectMqtt(user._id);
            return res.status(200).json({
                status: 'success',
                message: 'Logged in successfully',
                data:{
                    token
                }
            });
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.errors
            });
        }
    });

// router.get('/logout', checkAuth, (req, res) => {
//     res.clearCookie('token');
//     return res.json({ message: 'Logged out' });
// });

export default router;