const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  // chapter: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true },
  chapterId: { type: String, required: true }, // User-friendly chapter ID
  question: { type: String, required: true },
  answer: { type: String, required: true },
  metadata: { type: Object },
}, { timestamps: true });

module.exports = mongoose.model('Question', QuestionSchema); 