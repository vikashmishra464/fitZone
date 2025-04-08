const mongoose = require("mongoose");

// 1. Connect to MongoDB
mongoose.connect("mongodb+srv://vikashmishra0200:reaper464@cluster0.zj8nt.mongodb.net/fitZone?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 2. Create Schema

// 3. Create Model
const plans = require("./models/planModel");

// 4. Membership data
const memberships = [
  {
    id: "basic",
    name: "Basic",
    price: 29,
    duration: "Monthly",
    features: [
      "Access to gym facilities",
      "Basic equipment usage",
      "2 group classes per week",
      "Locker room access",
      "Online workout resources",
    ],
    memberCount: 45,
    popular: false,
  },
  {
    id: "premium",
    name: "Premium",
    price: 59,
    duration: "Monthly",
    features: [
      "Full access to gym facilities",
      "All equipment usage",
      "Unlimited group classes",
      "1 personal training session/month",
      "Nutrition consultation",
      "Locker room access with towel service",
      "Access to mobile app",
    ],
    memberCount: 78,
    popular: true,
  },
  {
    id: "elite",
    name: "Elite",
    price: 99,
    duration: "Monthly",
    features: [
      "24/7 access to gym facilities",
      "All equipment usage",
      "Unlimited group classes",
      "4 personal training sessions/month",
      "Monthly nutrition consultation",
      "Locker room access with premium amenities",
      "Priority class booking",
      "Guest passes (2 per month)",
      "Access to mobile app with premium features",
    ],
    memberCount: 32,
    popular: false,
  },
  {
    id: "student",
    name: "Student",
    price: 19,
    duration: "Monthly",
    features: [
      "Access to gym facilities",
      "Basic equipment usage",
      "2 group classes per week",
      "Locker room access",
      "Valid student ID required",
    ],
    memberCount: 23,
    popular: false,
  },
  {
    id: "family",
    name: "Family",
    price: 149,
    duration: "Monthly",
    features: [
      "Access for up to 4 family members",
      "Full access to gym facilities",
      "All equipment usage",
      "Unlimited group classes",
      "2 personal training sessions/month",
      "Locker room access with towel service",
      "Access to mobile app",
    ],
    memberCount: 15,
    popular: false,
  },
];

// 5. Insert data
plans.insertMany(memberships)
  .then(() => {
    console.log("Memberships inserted successfully!");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error inserting memberships:", error);
  });
