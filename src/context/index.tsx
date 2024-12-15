import React, { createContext, useContext, useState } from "react";

export interface AuthContextType {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  posts: any[];
  setPosts: React.Dispatch<React.SetStateAction<any[]>>;
  uploadedImages: any[];
  setUploadedImages: React.Dispatch<React.SetStateAction<any[]>>;
  imageDescription: string;
  setImageDescription: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextType>({
  user: {},
  setUser: () => {},
  posts: [],
  setPosts: () => {},
  uploadedImages: [],
  setUploadedImages: () => {},
  imageDescription: "",
  setImageDescription: () => {},
});

export const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<any>({});
  const [posts, setPosts] = useState<any[]>([]);
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);
  const [imageDescription, setImageDescription] = useState<string>("");

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        posts,
        setPosts,
        uploadedImages,
        setUploadedImages,
        imageDescription,
        setImageDescription,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useData = () => useContext(AuthContext);
