const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  price: Number,
  duration: String,
  features: [String],
  memberCount: Number,
  popular: Boolean,
});

const Plan = mongoose.model("Plan", membershipSchema);

module.exports = Plan;