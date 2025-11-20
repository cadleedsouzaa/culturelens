// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCb1gC4PVuXFLq-Hx7R8Hepk8C00o3OBY0",
  authDomain: "cultureverse-lens-v2.firebaseapp.com",
  projectId: "cultureverse-lens-v2",
  storageBucket: "cultureverse-lens-v2.firebasestorage.app",
  messagingSenderId: "567805173606",
  appId: "1:567805173606:web:e093add819c53c0b51f2a7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the services so our app can use them
export const db = getFirestore(app);