import express from "express";

import {
  get,
  getTaskUsers,
  create,
  update,
  remove,
  getUserTasks,
  getAuthorTasks,
} from "../controllers";
import { verifyOwner } from "../services";

const router = express.Router();

router.get("/author-tasks", getAuthorTasks);
router.get("/user-tasks", getUserTasks);
router.get("/solvers/:id", verifyOwner, getTaskUsers);

router.post("/", create);
router.get("/:id", verifyOwner, get);
router.put("/:id", verifyOwner, update);
router.delete("/:id", verifyOwner, remove);

export default router;
