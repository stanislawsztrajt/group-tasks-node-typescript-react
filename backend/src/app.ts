import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from 'cors'

// database
import { connectToMongoDB } from "./config/database";

// routes
import userRouter from "@api/user/config";
import taskRouter from "@api/task/config";
import groupRouter from "@api/group/config";

// services
import { verifyToken } from "@services/auth";

dotenv.config();
connectToMongoDB();
const app = express();

app.use(cors({
  origin: ['http://localhost:3000']
}));


app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: 'There is nothing here, go to the /users /tasks /groups' });
});

app.use("/", userRouter);
app.use("/tasks", verifyToken, taskRouter);
app.use("/groups", verifyToken, groupRouter);

app.listen(8000, () => {
  console.log("listening on port 8000");
});
