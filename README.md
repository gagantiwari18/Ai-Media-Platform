# AI Media Analysis

A modern web application that uses AI to extract text and generate prompts from images, transcribe audio files, and analyze video content. Built with React + TypeScript frontend and Flask backend, powered by Google's Gemini AI models.

## 🚀 Features

### 📸 Image to Text
- Upload images in various formats (JPEG, PNG, GIF, WebP)
- AI-powered prompt generation using Gemini 2.0 Flash
- Real-time image preview
- Markdown-formatted output
- Copy and download functionality

### 🎵 Audio to Text
- Support for MP3, WAV, and OGG audio files
- Speech transcription using Gemini 2.0 Flash
- Built-in audio player with controls
- Progress tracking and duration display
- High-quality transcription output

### 🎬 Video to Text
- Video file processing (MP4, WebM, MOV, AVI)
- Content analysis and description generation
- Video preview with custom controls
- File metadata extraction
- AI-powered content understanding

### 🎨 UI/UX Features
- **Dark/Light Mode**: Toggle between themes
- **Responsive Design**: Works on all device sizes
- **Drag & Drop**: Easy file upload interface
- **Loading States**: Visual feedback during processing
- **Error Handling**: Graceful error messages
- **Markdown Rendering**: Rich text output formatting

## 🏗️ Architecture

```
ai-media-platform/
├── frontend/                 # React + TypeScript frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── hooks/          # Custom React hooks
│   │   └── utils/          # Utility functions
│   ├── package.json
│   └── vite.config.ts
├── backend/                 # Flask Python backend
│   ├── app.py              # Main Flask application
│   ├── .env                # Environment variables (not in repo)
│   ├── .env.example        # Environment template
│   ├── requirements.txt    # Python dependencies
│   └── venv/               # Python virtual environment
├── .gitignore              # Git ignore rules
├── LICENSE                 # MIT License
└── README.md               # This file
```

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **React Markdown** - Markdown rendering
- **Lucide React** - Icon library
- **React Toastify** - Notifications

### Backend
- **Flask** - Python web framework
- **Flask-CORS** - Cross-origin resource sharing
- **Google Generative AI** - AI model integration
- **Tempfile** - Temporary file handling

