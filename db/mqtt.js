import mqtt from "mqtt";
import User from "../models/user.js";
import dotenv from "dotenv";
import connectMongo from "./mongoose.js";
dotenv.config();

const mqttHost = process.env.MQTT_HOST || "localhost";
const protocol = "mqtt";
const mqttport = 1883;
// let client = null;

export const connectMqtt = async (_id) => {
    const hostURL = `${protocol}://${mqttHost}:${mqttport}`;

    const options = {
        keepalive: 60,
        clientId: _id,
        protocolId: 'MQTT',
        protocolVersion: 4,
        clean: true,
        reconnectPeriod: 1000,
        connectTimeout: 30 * 1000,
    }
    const user = await User.findById(_id);
    const client = mqtt.connect(hostURL, options);
    // console.log(client);
    client.on('connect', () => {
        console.log(`Connected to MQTT broker with id: ${_id} and email: ${user.email}`);
    })
    .on('error', (err) => {
        console.error('MQTT error:', err);
    })
    .on('reconnect', () => {
        console.log('Reconnecting to MQTT broker');
    })
    .on('close', () => {
        console.log('Connection to MQTT broker closed');
    });
    return client;
};

export const publishMessage = async (topic, message, _id) => {
    // const client = mqtt.connect(hostURL, options);
    const client = await connectMqtt(_id);
    console.log(`Publishing message on topic ${topic}: ${message}`);
    client.publish(topic, message, (err) => {
        if (err) {
            console.error('MQTT publish error:', err);
        }
    });
};

export const publishJson = async (topic, json, _id) => {
    // const client = mqtt.connect(hostURL, options);
    const client = await connectMqtt(_id);
    console.log(`Publishing JSON on topic ${topic}: ${JSON.stringify(json)}`);
    client.publish(topic, JSON.stringify(json), (err) => {
        if (err) {
            console.error('MQTT publish error:', err);
        }
    });
}

export const subscribeToTopic = (topic) => {
    // const client = mqtt.connect(hostURL, options);
    client.subscribe(topic, (err) => {
        if (err) {
            console.error('MQTT subscribe error:', err);
        }
    });
    client.on('message', (topic, message) => {
        console.log(`Received message on topic ${topic}: ${message}`);
    });
};

// export const unsubscribeFromTopic = (topic) => {
//     const client = mqtt.connect(hostURL, options);
//     client.unsubscribe(topic, (err) => {
//         if (err) {
//             console.error('MQTT unsubscribe error:', err);
//         }
//     });
// };

export const disconnectMqtt = () => {
    client.end();
};

// await connectMqtt('66cf85e5e6eb3e136d95d687');
// console.log("helloe")
// publishMessage('test', 'Hello, world!');
// publishJson('test', { message: 'Hello, world!' });
// subscribeToTopic('test');