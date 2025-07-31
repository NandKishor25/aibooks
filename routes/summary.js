const express = require('express');
const router = express.Router();
const Summary = require('../models/Summary');
const Chapter = require('../models/Chapter');
// const { getOpenAISummary } = require('../utils/openai'); // To be implemented

// Get or generate summary for a chapter
router.get('/:chapterId', async (req, res) => {
  try {
    const { chapterId } = req.params;
    let summary = await Summary.findOne({ chapter: chapterId });
    if (summary) {
      return res.json(summary);
    }
    // If not found, generate using OpenAI (stubbed)
    const chapter = await Chapter.findById(chapterId);
    if (!chapter) return res.status(404).json({ error: 'Chapter not found' });
    // const { summaryText, highlights } = await getOpenAISummary(chapter.content);
    // Stubbed response:
    const summaryText = `Summary for chapter: ${chapter.title}`;
    const highlights = ['Highlight 1', 'Highlight 2'];
    summary = new Summary({
      chapter: chapterId,
      summary: summaryText,
      highlights,
    });
    res.json(summary);
    await summary.save();
   
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 