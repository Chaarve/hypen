const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
        const user = await User.create({ name, email, password: hashedPassword, role });
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login User
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ userId: user._id, role: user.role }, "secret", { expiresIn: "1h" });
        res.json({ token });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

module.exports = router;
