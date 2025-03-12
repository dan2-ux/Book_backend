import mongoose from "mongoose";
import { mongoDBURL } from './config.js';
import express from 'express';
import router from "./route/BookRoute.js";
import cors from 'cors';

const app = express();

// Default to 5555 if process.env.PORT is not set
const PORT = process.env.PORT || 5555;

app.get('/', (req, res) => {
    res.status(200).send("<h1>Welcome to MERN stack</h1>");
});

app.use(cors());

app.use(express.json());

app.use('/app/books/', router);

mongoose.connect(mongoDBURL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((e) => {
        console.log(e.message);
    });
