import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCM2eCpQAlQ9KD1OpQL3f1yNxNoK0Z5AVU",
  authDomain: "redux-portal.firebaseapp.com",
  projectId: "redux-portal",
  storageBucket: "redux-portal.firebasestorage.app",
  messagingSenderId: "969163153460",
  appId: "1:969163153460:web:1c86f2517a477a23b8aa61",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);  
export const db = getFirestore(app);