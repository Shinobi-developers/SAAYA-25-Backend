import dotenv from "dotenv";
import connectDb from "./config/dbConfig";
import express from "express";
import cors from "cors";

import testRoutes from "./routes/testRoutes";
import userRoutes from './routes/userRoutes';

const app = express();
dotenv.config();

connectDb();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/test", testRoutes);
app.use("/user", userRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
