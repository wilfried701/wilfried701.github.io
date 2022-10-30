// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGoxGHUb0E8l-t3no4gD_n-O5NkcfCvPA",
  authDomain: "to-do-list-ee98b.firebaseapp.com",
  projectId: "to-do-list-ee98b",
  storageBucket: "to-do-list-ee98b.appspot.com",
  messagingSenderId: "294883090379",
  appId: "1:294883090379:web:fc569804a4ef01336e604e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
