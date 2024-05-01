// models/lecture.js

const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const Lecture = mongoose.model('Lecture', lectureSchema);

module.exports = Lecture;
