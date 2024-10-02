const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Register = require("../models/AdminRegistration");

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user with the provided email exists in the database
    const user = await Register.findOne({ email });

    // If the user is not found, return an error response
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // If the email and password are correct, generate a JWT token
    const token = jwt.sign({ userId: user._id }, "swp", { expiresIn: "1h" }); // Replace 'your_secret_key' with your actual secret key

    // Return the token along with a success response
    res.status(200).json({ message: "Login successful", token });
    console.log("Login successful");
  } catch (error) {
    console.error(`Error in login controller: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { loginAdmin };
