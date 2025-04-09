const User = require("../models/userModel");
const UserMembership=require("../models/usermembershipModel")
async function updateDetail(data) {
  try {
    const result1 = await User.updateOne(
      { email: data.prevemail },
      {
        $set: {
          name: data.name,
          email: data.email
        }
      }
    );
    const result2 = await UserMembership.updateOne(
      { email: data.prevemail },
      {
        $set: {
          email: data.email
        }
      }
    );
    return "Successful";
  } catch (error) {
    return { error };
  }
}

module.exports=updateDetail;
