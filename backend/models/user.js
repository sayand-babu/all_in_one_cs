const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  provider: { type: String, required: true },
  providerUserId: { type: String, required: true }, // Google `sub`
  email: String,
  name: String,
  avatar: String,
  createdAt: { type: Date, default: Date.now },
  lastLoginAt: Date,
});

userSchema.index(
  { provider: 1, providerUserId: 1 },
  { unique: true }
);

module.exports = mongoose.model("User", userSchema);
