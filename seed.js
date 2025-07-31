require('dotenv').config({ path: './env/.env' });
const mongoose = require('mongoose');
const Chapter = require('./models/Chapter');
const Summary = require('./models/Summary');
const Question = require('./models/Question');

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);

  // Remove old data
  await Chapter.deleteMany({});
  await Summary.deleteMany({});
  await Question.deleteMany({});

  // Insert chapters with user-friendly chapterId
  const chapters = await Chapter.insertMany([
    {
      chapterId: 'river-spoke',
      title: 'The Day the River Spoke',
      content: 'Maya, a young scientist, discovers the river is trying to communicate an urgent message about ecological balance to her community.',
      metadata: { author: 'John Doe', subject: 'Environmental Science' }
    },
    {
      chapterId: 'solar-system',
      title: 'The Solar System',
      content: 'This chapter explores the planets, moons, and other celestial bodies that orbit our Sun.',
      metadata: { author: 'Jane Smith', subject: 'Astronomy' }
    }
  ]);

  // Insert summaries with chapterId
  const summaries = await Summary.insertMany([
    {
      chapter: chapters[0]._id,
      chapterId: chapters[0].chapterId,
      summary: 'This chapter discusses the importance of listening to nature and understanding environmental changes.',
      highlights: ['Nature as a communicator', 'Ecological balance', 'Community response'],
      metadata: { source: 'manual' }
    },
    {
      chapter: chapters[1]._id,
      chapterId: chapters[1].chapterId,
      summary: 'An overview of the solar system, its planets, and their unique features.',
      highlights: ['Planets', 'Moons', 'Celestial bodies'],
      metadata: { source: 'manual' }
    }
  ]);

  // Insert questions with chapterId
  await Question.insertMany([
    {
      chapter: chapters[0]._id,
      chapterId: chapters[0].chapterId,
      question: "What is the main theme of 'The Day the River Spoke'?",
      answer: 'The relationship between humans and nature, and the importance of listening to environmental warnings.',
      metadata: { difficulty: 'easy' }
    },
    {
      chapter: chapters[0]._id,
      chapterId: chapters[0].chapterId,
      question: 'Who is Maya?',
      answer: 'A young scientist who interprets the river\'s message.',
      metadata: { difficulty: 'easy' }
    },
    {
      chapter: chapters[1]._id,
      chapterId: chapters[1].chapterId,
      question: 'What is the largest planet in the solar system?',
      answer: 'Jupiter.',
      metadata: { difficulty: 'easy' }
    },
    {
      chapter: chapters[1]._id,
      chapterId: chapters[1].chapterId,
      question: 'Name one unique feature of Saturn.',
      answer: 'Its prominent ring system.',
      metadata: { difficulty: 'medium' }
    }
  ]);

  console.log('Database seeded with realistic data including user-friendly chapterId!');
  await mongoose.disconnect();
}

seed(); 