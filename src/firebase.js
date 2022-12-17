import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "instagram-clone-a49ad.firebaseapp.com",
  projectId: "instagram-clone-a49ad",
  storageBucket: "instagram-clone-a49ad.appspot.com",
  messagingSenderId: "393827576103",
  appId: "1:393827576103:web:28ffe078349fab58f96102"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();