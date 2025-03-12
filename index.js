import mongoose from "mongoose";
import {PORT, mongoDBURL} from './config.js'
import express from 'express'
import router from "./route/BookRoute.js";
import cors from 'cors'

const app = express();

app.get('/', (req,res) => {
    res.status(200).send("<h1>Welcome to MERN stack</h1>")
})

app.use(cors())

// app.use(cors({
//     origin: '*',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type']
// }))

app.use(express.json())

app.use('/app/books/' , router)

mongoose.connect(mongoDBURL)
        .then(() => {
            app.listen(PORT, () => {
                console.log(`Running at ${PORT}`)
            })
        })
        .catch((e) => {
            console.log(e.message);
        })