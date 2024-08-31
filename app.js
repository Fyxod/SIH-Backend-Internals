import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import {Server} from "socket.io";
import { fileURLToPath } from "url";
import path from "path";
import authRouter from "./routes/auth.js";
import relayRouter from "./routes/relay.js";
import connectMongo from "./db/mongoose.js";
import dotenv from "dotenv";

dotenv.config();
// const __dirname = dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 3000;
connectMongo();

const app = express();
const server = http.createServer(app)
const io = new Server(server);
io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
});
export { io };

app.use(cors());
app.use(cookieParser());
app.use(express.json())
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


app.use(authRouter);
app.use(relayRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});