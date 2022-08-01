import express from "express";

import { get, getUserGroups, getGroupUsers, getGroupTasks, create, update, remove, getAdminGroups,  } from "../controllers";
import { verifyAdmin, verifyUsers } from "../services";

const router = express.Router();

router.get("/user-groups", getUserGroups);
router.get("/admin-groups", getAdminGroups);
router.get("/tasks/:id", getGroupTasks);
router.get("/users/:id", verifyUsers, getGroupUsers);

router.post("/", create);
router.get("/:id", verifyUsers, get);
router.put("/:id", verifyAdmin, update);
router.delete("/:id", verifyAdmin, remove);

export default router;
