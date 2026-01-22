import Contest from "../models/Contest.model.js";

/* =========================
   CREATE CONTEST
========================= */
export const createContest = async (req, res) => {
  try {
    const contest = await Contest.create(req.body);
    res.status(201).json({
      success: true,
      data: contest,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   GET ALL CONTESTS
========================= */
export const getAllContests = async (req, res) => {
  try {
    const contests = await Contest.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: contests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   GET SINGLE CONTEST
========================= */
export const getContestById = async (req, res) => {
  try {
    const contest = await Contest.findById(req.params.id);

    if (!contest) {
      return res.status(404).json({ message: "Contest not found" });
    }

    res.status(200).json({
      success: true,
      data: contest,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   UPDATE CONTEST
========================= */
export const updateContest = async (req, res) => {
  try {
    const contest = await Contest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!contest) {
      return res.status(404).json({ message: "Contest not found" });
    }

    res.status(200).json({
      success: true,
      data: contest,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   DELETE CONTEST
========================= */
export const deleteContest = async (req, res) => {
  try {
    const contest = await Contest.findByIdAndDelete(req.params.id);

    if (!contest) {
      return res.status(404).json({ message: "Contest not found" });
    }

    res.status(200).json({
      success: true,
      message: "Contest deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
