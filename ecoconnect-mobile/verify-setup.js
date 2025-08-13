#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying EcoConnect Mobile Setup...\n');

// Check if all required files exist
const requiredFiles = [
  'package.json',
  'tsconfig.json',
  'app.json',
  'App.tsx',
  '.eslintrc.js',
  '.prettierrc',
  'jest.config.js',
  'src/types/index.ts',
  'src/utils/constants.ts',
  'src/utils/helpers.ts',
  'src/utils/validation.ts',
  'src/components/ui/Button.tsx',
  'src/components/ui/Card.tsx',
  'src/components/ui/LoadingSpinner.tsx',
  'src/components/screens/HomeScreen.tsx',
  'src/components/screens/CameraScreen.tsx',
  'src/components/screens/ProfileScreen.tsx',
  'src/components/screens/VendorsScreen.tsx',
  'src/components/screens/LeaderboardScreen.tsx',
  'src/services/firebase.ts',
  'src/services/camera.ts',
  'src/services/location.ts',
  'src/services/offline.ts',
  'src/services/gamification.ts',
  'src/store/authStore.ts',
  'src/store/userStore.ts',
  'src/store/offlineStore.ts',
  'src/store/cameraStore.ts',
];

let allFilesExist = true;

console.log('📁 Checking file structure...');
requiredFiles.forEach(file => {
  if (fs.existsSync(path.join(__dirname, file))) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

// Check package.json dependencies
console.log('\n📦 Checking dependencies...');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

const requiredDependencies = [
  'expo',
  'react',
  'react-native',
  'zustand',
  '@tanstack/react-query',
  '@react-navigation/native',
  '@react-navigation/bottom-tabs',
  '@react-navigation/stack',
  'firebase',
  'expo-camera',
  'expo-location',
  'expo-notifications',
  'expo-secure-store',
  '@react-native-async-storage/async-storage',
  'react-native-maps',
  'react-hook-form',
  '@hookform/resolvers',
  'zod'
];

let allDepsInstalled = true;

requiredDependencies.forEach(dep => {
  if (packageJson.dependencies[dep]) {
    console.log(`✅ ${dep} - ${packageJson.dependencies[dep]}`);
  } else {
    console.log(`❌ ${dep} - MISSING`);
    allDepsInstalled = false;
  }
});

// Check TypeScript configuration
console.log('\n🔧 Checking TypeScript configuration...');
const tsConfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
if (tsConfig.compilerOptions && tsConfig.compilerOptions.paths) {
  console.log('✅ Path mapping configured');
} else {
  console.log('❌ Path mapping not configured');
}

// Check app.json configuration
console.log('\n📱 Checking Expo configuration...');
const appJson = JSON.parse(fs.readFileSync('app.json', 'utf8'));
if (appJson.expo && appJson.expo.name === 'EcoConnect') {
  console.log('✅ App name configured');
} else {
  console.log('❌ App name not configured');
}

if (appJson.expo && appJson.expo.ios && appJson.expo.ios.bundleIdentifier) {
  console.log('✅ iOS bundle identifier configured');
} else {
  console.log('❌ iOS bundle identifier not configured');
}

if (appJson.expo && appJson.expo.android && appJson.expo.android.package) {
  console.log('✅ Android package name configured');
} else {
  console.log('❌ Android package name not configured');
}

// Summary
console.log('\n📊 Setup Summary:');
console.log(`Files: ${allFilesExist ? '✅ All required files present' : '❌ Some files missing'}`);
console.log(`Dependencies: ${allDepsInstalled ? '✅ All dependencies installed' : '❌ Some dependencies missing'}`);

if (allFilesExist && allDepsInstalled) {
  console.log('\n🎉 Setup verification PASSED! The project is ready for development.');
  console.log('\n🚀 Next steps:');
  console.log('1. Run "npm start" to start the development server');
  console.log('2. Begin implementing Task 2: Firebase integration and authentication');
  console.log('3. Continue with the remaining tasks in the implementation plan');
} else {
  console.log('\n⚠️  Setup verification FAILED! Please fix the issues above.');
}

console.log('\n📋 Available commands:');
console.log('- npm start          # Start development server');
console.log('- npm run type-check # Check TypeScript compilation');
console.log('- npm run lint       # Run ESLint');
console.log('- npm test           # Run tests (when implemented)');