# 🎬 Movie Explorer

A modern React Native movie discovery app built with Expo, featuring TMDB API integration, beautiful UI, and smooth navigation.

## ✨ Features

### 🎭 Movie Discovery

- **Popular Movies**: Trending movies with horizontal scrolling
- **Now Playing**: Currently in theaters
- **Top Rated**: Highest rated movies of all time
- **Coming Soon**: Upcoming releases
- **Movie Details**: Comprehensive movie information with cast, crew, and details

### 🎨 User Experience

- **Modern UI**: Dark gradient theme with beautiful movie cards
- **Smooth Navigation**: Modal-based movie details with gesture support
- **Responsive Design**: Optimized for all screen sizes
- **Loading States**: Elegant loading animations and error handling
- **Splash Screen**: Professional app launch experience

### 🔐 Authentication

- **Clerk Integration**: Secure user authentication
- **Google Sign-In**: Easy social login
- **Profile Management**: User profiles with settings

### 📱 Technical Features

- **TypeScript**: Full type safety throughout the app
- **React Query**: Efficient data fetching and caching
- **Expo Router**: File-based navigation system
- **Safe Area**: Proper handling of device notches and status bars

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- TMDB API key (free)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd movies-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   EXPO_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key_here
   ```

4. **Get TMDB API Key**

   - Visit [The Movie Database (TMDB)](https://www.themoviedb.org/)
   - Sign up for a free account
   - Go to Settings → API → Create API Key
   - Copy your API key to the `.env` file

5. **Start the development server**

   ```bash
   npm start
   # or
   yarn start
   ```

6. **Run on device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app

## 🏗️ Project Structure

```
movies-app/
├── app/                          # Expo Router pages
│   ├── (app)/                    # Authenticated app routes
│   │   ├── (tabs)/              # Tab navigation
│   │   │   ├── index.tsx        # Home page
│   │   │   └── profile/         # Profile page
│   │   └── movie/               # Movie details
│   │       └── [id].tsx         # Dynamic movie page
│   └── _layout.tsx              # Root layout
├── components/                   # Reusable components
│   ├── movies/                  # Movie-related components
│   │   ├── Movies.tsx          # Main movies component
│   │   ├── MovieCard.tsx       # Individual movie card
│   │   └── MovieSection.tsx    # Movie category sections
│   └── SplashScreen.tsx        # App splash screen
├── hooks/                       # Custom React hooks
│   ├── data/                   # Data fetching hooks
│   │   ├── usePopularMovies.ts
│   │   ├── useTopRatedMovies.ts
│   │   ├── useNowPlayingMovies.ts
│   │   └── useUpcomingMovies.ts
│   └── useFetchData.ts         # Generic data fetching hook
├── libs/                        # API and utilities
│   └── data/
│       └── movies.ts           # TMDB API functions
├── types/                       # TypeScript type definitions
│   ├── movie.ts                # Movie-related types
│   └── data.ts                 # Data fetching types
└── constants/
    ├── Colors.ts               # App color scheme
    └── Api.ts                  # API configuration
```

## 🎯 Key Components

### MovieCard

- Displays movie poster, title, rating, and year
- Handles navigation to movie details
- Responsive design with proper aspect ratios

### MovieSection

- Reusable component for different movie categories
- Supports both horizontal and grid layouts
- Includes loading states and error handling

### Movie Details Modal

- Full-screen movie information
- Backdrop images and movie posters
- Cast and crew information
- Movie statistics and details

## 🔧 API Integration

### TMDB API Endpoints Used

- `/movie/popular` - Popular movies
- `/movie/top_rated` - Top rated movies
- `/movie/now_playing` - Currently playing
- `/movie/upcoming` - Upcoming releases
- `/movie/{id}` - Movie details
- `/movie/{id}/credits` - Cast and crew

### Data Caching

- React Query for efficient data fetching
- 5-minute stale time for movie data
- Automatic background refetching
- Error handling and retry logic

## 🎨 Design System

### Colors

- **Primary**: Dark blue gradient (`#1a1a2e` to `#16213e`)
- **Accent**: Purple (`#6849a7`)
- **Text**: White and light gray for contrast
- **Status Bar**: Light content on dark background

### Typography

- **Headers**: Bold, large text for titles
- **Body**: Readable font sizes with proper line height
- **Captions**: Smaller text for metadata

### Layout

- **Safe Areas**: Proper handling of device notches
- **Responsive**: Adapts to different screen sizes
- **Spacing**: Consistent padding and margins

## 📱 Navigation

### Tab Navigation

- **Home**: Movie discovery and browsing
- **Profile**: User settings and authentication

### Modal Navigation

- **Movie Details**: Full-screen movie information
- **Gesture Support**: Swipe to dismiss modals

## 🔐 Authentication

### Clerk Integration

- Secure user authentication
- Social login with Google
- Session management
- Protected routes

### User Features

- Profile management
- Settings and preferences
- Sign out functionality

## 🚀 Deployment

### Development

```bash
npm start
```

### Production Build

```bash
# iOS
npx expo build:ios

# Android
npx expo build:android
```

### App Store Deployment

1. Configure app.json with proper bundle identifiers
2. Build production version
3. Submit to respective app stores

## 🛠️ Development

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Consistent naming conventions
- Component-based architecture

### Performance

- Image optimization
- Lazy loading
- Efficient data fetching
- Smooth animations

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions:

- Create an issue in the repository
- Check the documentation
- Review the code comments

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for the amazing API
- [Expo](https://expo.dev/) for the development platform
- [Clerk](https://clerk.dev/) for authentication
- [React Query](https://tanstack.com/query) for data fetching

---

**Made with ❤️ for movie lovers everywhere**
