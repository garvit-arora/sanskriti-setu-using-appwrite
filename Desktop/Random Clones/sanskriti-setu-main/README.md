# Sanskriti Setu - Cultural Bridge Platform

A modern React-based platform connecting people through shared cultural interests, built with Appwrite backend services.

## Features

✨ **Real User Registration & Authentication**
- Multi-step registration with comprehensive profile setup
- Secure authentication powered by Appwrite
- Profile picture uploads with storage integration

🎯 **Intelligent Profile Matching**
- Cosine similarity-based recommendation system
- Match users based on cultural interests, skills, and teaching abilities
- Real-time profile suggestions on dashboard

🌍 **Rich Cultural Content**
- Interactive guides covering dance, music, festivals, arts, cuisine, and philosophy
- Categorized learning materials with difficulty levels
- Searchable knowledge base

🗺️ **Interactive India Map (KYC - Know Your Culture)**
- Explore different Indian states and their cultures
- State-wise cultural information and traditions

👤 **Complete Profile Management**
- Edit personal information, skills, and interests
- Upload and update profile pictures
- Manage cultural preferences and teaching abilities

🎨 **Modern UI/UX**
- Responsive design with smooth animations
- Gradient backgrounds and modern components
- Mobile-friendly interface

## Tech Stack

### Frontend
- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router DOM** for navigation
- **React Hot Toast** for notifications

### Backend
- **Appwrite** for authentication, database, and storage
- **Cloud-based** backend services
- **Real-time** data synchronization

### Key Dependencies
```json
{
  "react": "^19.1.1",
  "appwrite": "^latest",
  "framer-motion": "^12.23.12",
  "react-hot-toast": "^2.6.0",
  "react-router-dom": "^7.9.1",
  "tailwindcss": "^3.4.17"
}
```

## Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd sanskriti-setu-main
```

### 2. Install Dependencies
```bash
cd client
npm install
```

### 3. Set Up Appwrite

#### Create Appwrite Project
1. Go to [Appwrite Console](https://cloud.appwrite.io/)
2. Create a new project
3. Note down your project ID

#### Configure Environment Variables
Create a `.env` file in the `client` directory:

```env
# Appwrite Configuration
REACT_APP_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
REACT_APP_APPWRITE_PROJECT_ID=your-project-id
REACT_APP_APPWRITE_DATABASE_ID=sanskriti-db
REACT_APP_APPWRITE_PROFILE_COLLECTION_ID=profiles
REACT_APP_APPWRITE_STORAGE_ID=avatars
```

#### Set Up Appwrite Services

1. **Create Database**
   - Database ID: `sanskriti-db`

2. **Create Collection**
   - Collection ID: `profiles`
   - Attributes:
     ```
     userId (string, required, 255 chars)
     name (string, required, 255 chars)
     email (string, required, 255 chars)
     avatar (string, optional, 2000 chars)
     state (string, required, 255 chars)
     city (string, required, 255 chars)
     bio (string, optional, 2000 chars)
     age (integer, required)
     gender (string, required, 50 chars)
     primaryLanguages (array, optional)
     culturalInterests (array, optional)
     skills (array, optional)
     teachingAbilities (array, optional)
     hobbies (array, optional)
     points (integer, default: 0)
     level (integer, default: 1)
     ```

3. **Create Storage Bucket**
   - Bucket ID: `avatars`
   - Enable file uploads for images
   - Set appropriate permissions

4. **Configure Authentication**
   - Enable Email/Password authentication
   - Set up your domain in the platform settings

### 4. Run the Application
```bash
npm start
```

The application will start on `http://localhost:3000`

## Project Structure

```
sanskriti-setu-main/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   ├── Login.tsx
│   │   │   │   └── Register.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Profile.tsx
│   │   │   ├── Guides.jsx
│   │   │   └── ...
│   │   ├── lib/
│   │   │   └── appwrite.ts
│   │   ├── services/
│   │   └── App.tsx
│   ├── public/
│   └── package.json
└── README.md
```

## Key Features Explained

### Registration Process
1. **Step 1**: Basic account information (name, email, password)
2. **Step 2**: Detailed profile setup including:
   - Personal details (age, gender, location)
   - Cultural interests and skills
   - Teaching abilities and hobbies
   - Primary languages

### Profile Matching Algorithm
The platform uses cosine similarity to match users based on:
- Cultural interests overlap
- Shared skills and hobbies
- Teaching/learning complementarity
- Geographic proximity

### Cultural Guides System
- **6 Main Categories**: Dance, Music, Festivals, Arts, Cuisine, Philosophy
- **Difficulty Levels**: Beginner, Intermediate, Advanced
- **Rich Content**: Detailed descriptions, tags, and estimated reading time

## Development

### Available Scripts
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run lint       # Run linting (if configured)
```

### Environment Setup
- Node.js 16+ required
- npm or yarn package manager
- Modern browser with ES6+ support

## Deployment

### Vercel Deployment (Recommended)
This project is optimized for Vercel deployment:

1. **Quick Deploy**:
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

2. **Manual Deployment**:
   ```bash
   npm i -g vercel
   vercel
   ```

3. **Set Environment Variables** in Vercel dashboard:
   - `REACT_APP_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1`
   - `REACT_APP_APPWRITE_PROJECT_ID=your-project-id`
   - `REACT_APP_APPWRITE_DATABASE_ID=your-database-id`
   - `REACT_APP_APPWRITE_USER_COLLECTION_ID=users`
   - `REACT_APP_APPWRITE_PROFILE_COLLECTION_ID=profiles`
   - `REACT_APP_APPWRITE_STORAGE_ID=your-storage-id`

### Alternative Deployments
- **GitHub Pages** (static hosting)
- **Firebase Hosting**
- Any static hosting service

### Backend (Appwrite)
- Uses Appwrite Cloud (recommended)
- Can be self-hosted if needed
- Automatic scaling and management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the setup instructions

## Acknowledgments

- Built with React and modern web technologies
- Powered by Appwrite backend services
- Inspired by the rich cultural heritage of India
- Community-driven cultural learning platform

---

**"Sanskriti Setu - Bridging Cultures, Connecting Hearts"**