import dotenv from 'dotenv';
import connectDb from './config/dbConfig';

dotenv.config();
connectDb();

console.log("Welcome to Saaya 25");