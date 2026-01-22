import mongoose from "mongoose";

const contestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    startTime: {
      type: Date,
      required: true,
    },

    duration: {
      type: Number, // minutes
      required: true,
      min: 1,
    },

    participants: [
      {
        userId: {
          type: String,
          required: true,
        },
        username: String,
        email: String,
      },
    ],

    problems: [
      {
        problemId: {
          type: String,
          required: true,
        },
        title: String,
        difficulty: String,
      },
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    status: {
      type: String,
      enum: ["scheduled", "running", "ended"],
      default: "scheduled",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Contest", contestSchema);
