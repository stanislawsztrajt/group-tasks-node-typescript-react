import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

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

app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("its home page");
});

app.use("/", userRouter);
app.use("/tasks", verifyToken, taskRouter);
app.use("/groups", verifyToken, groupRouter);

app.listen(8000, () => {
  console.log("listening on port 8000");
});
