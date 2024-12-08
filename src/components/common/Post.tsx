import React from "react";
import Profile from "./Profile";
import { User } from "firebase/auth";

interface PostPropType {
  post: {
    postDetails: {};
    user: User;
  };
}

const colors = [
  "#D1E9F6",
  "#F6EACB",
  "#F1D3CE",
  "#EECAD5",
  "#D2E0FB",
  "#FEF9D9",
  "#DEE5D4",
  "#E5D9F2",
  "#F5EFFF",
  "#F5EDED",
  "#FFEBD4",
  "#F7F9F2",
  "#FEFFD2",
  "#F1F1F1",
  "#FFF2D7",
  "#F0EBE3",
  "#F6F5F2",
  "#FFFBDA",
  "#F8F6E3",
  "#C6EBC5",
  "#FEFDED",
];

const getRandomColor = () => {
  const ind = Math.floor(Math.random() * colors.length);
  return colors[ind];
};

const Post = ({ post }: PostPropType) => {
  const { user } = post;

  return (
    <div
      className={`min-h-[341px] w-full rounded-[26px] p-[12px]`}
      style={{ background: getRandomColor() }}
    >
      <Profile
        imageUrl={user.photoURL || ""}
        name={user.displayName || ""}
        showTimestamp
      />
    </div>
  );
};

export default Post;
