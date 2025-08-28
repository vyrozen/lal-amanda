// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGT1KVwQNsQXxczn1Z2FsbiH7ZDL5pmAc",
  authDomain: "vzn-app-service.firebaseapp.com",
  projectId: "vzn-app-service",
  storageBucket: "vzn-app-service.firebasestorage.app",
  messagingSenderId: "984495629389",
  appId: "1:984495629389:web:af7b281390c72cd7526804",
  measurementId: "G-TF5ZVK3NMV",
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize firestore
const db = getFirestore(app);

// Initialize storage

export { auth, app, db };
