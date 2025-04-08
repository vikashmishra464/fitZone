const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  plan: {
    type: String,
    required: true
  },
  joinDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});

const Membership=mongoose.model("membership",membershipSchema);
module.exports=Membership;