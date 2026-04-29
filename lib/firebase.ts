import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDkiN3ShjbtmOpKlSpGhOz_5fDlHzqynYI",
  authDomain: "nexus-2e3e1.firebaseapp.com",
  projectId: "nexus-2e3e1",
  storageBucket: "nexus-2e3e1.firebasestorage.app",
  messagingSenderId: "1036315885671",
  appId: "1:1036315885671:web:10c63d32de6fe8a9e714c2",
  measurementId: "G-MSQQ7PR17W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);