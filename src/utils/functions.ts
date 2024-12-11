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
import { COLORS } from "./Data";

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

    const photoURL = await fetchAvatar(credentials.username);

    await createUserWithEmailAndPassword(
      firebaseAuth,
      credentials.email,
      credentials.password
    );

    const user = firebaseAuth.currentUser;

    if (user) {
      const userRef = doc(db, "Users", user?.uid);
      const payload = {
        username: credentials.username,
        displayName: credentials.displayName,
        email: credentials.email,
        photoURL,
      };
      await setDoc(userRef, payload);

      localStorage.setItem("token", await user.getIdToken());
      localStorage.setItem("authUser", JSON.stringify({ ...user, ...payload }));
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
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
      localStorage.setItem("token", await response.user.getIdToken());
      localStorage.setItem("authUser", JSON.stringify(response.user));
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
      localStorage.setItem("token", await response.user.getIdToken());
      localStorage.setItem(
        "authUser",
        JSON.stringify({ ...response.user, ...user })
      );
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

export async function getUserByEmail(email: string) {
  try {
    const userQuery = query(
      collection(db, "Users"),
      where("email", "==", email)
    );

    const users = await getDocs(userQuery);

    if (!users.empty) {
      return users.docs[0].data();
    }
  } catch (error) {
    console.log("getUserByUserName", error);
  }
}

export const getRandomColor = () => {
  const ind = Math.floor(Math.random() * COLORS.length);
  return COLORS[ind];
};

async function fetchAvatar(username: string) {
  try {
    const avatarUrl = `https://api.dicebear.com/9.x/lorelei/svg?seed=${username}`;
    const response = await fetch(avatarUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch avatar");
    }
    const blob = await response.blob();
    return uploadToCloudinary(blob, username);
  } catch (error) {
    console.log("fetchAvatar", error);
  }
}

async function uploadToCloudinary(blob: Blob, fileName: string) {
  const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
  const UPLOAD_PRESET = process.env.REACT_APP_UPLOAD_PRESET;

  const formData = new FormData();
  formData.append("file", blob);
  formData.append("upload_preset", UPLOAD_PRESET || "");
  formData.append("public_id", fileName);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
  }
}
