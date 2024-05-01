// lecture-controller.js

// Example controller methods for managing lectures

const Lecture = require('../models/lecture'); // Import your Lecture model

// Get all lectures
const getLectures = async (req, res) => {
    try {
        const lectures = await Lecture.find();
        res.json(lectures);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new lecture
const createLecture = async (req, res) => {
    const { title, date, description } = req.body;
    const lecture = new Lecture({ title, date, description });

    try {
        const newLecture = await lecture.save();
        res.status(201).json(newLecture);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a lecture by ID
const deleteLecture = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedLecture = await Lecture.findByIdAndDelete(id);
        res.json(deletedLecture);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getLectures, createLecture, deleteLecture };
