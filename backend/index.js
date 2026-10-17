import path from 'path';
import express from "express";
import cors from "cors";
import getState from "./getState.js";
import {setState, verifyState} from "./setState.js";
import dotenv from "dotenv";
import {getDirname} from "./helpers.js";
import {requireAllowedUser} from "./auth.js";

dotenv.config();

const app = express()
const port = process.env.PORT ?? 1111

if (process.env.ENVIRONMENT === "dev") {
    console.log("Running in Dev mode");
    app.use(cors({origin: "http://localhost:5173"}))
}


app.use(express.json())

// Health check stays above auth: probes bypass Easy Auth and carry no identity headers
app.post("/", (req, res) => {
    res.send("Health Check Success")
})

app.use(requireAllowedUser)

app.use(express.static(path.join(getDirname(), './frontendBuild')))

app.post('/state', async (req, res) => {
    try {
        const isValidReq = verifyState(req.body);
        if (isValidReq) {
            await setState(req.body);
            res.status(200).send({success: true});
        } else {
            res.status(400).send({success: false, reason: "Invalid state"})
        }
    } catch (e) {
        console.error(e);
        res.status(500).send({success: false, reason: "Internal Server Error"})
    }
})

app.get('/state', async (req, res) => {
    try {
        res.contentType("application/json");
        res.send(await getState());
    } catch (e) {
        console.error(e);
        res.status(500).send({success: false, reason: "Internal Server Error"})
    }
})

app.get('/me', (req, res) => {
    res.send({email: req.userEmail ?? null});
})

app.get('/', (req, res) => {
    res.sendFile(path.join(getDirname(), "./frontendBuild/index.html"))
})

app.listen(port, () => {
    console.log(`Expense ratio split listening on port ${port}`)
})