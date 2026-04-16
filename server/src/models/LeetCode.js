const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    title: String,
    status: String,
    language: String,
    timestamp: Date
  },
  { _id: false }
);

const badgeSchema = new mongoose.Schema(
  {
    name: String,
    icon: String
  },
  { _id: false }
);

const topicStatSchema = new mongoose.Schema(
  {
    topic: String,
    count: Number
  },
  { _id: false }
);

const leetcodeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    leetcodeUsername: {
      type: String,
      required: true
    },

    totalSolved: {
      type: Number,
      default: 0
    },
    easySolved: {
      type: Number,
      default: 0
    },
    mediumSolved: {
      type: Number,
      default: 0
    },
    hardSolved: {
      type: Number,
      default: 0
    },

    ranking: Number,
    reputation: Number,
    avatar: String,

    contestRating: Number,
    contestGlobalRanking: Number,
    contestsAttended: Number,

    recentSubmissions: [submissionSchema],

    topicStats: [topicStatSchema],

    badges: [badgeSchema],

    lastSynced: {
      type: Date
    },

    syncIntervalHours: {
      type: Number,
      default: 6
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Leetcode", leetcodeSchema);