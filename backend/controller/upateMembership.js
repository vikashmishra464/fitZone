const UserMembership=require("../models/usermembershipModel")
async function updateMembership(data) {
    console.log(data);
    try {
    const result2 = await UserMembership.updateOne(
      { email: data.email },
      {
        $set: {
          plan: data.plan
        }
      }
    );
    return "successful";
  } catch (error) {
    return { error };
  }
}

module.exports=updateMembership;
