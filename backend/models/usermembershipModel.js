const mongoose = require("mongoose");

const userMembershipSchema = new mongoose.Schema({
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

const userMembership=mongoose.model("userMembership",userMembershipSchema);
module.exports=userMembership;