const bcrypt = require("bcrypt");
const Register = require("../models/UserRegister");

const createUserRegister = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const register = new Register({
      name,
      phone,
      email,
      password: hashedPassword, // Store the hashed password
    });

    // Check if the email already exists in the database
    const existingUser = await Register.findOne({ email });

    // If the email already exists, return an error response
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    
    await register.save();
    res.status(201).json(register);
    console.log("Registration successful");
  } catch (error) {
    console.log(`Error in controller: ${error}`);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createUserRegister };
