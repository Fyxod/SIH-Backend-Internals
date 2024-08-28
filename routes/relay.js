import express from 'express';
import dotenv from 'dotenv';
import User from '../models/user.js';
import { checkAuth } from '../middlewares/auth.js';
import { fileURLToPath } from "url";
import { dirname } from "path";
import mqtt from 'mqtt';
import { publishMessage } from '../db/mqtt.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

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
        res.sendFile('C:/Users/parth/Desktop/blackSwan/main/public/relay.html');
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
        publishMessage("topic", `${req.body.relay}${req.body.value ? '1' : '0'}`, user._id);
        await user.save();
        return res.json(user.settings);
    });

export default router;