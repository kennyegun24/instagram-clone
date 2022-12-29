import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "instagram-4528b.firebaseapp.com",
  projectId: "instagram-4528b",
  storageBucket: "instagram-4528b.appspot.com",
  messagingSenderId: "914494289927",
  appId: process.env.REACT_APP_APPID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();