const mongoose = require("mongoose");

const interviewApplicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    company: {
      type: String,
      required: true,
      trim: true
    },

    role: {
      type: String,
      required: true,
      trim: true
    },

    status: {
      type: String,
      enum: ["Applied", "OA", "Interview", "HR", "Offer", "Rejected"],
      default: "Applied"
    },

    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true
    },

    notes: {
      type: String,
      default: ""
    },

    appliedDate: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("InterviewApplication", interviewApplicationSchema);