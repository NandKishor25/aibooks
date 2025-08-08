# Scan Feature Setup Guide

This guide explains how to set up the scan feature that uses Google Gemini 2.0 Flash for image analysis and question answering.

## Features

- **Camera Scanning**: Users can scan documents, questions, or any image using their device camera
- **Image Cropping**: Interactive cropping tool to select specific areas for analysis
- **AI Analysis**: Powered by Google Gemini 2.0 Flash for accurate image understanding
- **Voice Integration**: Text-to-speech for AI responses and voice input support
- **Real-time Processing**: Instant analysis and detailed explanations

## Prerequisites

1. **Google Cloud Project**: You need a Google Cloud project with Vertex AI API enabled
2. **Service Account**: Create a service account with Vertex AI permissions
3. **API Key**: Download the service account JSON key file

## Setup Instructions

### 1. Google Cloud Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Vertex AI API:
   - Go to APIs & Services > Library
   - Search for "Vertex AI API"
   - Click "Enable"

### 2. Create Service Account

1. Go to IAM & Admin > Service Accounts
2. Click "Create Service Account"
3. Name it something like "gemini-scan-service"
4. Add the following roles:
   - Vertex AI User
   - Vertex AI Service Agent
5. Create and download the JSON key file

### 3. Configure Environment Variables

Update your `backend/env/.env` file with your Google Cloud project details:

```env
# Google Cloud Configuration for Gemini 2.0 Flash
GOOGLE_CLOUD_PROJECT_ID=your-actual-project-id
GOOGLE_APPLICATION_CREDENTIALS=./service-account-key.json
```

### 4. Add Service Account Key

1. Place your downloaded service account JSON file in the backend directory
2. Rename it to `service-account-key.json`
3. Make sure it's in the same directory as your `index.js` file

### 5. Install Dependencies

The required dependencies are already installed:
- `@google-cloud/vertexai`: For Gemini 2.0 Flash integration
- `multer`: For handling file uploads
- `express`: For the API server

## API Endpoints

### POST /api/scan-question

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body:
  - `image`: Image file (JPEG, PNG, etc.)
  - `question`: Optional text question about the image

**Response:**
```json
{
  "answer": "Detailed analysis from Gemini 2.0 Flash",
  "model": "gemini-2.0-flash-exp",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## Frontend Integration

The scan feature is integrated into the main app with:

1. **Camera Access**: Uses device camera for image capture
2. **Image Cropping**: Interactive cropping tool
3. **AI Chat**: Real-time conversation with Gemini 2.0 Flash
4. **Voice Features**: Text-to-speech and voice input
5. **Error Handling**: Comprehensive error handling and user feedback

## Usage Flow

1. User clicks "Scan Question" from the main menu
2. Camera opens for image capture
3. User captures image and crops to desired area
4. Image is sent to backend with optional question
5. Gemini 2.0 Flash analyzes the image and provides detailed response
6. User can ask follow-up questions about the same image
7. Voice features available for hands-free interaction

## Security Features

- Image files are automatically cleaned up after processing
- Safety settings configured for content filtering
- Error handling prevents sensitive data exposure
- Rate limiting and input validation

## Troubleshooting

### Common Issues

1. **Camera Access Denied**
   - Ensure HTTPS is enabled (required for camera access)
   - Check browser permissions for camera access

2. **Google Cloud Authentication Error**
   - Verify service account key is correctly placed
   - Check project ID in environment variables
   - Ensure Vertex AI API is enabled

3. **Image Processing Errors**
   - Check image format (JPEG, PNG supported)
   - Verify image size (max 10MB recommended)
   - Ensure stable internet connection

### Debug Mode

To enable debug logging, add to your `.env`:
```env
DEBUG=true
NODE_ENV=development
```

## Performance Optimization

- Images are compressed before sending to reduce upload time
- Response caching for repeated questions
- Progressive loading indicators
- Optimized image formats for faster processing

## Future Enhancements

- Batch processing for multiple images
- OCR text extraction
- Mathematical equation solving
- Diagram and chart analysis
- Multi-language support
- Offline processing capabilities 