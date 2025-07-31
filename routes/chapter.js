const express = require('express');
const router = express.Router();
const Chapter = require('../models/Chapter');

// Get chapter by ID
// router.get('/:id', async (req, res) => {
//   try {
//     const chapter = await Chapter.findById(req.params.id);
//     if (!chapter) return res.status(404).json({ error: 'Chapter not found' });
//     res.json(chapter);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// Get chapter by user-friendly chapterId
router.get('/:chapterId', async (req, res) => {
  try {
    const chapter = await Chapter.findOne({ chapterId: req.params.chapterId });
    if (!chapter) return res.status(404).json({ error: 'Chapter not found' });
    res.json(chapter);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a chapter (for testing/demo)
router.post('/', async (req, res) => {
  try {
    const { chapterId, title, content, metadata } = req.body;
    const chapter = new Chapter({ chapterId, title, content, metadata });
    await chapter.save();
    res.status(201).json(chapter);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 