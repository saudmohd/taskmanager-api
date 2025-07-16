import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';

const app = express();

connectDB();

app.get('/', (req, res) =>{
    res.send("hello")
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
});