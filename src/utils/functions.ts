import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db, firebaseAuth, signInWithGoogleProvider } from "../firebase";

export async function handleSignUp(credentials: {
  username: string;
  password: string;
  email: string;
  displayName: string;
}) {
  try {
    if (credentials.username && (await isUserNameTaken(credentials.username))) {
      alert("Username already taken");
      return;
    }

    await createUserWithEmailAndPassword(
      firebaseAuth,
      credentials.email,
      credentials.password
    );
    const user = firebaseAuth.currentUser;

    if (user) {
      const userRef = doc(db, "Users", user?.uid);
      setDoc(userRef, {
        username: credentials.username,
        displayName: credentials.displayName,
        email: credentials.email,
      });
      // localStorage.setItem("token", token);
      window.location.href = "/dashboard";
    }
  } catch (error: unknown) {
    if (
      error instanceof FirebaseError &&
      error.code === "auth/email-already-in-use"
    ) {
      alert("Email already in use");
      return;
    }
  }
}

export async function isUserNameTaken(username: string) {
  try {
    const userQuery = query(
      collection(db, "Users"),
      where("username", "==", username)
    );

    const user = await getDocs(userQuery);

    return !user.empty;
  } catch (error) {
    console.log(error);
  }
}

export async function handleGoogleAuth() {
  try {
    const response = await signInWithGoogleProvider();
    if (response.user) {
      // localStorage.setItem("token", token);
      window.location.href = "/dashboard";
    }
  } catch (error) {
    console.log("handleGoogleAuth", error);
  }
}

export async function handleSignIn(credentials: {
  username: string;
  password: string;
}) {
  try {
    const user = await getUserByUserName(credentials.username);
    if (!user) {
      alert("User not available");
      return;
    }

    const response = await signInWithEmailAndPassword(
      firebaseAuth,
      user.email,
      credentials.password
    );

    if (response.user) {
      // localStorage.setItem("token", token);
      window.location.href = "/dashboard";
    }
  } catch (error) {
    console.log("handleSignIn", error);
  }
}

export async function getUserByUserName(username: string) {
  try {
    const userQuery = query(
      collection(db, "Users"),
      where("username", "==", username)
    );

    const users = await getDocs(userQuery);

    if (!users.empty) {
      return users.docs[0].data();
    }
  } catch (error) {
    console.log("getUserByUserName", error);
  }
}
