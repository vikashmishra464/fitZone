require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL_AUTH);


const User = require("./models/userModel");
const userMembership = require("./models/usermembershipModel");


app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.json({ message: 'Invalid password' });

  const membersdetails = await userMembership.findOne({ email });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
  res.json({
    message: 'Login successful',
    token,
    id: user.id,
    name: user.name,
    email: user.email,
    membership: membersdetails?.plan || "None",  // ✅ safe access
    joinDate: membersdetails?.joinDate || null,
    role: user.role,
  });

  });

app.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.json({ message: 'User already exists' });
  const hashedPassword = await bcrypt.hash(password, 10);
  const role = "user";
  const count = await User.countDocuments().catch(() => 0)+1; // count is a number
  const id = count.toString(); 
  const user = new User({id:id,email, password: hashedPassword, name, role });
  await user.save();
  const curdateandtime = new Date();
  const newMembership = new userMembership({ email, plan: "Free", joinDate: curdateandtime, status: "active" });
  await newMembership.save();
  res.json({ message: "Registration successful!" });
});

const verifyToken=require("./middleware/auth");

const getMergedUsers = require('./controller/getMergedUsers');
app.get('/membersdetails', verifyToken, async (req, res) => {
  try {
    const data = await getMergedUsers();
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Server error");
  }
});

const getPlans=require('./controller/getPlans');
app.get("/plans",verifyToken,async(req,res)=>{
  try {
    const data = await getPlans();
    res.json(data);
  } catch (error) {
    res.status(500).send("Server error");
  }
});


const updateDetail = require('./controller/upateDetails');

app.post("/updateUser", verifyToken, async (req, res) => {
  try {
    const data = await updateDetail(req.body);
    
    res.json({message:data});
  } catch (error) {
    res.status(500).send("Server error");
  }
});

const updateMembership = require('./controller/upateMembership');

app.post("/updateMembership", verifyToken, async (req, res) => {
  try {
    const data = await updateMembership(req.body);
    
    res.json({message:"successfull"});
  } catch (error) {
    res.status(500).send("Server error");
  }
});
const updatePassword = require('./controller/updatePassword');

app.post("/updatePassword", verifyToken, async (req, res) => {
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.json({ message: 'Invalid password' });

  try {
    const data = await updatePassword(req.body);
    
    res.json({message:"successfull"});
  } catch (error) {
    res.status(500).send("Server error");
  }
});

app.get("/",(req,res)=>{
  res.send("Fitzone Backend Running - By Vikash")
})

const PORT=process.env.PORT;
app.listen((PORT || 5000 ), () => console.log('Server running on port 5000'));