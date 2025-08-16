#!/usr/bin/env node

/**
 * Firebase Configuration Test Script
 * Run this script to verify your Firebase setup
 */

require('dotenv').config();

const requiredEnvVars = [
  'EXPO_PUBLIC_FIREBASE_API_KEY',
  'EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'EXPO_PUBLIC_FIREBASE_PROJECT_ID',
  'EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'EXPO_PUBLIC_FIREBASE_APP_ID'
];

console.log('🔥 Firebase Configuration Test\n');

// Check if all required environment variables are set
let allConfigured = true;
const config = {};

requiredEnvVars.forEach(varName => {
  const value = process.env[varName];
  config[varName] = value;
  
  if (!value || value.includes('your_') || value.includes('XXXXX')) {
    console.log(`❌ ${varName}: Not configured (${value || 'missing'})`);
    allConfigured = false;
  } else {
    console.log(`✅ ${varName}: Configured`);
  }
});

console.log('\n📋 Configuration Summary:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

if (allConfigured) {
  console.log('🎉 All Firebase environment variables are configured!');
  console.log('\n🚀 Next steps:');
  console.log('1. Make sure you\'ve enabled Authentication in Firebase Console');
  console.log('2. Set up Firestore Database');
  console.log('3. Set up Firebase Storage');
  console.log('4. Restart your Expo development server');
  console.log('\n💡 Run: npm start');
} else {
  console.log('⚠️  Some Firebase environment variables need to be configured.');
  console.log('\n🔧 To fix this:');
  console.log('1. Go to Firebase Console: https://console.firebase.google.com/');
  console.log('2. Select your project');
  console.log('3. Go to Project Settings > General');
  console.log('4. Scroll down to "Your apps" section');
  console.log('5. Click on the web app you created');
  console.log('6. Copy the config values to your .env file');
}

console.log('\n📚 Full setup guide: ./FIREBASE_SETUP.md');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');