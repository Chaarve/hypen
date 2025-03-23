const express = require("express");
const Project = require("../models/Project");

const router = express.Router();

// Create Project
router.post("/", async (req, res) => {
    const { title, description, category, location, createdBy } = req.body;

    try {
        const project = await Project.create({ title, description, category, location, createdBy });
        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get All Projects
router.get("/", async (req, res) => {
    const projects = await Project.find().populate("createdBy", "name");
    res.json(projects);
});

module.exports = router;
