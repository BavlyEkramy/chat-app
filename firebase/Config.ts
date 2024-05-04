import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyDtWJKew6XVgvxIXWQH1GFQyTVDSoYf-8I",
//   authDomain: "chat-2078d.firebaseapp.com",
//   projectId: "chat-2078d",
//   storageBucket: "chat-2078d.appspot.com",
//   messagingSenderId: "1074780575020",
//   appId: "1:1074780575020:web:3b4cd4fd88bdb17e734889",
//   measurementId: "G-ZT0H393MVV",
// };
const firebaseConfig = {
  apiKey: "AIzaSyBL24DS3Fc2LoAAXXUsjLc5MZMEZFLVJn0",
  authDomain: "chat-app-e57d9.firebaseapp.com",
  projectId: "chat-app-e57d9",
  storageBucket: "chat-app-e57d9.appspot.com",
  messagingSenderId: "426672243798",
  appId: "1:426672243798:web:1b0372a3a98e5a059b27f7",
  measurementId: "G-WND91WR76P",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
