const User = require("../models/userModel");
async function updatePassword(data) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result1 = await User.updateOne(
      { email: data.email },
      {
        $set: {
            password:hashedPassword,
        }
      }
    );
    return "Successful";
  } catch (error) {
    return { error };
  }
}

module.exports=updatePassword;
