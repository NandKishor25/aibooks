# API Documentation - Ask About Chapter

This document describes the API routes for asking questions about chapters with ChatGPT integration.

## Overview

The application now includes enhanced API routes for asking questions about specific chapters using OpenAI's ChatGPT API. Users can ask any question related to chapter content and receive detailed, educational responses.

## API Routes

### 1. Ask About Chapter - POST `/api/ask-chapter`

Ask questions about a specific chapter's content.

**Request Body:**
```json
{
  "question": "What are the main branches of physics?",
  "chapterId": "507f1f77bcf86cd799439011",
  "chapterContent": {
    "title": "Introduction to Physics",
    "content": "Physics is the fundamental science...",
    "id": "507f1f77bcf86cd799439011"
  }
}
```

**Response:**
```json
{
  "answer": "Based on the chapter content, the main branches of physics are...",
  "chapterTitle": "Introduction to Physics",
  "question": "What are the main branches of physics?",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**Error Responses:**
- `400 Bad Request`: Missing required fields
- `404 Not Found`: Chapter not found
- `429 Too Many Requests`: API rate limit exceeded
- `500 Internal Server Error`: Server or OpenAI API error

### 2. Get Chapter Info - GET `/api/ask-chapter/:chapterId`

Get chapter information for asking questions.

**Response:**
```json
{
  "chapterId": "507f1f77bcf86cd799439011",
  "title": "Introduction to Physics",
  "content": "Physics is the fundamental science...",
  "metadata": {
    "subject": "Physics",
    "level": "Beginner",
    "duration": "2-3 hours"
  }
}
```

### 3. General Ask - POST `/api/ask`

Ask general questions with optional context.

**Request Body:**
```json
{
  "question": "Explain quantum mechanics",
  "context": "Optional context information",
  "chapterId": "optional-chapter-id"
}
```

**Response:**
```json
{
  "answer": "Quantum mechanics is a fundamental theory in physics..."
}
```

## ChatGPT Integration

### Features

1. **Chapter-Specific Responses**: AI responses are based solely on the provided chapter content
2. **Educational Formatting**: Responses use markdown formatting with:
   - Bold headings
   - Bullet points
   - Examples with ✅ emoji
   - LaTeX formatting for mathematical expressions
3. **Error Handling**: Comprehensive error handling for API limits, invalid keys, etc.
4. **Context Awareness**: AI understands when questions cannot be answered from chapter content

### System Prompts

The AI is configured with specific system prompts for:
- **Chapter Questions**: Focused on chapter content only
- **General Questions**: Educational explanations on any topic

### Configuration

Required environment variables:
```env
OPENAI_API_KEY=your_openai_api_key_here
MONGODB_URI=your_mongodb_connection_string
```

## Usage Examples

### Frontend Integration

```javascript
// Ask a question about a chapter
const response = await axios.post('/api/ask-chapter', {
  question: "What is the scientific method?",
  chapterId: chapterId,
  chapterContent: {
    title: chapterData.title,
    content: chapterData.content,
    id: chapterId
  }
});

console.log(response.data.answer);
```

### Error Handling

```javascript
try {
  const response = await axios.post('/api/ask-chapter', data);
  // Handle success
} catch (error) {
  if (error.response?.status === 429) {
    // Handle rate limiting
  } else if (error.response?.status === 404) {
    // Handle chapter not found
  } else {
    // Handle other errors
  }
}
```

## Sample Chapter

A sample chapter "Introduction to Physics" is included for testing:

- **Chapter ID**: `intro-to-physics`
- **Title**: "Introduction to Physics"
- **Content**: Comprehensive physics introduction covering:
  - What is physics
  - Branches of physics
  - Scientific method
  - Units and measurement
  - Practical applications

To seed the sample chapter:
```bash
node backend/seed-sample-chapter.js
```

## Testing

You can test the API using tools like Postman or curl:

```bash
# Test asking about the sample chapter
curl -X POST http://localhost:5050/api/ask-chapter \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What are the branches of physics?",
    "chapterId": "intro-to-physics"
  }'
```

## Security Considerations

1. **API Key Protection**: Ensure OpenAI API key is stored securely in environment variables
2. **Rate Limiting**: Implement rate limiting to prevent API abuse
3. **Input Validation**: Validate all user inputs before processing
4. **Error Handling**: Don't expose sensitive information in error messages

## Performance Optimization

1. **Caching**: Consider caching frequently asked questions
2. **Response Length**: Limit response tokens to control costs
3. **Batch Processing**: For multiple questions, consider batch processing
4. **Connection Pooling**: Use MongoDB connection pooling for better performance 