import express from "express";
import cookieParser from "cookie-parser";

import authRouter from "./src/routes/authRoutes.js";
import productRouter from "./src/routes/productRoutes.js";

import dotenv from "dotenv";
import cors from "cors";

dotenv.config("");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URI,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRouter);
app.use("/product", productRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
