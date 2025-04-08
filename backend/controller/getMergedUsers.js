const User = require('../models/userModel');
const Membership = require('../models/membershipModel');

async function getMergedUsers() {
  const users = await User.find();
  const memberships = await Membership.find();

  const membershipMap = {};
  memberships.forEach(member => {
    membershipMap[member.email] = member;
  });
  const arr = [];
  users.map(user => {
    const membership = membershipMap[user.email];
    if (membership) {
      arr.push( {
        id: user.id,
        name: user.name,
        email: user.email,
        plan: membership.plan,
        joinDate: membership.joinDate,
        status: membership.status
      });
    }
  });
  return arr;
}
module.exports = getMergedUsers;
