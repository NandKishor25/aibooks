const mongoose = require('mongoose');

const ChapterSchema = new mongoose.Schema({
  chapterId: { type: String, required: true, unique: true }, // User-friendly unique ID
  title: { type: String, required: true },
  content: { type: String, required: true },
  metadata: { type: Object },
}, { timestamps: true });

module.exports = mongoose.model('Chapter', ChapterSchema); 