const mongoose = require('mongoose');

const SummarySchema = new mongoose.Schema({
  chapter: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true, unique: true },
  chapterId: { type: String, required: true }, // User-friendly chapter ID
  summary: { type: String, required: true },
  highlights: [{ type: String }],
  metadata: { type: Object },
}, { timestamps: true });

module.exports = mongoose.model('Summary', SummarySchema); 