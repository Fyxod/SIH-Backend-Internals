import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { fileURLToPath } from "url";
import path from "path";
import authRouter from "./routes/auth.js"
import relayRouter from "./routes/relay.js"
import connectMongo from "./db/mongoose.js"
import mqtt from "mqtt"
import dotenv from "dotenv"

dotenv.config();
// const __dirname = dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 3000;
connectMongo();

const app = express();

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