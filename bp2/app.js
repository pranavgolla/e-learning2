const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Routes = require("./routes/registerRoutes");
const cors = require("cors");

const app = express();  

// Load environment variables from .env file
dotEnv.config();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Define port
const PORT = process.env.PORT || 4001;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error(`Error connecting to MongoDB: ${error}`);
  });

// User schema with username
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class: { type: String, required: true },
  rollNo: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// User model
const User = mongoose.model("User", userSchema);

// Endpoint to add a user
app.post("/admin/add-user", async (req, res) => {
  const { name, class: className, rollNo, email, password } = req.body;

  // Validate input
  if (!name || !className || !rollNo || !email || !password) {
    return res.status(400).json({ message: "All fields are required, including username." });
  }

  try {
    // Create a new user
    const newUser = new User({ name, class: className, rollNo, email, password});
    await newUser.save();
    res.status(201).json({ message: "User added successfully!" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Username already exists. Please choose another." });
    }
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Failed to add user." });
  }
});

// Endpoint to get all users
app.get("/admin/get-users", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users." });
  }
});

// Endpoint to update a user
app.put("/admin/update-user/:id", async (req, res) => {
  const { id } = req.params;
  const { name, class: className, rollNo, email, password } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, 
      { name, class: className, rollNo, email, password }, 
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json({ message: "User updated successfully!", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Failed to update user." });
  }
});

// Endpoint to delete a user
app.delete("/admin/delete-user/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json({ message: "User deleted successfully!" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Failed to delete user." });
  }
});

// Register routes
app.use("/user-register", Routes);
app.use("/user", Routes); // Use login routes
app.use("/admin-register", Routes);
app.use("/admin", Routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
