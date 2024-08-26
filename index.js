import express from "express";
import teacherRouter from "./Routers/teacherRouter.js";
import StudentRouter from "./Routers/studentRouter.js";
import StaffRouter from "./Routers/otherstaffRouter.js";
import attendenceRouter from "./Routers/attandenceRouter.js";
import examlistRouter from "./Routers/examlistRouter.js";
import holidaysRouter from "./Routers/holidaysRouter.js";
import libaryRouter from "./Routers/libaryRouter.js";
import sportdateRouter from "./Routers/sportdateRouter.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

// Load environment variables from the config.env file
dotenv.config({ path: "./data/config.env" });

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

// Use the userRouter for handling requests to /users
app.use("/api/v1/teachers", teacherRouter);
app.use("/api/v1/students",StudentRouter);
app.use("/api/v1/staff",StaffRouter);
app.use("/api/v1/attendence",attendenceRouter);
app.use("/api/v1/examlist",examlistRouter);
app.use("/api/v1/holidays",holidaysRouter);
app.use("/api/v1/libary",libaryRouter);
app.use("/api/v1/sports",sportdateRouter);

export default app;
