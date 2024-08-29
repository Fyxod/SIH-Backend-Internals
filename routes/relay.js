import express from 'express';
import dotenv from 'dotenv';
import User from '../models/user.js';
import { checkAuth } from '../middlewares/auth.js';
import { fileURLToPath } from "url";
import path from "path";
import mqtt from 'mqtt';
import { publishMessage, subscribeToTopic } from '../db/mqtt.js';


const __dirname = path.dirname(fileURLToPath(import.meta.url));

// import sendMail from '../utils/mail.js';

dotenv.config();
const router = express.Router();

router.route('/relay')
    .get(checkAuth, async (req, res) => {
        if (!req.user) {
            return res.redirect('/login');
        }
        const user = await User.findById(req.user._id);
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // return res.json(user.settings);
        const filePath = path.join(__dirname, '../public/relay.html');
        res.sendFile(filePath);
    })
    .post(checkAuth, async (req, res) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const user = await User.findById(req.user._id);
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(user.settings);
    })
    .put(checkAuth, async (req, res) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const user = await User.findById(req.user._id);
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(req.body.relay, req.body.value);
        user.settings[`relay${req.body.relay}`] = req.body.value;
        await publishMessage("test/relay", `${req.body.relay}${req.body.value ? '1' : '0'}`, user._id);
        const data = await subscribeToTopic("test/relay", user._id);
        if(data == 'OK') {
            await user.save();
            return res.json({ message: 'ok' });
        }
        return res.json({ message: 'not ok' }); //should i send ok or user.settings, ask devansh
    });

export default router;