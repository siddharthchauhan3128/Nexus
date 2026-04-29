import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: process.env.api_key,
  authDomain: process.env.auth_domain,
  projectId: process.env.project_Id,
  storageBucket: "nexus-2e3e1.firebasestorage.app",
  messagingSenderId: "1036315885671",
  appId: "1:1036315885671:web:10c63d32de6fe8a9e714c2",
  measurementId: "G-MSQQ7PR17W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);