### AI Models
- **Gemini 2.0 Flash** - Image analysis and prompt generation
- **Gemini 2.5 Flash** - Audio transcription and video analysis

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **Python** (v3.8 or higher)
- **Google AI API Key** (from [Google AI Studio](https://makersuite.google.com/app/apikey))

## 🔐 Security & Environment Setup

This project uses environment variables to securely store API keys and configuration:

- ✅ **`.env`** - Contains your actual API keys (never commit this)
- ✅ **`.env.example`** - Template showing required variables
- ✅ **`.gitignore`** - Ensures sensitive files aren't committed

**Important Files:**
- `backend/.env` - Your actual environment variables
- `backend/.env.example` - Template to copy
- `.gitignore` - Protects sensitive files

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ai-media-platform
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
# Copy the example environment file
cp .env.example .env

# Edit .env file and add your Google AI API key
# Replace 'your_google_ai_api_key_here' with your actual API key
nano .env  # or use any text editor
```

**Important**: You need to get a Google AI API key from [Google AI Studio](https://makersuite.google.com/app/apikey) and add it to your `.env` file.

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Install additional dependencies if needed
npm install react-markdown
```

### 4. Configuration

#### Backend Configuration

1. **Environment Variables**: Copy the example file and configure:
```bash
cd backend
cp .env.example .env
```

2. **Edit `.env` file** with your actual values:
```bash
# Google AI API Configuration
GOOGLE_AI_API_KEY=your_actual_google_ai_api_key_here

# Flask Configuration
FLASK_ENV=development
FLASK_DEBUG=True
PORT=5000

# CORS Configuration (for production)
CORS_ORIGINS=http://localhost:5173,https://yourdomain.com
```

3. **Get Google AI API Key**:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the key to your `.env` file

**⚠️ Security Note**: Never commit the `.env` file to version control. It's already included in `.gitignore`.

#### Frontend Configuration
The frontend is configured to proxy API requests to the backend. No additional configuration needed.

## 🏃‍♂️ Running the Application

### Start Backend Server
```bash
cd backend
source venv/bin/activate  # Activate virtual environment
python app.py
```
The backend will run on `http://localhost:5000`

### Start Frontend Development Server
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:5173`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### POST /api/image-to-text
Upload an image and get AI-generated text prompt.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: Form data with 'image' field containing the image file

**Response:**
```json
{
  "text": "AI-generated markdown text describing the image"
}
```

**Supported Formats:** JPEG, PNG, GIF, WebP
**Max File Size:** 10MB

#### POST /api/audio-to-text
Upload an audio file and get transcribed text.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: Form data with 'audio' field containing the audio file

**Response:**
```json
{
  "text": "Transcribed text in markdown format"
}
```

**Supported Formats:** MP3, WAV, OGG
**Max File Size:** 50MB

#### POST /api/video-to-text
Upload a video file and get content analysis.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: Form data with 'video' field containing the video file

**Response:**
```json
{
  "text": "Video analysis and description in markdown format"
}
```

**Supported Formats:** MP4, WebM, MOV, AVI
**Max File Size:** 100MB

## 🧩 Component Structure

### Core Components

#### `FileUpload.tsx`
- Drag & drop file upload interface
- File validation and preview
- Progress indicators
- Error handling

#### `TextDisplay.tsx`
- Markdown text rendering
- Copy to clipboard functionality
- Download as text file
- Responsive design

#### `LoadingSpinner.tsx`
- Loading states with custom messages
- Animated spinner with gradient effects
- Dark mode support

#### `ImageToText.tsx`
- Image upload and preview
- AI prompt generation
- Real-time processing feedback

#### `AudioToText.tsx`
- Audio file upload and playback
- Custom audio controls
- Transcription display

#### `VideoToText.tsx`
- Video upload and preview
- Custom video player controls
- Content analysis results

### Utility Functions

#### `api.ts`
- API communication layer
- Error handling
- Request/response formatting

#### `fileValidation.ts`
- File type validation
- Size limit checking
- Format verification

### Custom Hooks

#### `useTheme.tsx`
- Dark/light mode management
- Theme persistence
- System theme detection

## 🎨 Styling & Theming

The application uses **Tailwind CSS** with a custom design system:

### Color Palette
- **Primary:** Purple/Pink gradient (`from-purple-600 to-pink-600`)
- **Secondary:** Green/Teal (`from-green-500 to-teal-500`)
- **Accent:** Orange/Red (`from-orange-600 to-red-600`)

### Dark Mode
- Automatic system theme detection
- Manual toggle capability
- Persistent theme preference
- Smooth transitions between modes

### Responsive Design
- Mobile-first approach
- Breakpoint-based layouts
- Touch-friendly interfaces
- Optimized for all screen sizes

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```
GOOGLE_AI_API_KEY=your_gemini_api_key
FLASK_ENV=development
FLASK_DEBUG=True
```

#### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

### Build Configuration

#### Vite Configuration (`vite.config.ts`)
```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
```

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy the 'dist' folder
```

### Backend Deployment (Heroku/Railway)
```bash
cd backend
# Create requirements.txt
pip freeze > requirements.txt

# Create Procfile
echo "web: python app.py" > Procfile

# Deploy using your preferred platform
```

### Environment Variables for Production
- Set `GOOGLE_AI_API_KEY` in your deployment platform
- Update API base URLs for production
- Configure CORS for your domain
- Use `.env.example` as a template for required variables

## 🔒 Security Considerations

1. **API Key Protection**
   - Never commit API keys to version control
   - Use environment variables
   - Implement rate limiting

2. **File Upload Security**
   - File type validation
   - Size limits enforcement
   - Temporary file cleanup

3. **CORS Configuration**
   - Restrict origins in production
   - Configure proper headers

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm run lint          # ESLint checking
npm run type-check     # TypeScript validation
```

### Backend Testing
```bash
cd backend
python -m pytest     # Run tests (if implemented)
```

## 📈 Performance Optimization

### Frontend Optimizations
- Code splitting with React.lazy()
- Image optimization and lazy loading
- Bundle size optimization
- Caching strategies

### Backend Optimizations
- File streaming for large uploads
- Temporary file cleanup
- Error handling and timeouts
- API response caching

## 🐛 Troubleshooting

### Common Issues

#### "Failed to load resource: 404"
- Ensure backend server is running on port 5000
- Check Vite proxy configuration
- Verify API endpoint URLs

#### "API Key Error"
- Verify Google AI API key is correct
- Check API key permissions
- Ensure quota limits aren't exceeded

#### "File Upload Fails"
- Check file size limits
- Verify file format support
- Ensure proper CORS configuration

#### "Module Not Found"
- Run `npm install` in frontend directory
- Run `pip install -r requirements.txt` in backend
- Check virtual environment activation

## 📝 Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow ESLint configuration
- Implement proper error handling
- Write descriptive commit messages

### Component Guidelines
- Keep components focused and reusable
- Use proper TypeScript interfaces
- Implement loading and error states
- Follow accessibility best practices

### API Guidelines
- Use consistent response formats
- Implement proper error codes
- Add request validation
- Document all endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License. See LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review the API documentation

## 🔮 Future Enhancements

- [ ] Batch file processing
- [ ] User authentication
- [ ] File history and management
- [ ] Advanced AI model options
- [ ] Real-time collaboration
- [ ] Mobile app development
- [ ] API rate limiting
- [ ] Advanced analytics
- [ ] Custom model training
- [ ] Integration with cloud storage

---

**Built using React, TypeScript, Flask, and Google Gemini AI**
