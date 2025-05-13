// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: process.env.REACT_APP_API_KEY,
  apiKey: "AIzaSyDdBAx6luBzr6MtJDvjc1Fl_2xS1VPME2k",
  // authDomain:  process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_API_APP_ID
  authDomain: "finance-tracker-b6ff1.firebaseapp.com",
  projectId: "finance-tracker-b6ff1",
  storageBucket: "finance-tracker-b6ff1.firebasestorage.app",
  messagingSenderId: "472463008086",
  appId: "1:472463008086:web:86b1693a9c1f160e43b6f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;