// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import { getUserByEmail } from "./utils/functions";

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

export const db = getFirestore(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp);

const googleProvider = new GoogleAuthProvider();
export const signInWithGoogleProvider = () =>
  signInWithPopup(firebaseAuth, googleProvider);

firebaseAuth.onAuthStateChanged(async (authUser) => {
  if (authUser) {
    const user = await getUserByEmail(authUser.email || "");
    localStorage.setItem("token", await authUser.getIdToken());
    localStorage.setItem("authUser", JSON.stringify({ ...authUser, ...user }));
  } else localStorage.removeItem("authUser");
});

export default firebaseApp;
