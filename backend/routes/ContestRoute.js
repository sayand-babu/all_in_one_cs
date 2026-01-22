import express from "express";
import {
  createContest,
  getAllContests,
  getContestById,
  updateContest,
  deleteContest,
} from "../controllers/contest.controller.js";

const router = express.Router();

router.post("/", createContest);           // Create
router.get("/", getAllContests);            // Read all
router.get("/:id", getContestById);         // Read one
router.put("/:id", updateContest);          // Update
router.delete("/:id", deleteContest);       // Delete

export default router;
