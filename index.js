import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './src/routes/web.js';
import Conexion from './src/config/conexion.js';

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
Conexion();
app.use("",router);


const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO,() =>{
    console.log(" El Servidor Esta Corriendo");
    console.log(`✅ URL: http://localhost:${PUERTO}`);
});