# EcoConnect Mobile App

AI-Powered Gamified Waste Management Mobile Application for India

## 🌱 Overview

EcoConnect Mobile is a React Native application built with Expo that provides native mobile experiences for waste classification, vendor discovery, and environmental impact tracking. The app features offline-first architecture, enhanced camera integration, and location-based services optimized for India's mobile-first market.

## 🚀 Features

- **🔐 User Authentication**: Email/password signup, login, and password reset
- **👤 User Profiles**: Personalized profiles with eco-points and achievements
- **🌱 Eco Challenges**: Daily/weekly challenges with offline tracking
- **📱 Community Feed**: Share eco-actions with photos and social features
- **📚 Learning Resources**: Sustainability articles and tips
- **📷 Camera Integration**: Scan products and upload eco-action photos
- **🔔 Push Notifications**: Challenge reminders and eco-tips
- **🏆 Gamification**: Points, badges, and leaderboards
- **📍 Location Services**: Find nearby recycling centers
- **♿ Accessibility**: Full WCAG compliance with screen reader support
- **📱 Cross-Platform**: Runs on both iOS and Android devices
- **🔄 Offline-First**: Works seamlessly even with poor connectivity

## 🛠 Tech Stack

- **Framework**: React Native with Expo SDK 53+
- **State Management**: Zustand + React Query
- **Navigation**: React Navigation v6
- **Backend**: Firebase (Auth, Firestore, Storage, Functions)
- **Camera**: Expo Camera with ML integration
- **Maps**: React Native Maps
- **Storage**: AsyncStorage + Expo SecureStore
- **Testing**: Jest + React Native Testing Library

## 📱 Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecoconnect-mobile
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase and environment variables**
   ```bash
   cp .env.example .env
   # Follow FIREBASE_SETUP.md for detailed Firebase configuration
   # Add your Firebase configuration to .env file
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on device/simulator**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web (for testing)
   npm run web
   ```

## 🏗 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components
│   └── screens/        # Screen-specific components
├── services/           # API and external service integrations
├── store/              # State management (Zustand stores)
├── types/              # TypeScript type definitions
├── utils/              # Utility functions and constants
└── test/               # Test setup and utilities
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Type checking
npm run type-check

# Linting
npm run lint
```

## 📦 Building

```bash
# Build for Android
npm run build:android

# Build for iOS
npm run build:ios
```

## 🔥 Firebase Setup

**Important**: You need to set up Firebase to use authentication and data features.

1. **Quick Setup**: Follow the detailed guide in [`FIREBASE_SETUP.md`](./FIREBASE_SETUP.md)
2. **Copy environment variables**: `cp .env.example .env`
3. **Add your Firebase config** to the `.env` file

### Required Environment Variables

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

**Without Firebase setup, the app will show demo screens only.**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ for a sustainable future
- Inspired by India's waste management challenges
- Powered by the React Native and Expo communities