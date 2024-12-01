// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDX7eL_KxfFk2QG_u3_sq2lE_vbLCq6Gxw",
  authDomain: "easy-diary-12c70.firebaseapp.com",
  projectId: "easy-diary-12c70",
  storageBucket: "easy-diary-12c70.firebasestorage.app",
  messagingSenderId: "825785926393",
  appId: "1:825785926393:web:1cced5d56a2e8c0395d828",
  measurementId: "G-G69E4S8ZZL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);