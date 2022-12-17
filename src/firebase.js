import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // apiKey: "AIzaSyDHnK7QqLNrW2yVLsFLH9MlS3Q1c5lHVLI",
  // authDomain: "instagram-clone-a49ad.firebaseapp.com",
  // projectId: "instagram-clone-a49ad",
  // storageBucket: "instagram-clone-a49ad.appspot.com",
  // messagingSenderId: "393827576103",
  // appId: "1:393827576103:web:28ffe078349fab58f96102"

  apiKey: "AIzaSyD6d-IfAnwHOxfwl7GuczfOBbSTAoqQNR4",
  authDomain: "instagram-4528b.firebaseapp.com",
  projectId: "instagram-4528b",
  storageBucket: "instagram-4528b.appspot.com",
  messagingSenderId: "914494289927",
  appId: "1:914494289927:web:0f32a965060400b15992a2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();