// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAj8PyqXn0Pz0Fyg6S-5whKZlH_RzPiaEg",
  authDomain: "likely-100.firebaseapp.com",
  projectId: "likely-100",
  storageBucket: "likely-100.firebasestorage.app",
  messagingSenderId: "131337081557",
  appId: "1:131337081557:web:773babf5d5306d7dd2885c",
  measurementId: "G-5DV06NLGD8",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firebaseApp);
export default firebaseApp;
