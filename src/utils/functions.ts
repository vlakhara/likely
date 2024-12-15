import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, firebaseAuth, signInWithGoogleProvider } from "../firebase";
import { COLORS } from "./Data";
import moment from "moment";

export const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
export const UPLOAD_PRESET = process.env.REACT_APP_UPLOAD_PRESET;

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

export async function getUserById(uid: string) {
  try {
    const userRef = doc(db, "Users", uid);

    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return { id: userSnap.id, ...userSnap.data() };
    } else {
      console.log("No user found with the specified UID.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
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

export async function uploadToCloudinary(
  blob: Blob,
  fileName: string,
  customFormData: FormData | null = null
) {
  const formData = new FormData();
  formData.append("file", blob);
  formData.append("upload_preset", UPLOAD_PRESET || "");
  formData.append("public_id", fileName);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: customFormData || formData,
      }
    );

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
  }
}

export function generateLightColor() {
  var letters = "BCDEF".split("");
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}

// create a new post
export async function createPost({
  images,
  description,
}: {
  images: string[];
  description: string;
}) {
  const user = firebaseAuth.currentUser;
  try {
    const post = {
      images,
      description,
      userId: user?.uid,
      createdAt: moment().toString(),
      likes: 0,
    };
    const docRef = await addDoc(collection(db, "posts"), post);
    console.log("🔊🔊🔊🔊🔊🔊 ~ docRef:", docRef);
  } catch (error) {
    console.log("createPost", error);
  }
}

export async function getPosts() {
  try {
    const postsQuery = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(postsQuery);
    const posts = await Promise.all(
      querySnapshot.docs.map(async (doc) => ({
        id: doc.id,
        user: await getUserById(doc.data().userId),
        isLiked: await isPostLiked(doc.id),
        color: getRandomColor(),
        ...doc.data(),
      }))
    );
    return posts;
  } catch (error) {
    console.log("getPosts", error);
  }
}

// like post
export const likePost = async (postId: string) => {
  try {
    const user = firebaseAuth.currentUser;
    if (!user) {
      throw new Error("User not found");
    }

    const userId = user.uid;
    const like = {
      postId,
      userId,
    };

    const post = await getDoc(doc(db, "posts", postId));
    if (!post.exists()) {
      throw new Error("Post not found");
    }
    updateDoc(doc(db, "posts", postId), {
      likes: post.data().likes + 1,
    });

    const likesRef = await addDoc(collection(db, "likes"), like);
    await setDoc(likesRef, like);
  } catch (error) {
    console.error("Error liking post:", error);
    throw error;
  }
};

// dislike post
export const dislikePost = async (postId: string) => {
  try {
    const user = firebaseAuth.currentUser;
    if (!user) {
      throw new Error("User not found");
    }

    const userId = user.uid;

    const post = await getDoc(doc(db, "posts", postId));
    if (!post.exists()) {
      throw new Error("Post not found");
    }
    updateDoc(doc(db, "posts", postId), {
      likes: post.data().likes - 1,
    });

    const likeRef = query(
      collection(db, "likes"),
      where("postId", "==", postId),
      where("userId", "==", userId)
    );

    const likesSnap = await getDocs(likeRef);
    if (!likesSnap.empty) {
      await deleteDoc(likesSnap.docs[0].ref);
    }
  } catch (error) {
    console.error("Error disliking post:", error);
    throw error;
  }
};

export const isPostLiked = async (postId: string) => {
  try {
    const user = firebaseAuth.currentUser;
    if (!user) {
      throw new Error("User not found");
    }
    const likesRef = query(
      collection(db, "likes"),
      where("postId", "==", postId),
      where("userId", "==", user.uid)
    );
    const likesSnap = await getDocs(likesRef);
    if (!likesSnap.empty) {
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error fetching post likes:", error);
    throw error;
  }
};