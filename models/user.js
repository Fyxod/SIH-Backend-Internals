import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    settings: {
        node1: {
            relay1: {
                type: Boolean,
                default: false,
            },
            relay2: {
                type: Boolean,
                default: false,
            },
            relay3: {
                type: Boolean,
                default: false,
            },
            relay4: {
                type: Boolean,
                default: false,
            },
        },
        node2: {
            relay1: {
                type: Boolean,
                default: false,
            },
            relay2: {
                type: Boolean,
                default: false,
            },
            relay3: {
                type: Boolean,
                default: false,
            },
            relay4: {
                type: Boolean,
                default: false,
            },
        }
    }
    });

const User = mongoose.model('User', userSchema);

export default User;