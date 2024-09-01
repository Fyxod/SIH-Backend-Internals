import express from 'express';
import dotenv from 'dotenv';
import User from '../models/user.js';
import { checkAuth } from '../middlewares/auth.js';
import { fileURLToPath } from "url";
import path from "path";
import { publishMessage, subscribeToTopic,  } from '../db/mqtt.js';


const __dirname = path.dirname(fileURLToPath(import.meta.url));

// import sendMail from '../utils/mail.js';

dotenv.config();
const router = express.Router();

router.route('/relay')
    .get(/*checkAuth,*/ async (req, res) => {
        // if (!req.user) {
        //     return res.redirect('/login');
        // }
        const user = await User.findOne();
        if (!user) {
            return res.status(404).json({
                status: 'error',
                errorCode: 'USER_NOT_FOUND',
                message: 'User not found'
            })
        }
        // return res.json(user.settings);
        const filePath = path.join(__dirname, '../public/relay.html');
        res.sendFile(filePath);
    })
    .post(/*checkAuth,*/ async (req, res) => {
        // if (!req.user) {
        //     return res.status(401).json({ message: 'Unauthorized' });
        // }
        const user = await User.findOne();
        if (!user) {
            return res.status(404).json({
                status: 'error',
                errorCode: 'USER_NOT_FOUND',
                message: 'User not found'
            })
        }
        if (!req.body.field) {
            return res.status(400).json({
                status: 'error',
                errorCode: 'FIELD_REQUIRED',
                message: 'Field is required'
            });
        }
        return res.status(200).json({
            status: 'success',
            message: 'Relay updated',
            data: {
                settings: user.settings[`node${req.body.field}`]
            }
        });
    })
    .put(/*checkAuth,*/ async (req, res) => {
        // if (!req.user) {
        //     return res.status(401).json({ message: 'Unauthorized' });
        // }
        const user = await User.findOne();
        if (!user) {
            return res.status(404).json({
                status: 'error',
                errorCode: 'USER_NOT_FOUND',
                message: 'User not found'
            })
        }
        console.log(req.body.field, req.body.relay, req.body.value);
        console.log("current", user.settings[`node${req.body.field}`][`relay${req.body.relay}`]);
        console.log("new", req.body.value);
        user.settings[`node${req.body.field}`][`relay${req.body.relay}`] = req.body.value;
        let publishData = {};

        for (let i = 0; i < Object.keys(user.settings[`node${req.body.field}`]).filter(key => key !== '1').length; i++) {
            publishData[`relay${i + 1}`] = user.settings[`node${req.body.field}`][`relay${i + 1}`] == true ? 'ON' : 'OFF';
        }
        publishData = JSON.stringify(publishData);
        // console.log(publishData);
        let subscribeData = null;
        if(req.body.field == 1) {
            console.log("i am sending to 1")
        await publishMessage("node1/relay", publishData, user._id);
        }
        if(req.body.field == 2) {
             await publishMessage("node2/relay", publishData, user._id);
        }
        // if(req.body.field == 1) {
        //  subscribeData = await subscribeToTopicTimed("node1/relay_state", user._id);
        // }
        // if(req.body.field == 2) {
        //     subscribeData = await subscribeToTopicTimed("node2/relay_state", user._id);
        // }
        // if(data == 'OK') {
        //     await user.save();
        //     return res.json({ message: 'ok' });
        // }
        await user.save();
        // const data = JSON.parse(subscribeData.toString());
        // if (!data) {
        //     return res.status(500).json({
        //         status: 'error',
        //         errorCode: 'INTERNAL_SERVER_ERROR',
        //         message: 'No response from device'
        //     });
        // }
        // console.log(data);
        return res.status(200).json({
            status: 'success',
            message: 'Relay updated',
            data: {
                subscribeData
            }
        });
    });

    router.route('/relay/all')
    .put(async (req, res) => {
        console.log(req.body);
        const user = await User.findOne();
        if (!user) {
            return res.status(404).json({
                status: 'error',
                errorCode: 'USER_NOT_FOUND',
                message: 'User not found'
            })
        }
        let publishData = {};

        for (let i = 0; i < Object.keys(user.settings[`node1`]).filter(key => key !== '1').length; i++) {
            console.log(i)
            publishData[`relay${i + 1}`] = req.body.value == true ? 'ON': 'OFF';
            user.settings[`node1`][`relay${i + 1}`] = req.body.value;
            user.settings[`node2`][`relay${i + 1}`] = req.body.value;
        }
        publishData = JSON.stringify(publishData);
        console.log(publishData);
        await user.save();
        await publishMessage("node1/relay", publishData, user._id);
        await publishMessage("node2/relay", publishData, user._id);
        }
    )

router.post('/relay/sensor', async (req, res) => {
    const user = await User.findOne();
    subscribeToTopic("topic/sensors", user._id);
});
export default router;