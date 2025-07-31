require('dotenv').config({ path: './env/.env' });
const mongoose = require('mongoose');
const Chapter = require('./models/Chapter');

// Sample chapter content for testing
const sampleChapter = {
  chapterId: 'intro-to-physics',
  title: 'Introduction to Physics',
  content: `# Introduction to Physics

Physics is the fundamental science that studies matter, energy, and their interactions. It forms the foundation for understanding how the universe works.

## **WHAT IS PHYSICS?**

Physics is the study of the natural world through observation, experimentation, and mathematical modeling. It seeks to understand the fundamental laws that govern everything from the smallest particles to the largest galaxies.

### **Key Concepts in Physics:**

• **Matter**: Anything that has mass and takes up space
• **Energy**: The ability to do work or cause change
• **Force**: A push or pull that can change an object's motion
• **Motion**: The change in position of an object over time

## **BRANCHES OF PHYSICS**

### **Classical Physics**
Classical physics includes:
- **Mechanics**: Study of motion and forces
- **Thermodynamics**: Study of heat and energy
- **Electromagnetism**: Study of electric and magnetic fields
- **Optics**: Study of light and vision

### **Modern Physics**
Modern physics includes:
- **Quantum Mechanics**: Study of very small particles
- **Relativity**: Study of space, time, and gravity
- **Nuclear Physics**: Study of atomic nuclei
- **Particle Physics**: Study of fundamental particles

## **THE SCIENTIFIC METHOD IN PHYSICS**

Physics follows the scientific method:

1. **Observation**: Notice something interesting in nature
2. **Question**: Ask "why" or "how" questions
3. **Hypothesis**: Make an educated guess
4. **Experiment**: Test the hypothesis
5. **Analysis**: Examine the results
6. **Conclusion**: Draw conclusions and share findings

## **IMPORTANCE OF PHYSICS**

Physics is crucial because:
✅ It helps us understand the world around us
✅ It leads to technological advancements
✅ It provides tools for other sciences
✅ It develops critical thinking skills
✅ It explains everyday phenomena

## **MATHEMATICS IN PHYSICS**

Mathematics is the language of physics. Key mathematical concepts include:
- **Algebra**: Solving equations
- **Geometry**: Understanding shapes and space
- **Calculus**: Studying rates of change
- **Trigonometry**: Working with angles and waves

## **UNITS AND MEASUREMENT**

Physics uses the International System of Units (SI):
- **Length**: meter (m)
- **Mass**: kilogram (kg)
- **Time**: second (s)
- **Temperature**: kelvin (K)
- **Electric Current**: ampere (A)
- **Amount of Substance**: mole (mol)
- **Luminous Intensity**: candela (cd)

## **PRACTICAL APPLICATIONS**

Physics has countless real-world applications:
- **Transportation**: Cars, planes, trains
- **Communication**: Phones, internet, satellites
- **Medicine**: X-rays, MRI, ultrasound
- **Energy**: Solar panels, wind turbines, nuclear power
- **Entertainment**: Music, movies, video games

## **FAMOUS PHYSICISTS**

Some notable physicists include:
- **Isaac Newton**: Laws of motion and gravity
- **Albert Einstein**: Theory of relativity
- **Marie Curie**: Radioactivity
- **Niels Bohr**: Atomic structure
- **Richard Feynman**: Quantum electrodynamics

## **GETTING STARTED WITH PHYSICS**

To begin studying physics:
1. Develop strong mathematical skills
2. Practice problem-solving regularly
3. Conduct simple experiments
4. Read about physics concepts
5. Ask questions and seek answers

Remember: Physics is not just about memorizing formulas—it's about understanding how the universe works!`,
  metadata: {
    subject: 'Physics',
    level: 'Beginner',
    duration: '2-3 hours',
    topics: ['Introduction', 'Scientific Method', 'Branches of Physics', 'Units']
  }
};

async function seedSampleChapter() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if sample chapter already exists
    const existingChapter = await Chapter.findOne({ chapterId: sampleChapter.chapterId });
    
    if (existingChapter) {
      console.log('Sample chapter already exists, updating...');
      await Chapter.findOneAndUpdate(
        { chapterId: sampleChapter.chapterId },
        sampleChapter,
        { new: true }
      );
    } else {
      console.log('Creating sample chapter...');
      const chapter = new Chapter(sampleChapter);
      await chapter.save();
    }

    console.log('✅ Sample chapter seeded successfully!');
    console.log('Chapter ID:', sampleChapter.chapterId);
    console.log('Title:', sampleChapter.title);
    
  } catch (error) {
    console.error('❌ Error seeding sample chapter:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the seed function if this file is executed directly
if (require.main === module) {
  seedSampleChapter();
}

module.exports = { seedSampleChapter }; 