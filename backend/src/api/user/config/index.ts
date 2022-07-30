import express from "express";

import { get, getAll, create, update, remove } from "../controllers";
import { hashPassword, verifyUser } from "../services";
import { verifyToken } from "@services/auth";
import { signIn } from "../controllers/auth";

const router = express.Router();

router.get("/users", get);
router.post("/users", hashPassword, create);
router.get("/users/:id", getAll);
router.put("/users/:id", verifyToken, verifyUser, hashPassword, update);
router.delete("/users/:id", verifyToken, verifyUser, remove);

router.post("/auth/sign-in", signIn);

export default router