require('dotenv').config();
const mongoose = require("mongoose");
const User = require("./models/userModel");
const Membership = require("./models/membershipModel");

async function run() {
  await mongoose.connect(process.env.MONGODB_URL_AUTH);

  const users = await User.find();
  const memberships = await Membership.find();

  const membershipMap = {};
  memberships.forEach(member => {
    membershipMap[member.email] = member;
  });

  const arr = [];

  users.forEach(user => {
    const membership = membershipMap[user.email];
    if (membership) {
      arr.push({
        id: user.id,
        name: user.name,
        email: user.email,
        plan: membership.plan,
        joinDate: membership.joinDate,
        status: membership.status
      });
    }
  });

  console.log(arr);
}

run().catch(err => console.error(err));
