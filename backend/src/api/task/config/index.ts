import express from "express";

import { get, getAll, create, update, remove } from "../controllers";
import { verifyToken } from "@services/auth";
import { verifyOwner } from '../services'

const router = express.Router();

router.get("/", get);
router.post("/", verifyToken, create);
router.get("/:id", getAll);
router.put("/:id", verifyToken, verifyOwner, update);
router.delete("/:id", verifyToken, verifyOwner, remove);

export default router