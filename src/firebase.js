// JavaScript
// src.firebase.js
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDV-HMJonQ53nhsghJTXC-hHp4JfeEvvoE",
  authDomain: "examen-carso.firebaseapp.com",
  projectId: "examen-carso",
  storageBucket: "examen-carso.appspot.com",
  messagingSenderId: "643004098973",
  appId: "1:643004098973:web:ca4830cce74fff5e4a6774"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export {db}