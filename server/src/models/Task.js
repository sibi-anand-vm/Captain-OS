const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true // 🔥 important for performance
    },

    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      trim: true
    },

    category: {
      type: String,
      enum: ["Study", "Fitness", "Personal"],
      required: true
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium"
    },

    dueDate: {
      type: Date
    },

    completed: {
      type: Boolean,
      default: false,
      index: true
    },

    completedAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

// 🔥 Compound index for faster dashboard queries
taskSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model("Task", taskSchema);