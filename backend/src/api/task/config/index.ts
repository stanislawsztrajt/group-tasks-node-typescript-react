import express from "express";

import { get, getTaskUsers, create, update, remove } from "../controllers";
import { verifyOwner } from "../services";

const router = express.Router();

router.post("/", create);
router.get("/solvers/:id", verifyOwner, getTaskUsers);
router.get("/:id", verifyOwner, get);
router.put("/:id", verifyOwner, update);
router.delete("/:id", verifyOwner, remove);

export default router;
