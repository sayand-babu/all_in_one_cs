const express = require("express");
const {
  googleAuth,
  googleCallback,
  getMe,
  logout,
} = require("../controllers/auth.controller");

const router = express.Router();

router.get("/auth/google", googleAuth);
router.get("/auth/google/callback", googleCallback);
router.get("/me", getMe);
router.post("/logout", logout);

module.exports = router;
