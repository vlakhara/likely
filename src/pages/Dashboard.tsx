import { User } from "firebase/auth";
import { useState } from "react";
import AddPost from "../components/common/AddPost";
import Post from "../components/common/Post";
import Profile from "../components/common/Profile";
import Wrapper from "../components/common/Wrapper";
import { getRandomColor } from "../utils/functions";

const user = JSON.parse(localStorage.getItem("authUser") || JSON.stringify({}));
interface PostType {
  user: User;
  postDetails: {
    images: [string?];
    description: string;
    likes: number;
    isLiked: boolean;
  };
  cardColor: string;
}

const Dashboard = () => {
  const [posts, setPosts] = useState<PostType[]>([
    {
      user,
      postDetails: {
        images: [""],
        likes: 333,
        isLiked: false,
        description:
          "What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum ha",
      },
      cardColor: getRandomColor(),
    },
    {
      user,
      postDetails: {
        images: [],
        likes: 201,
        isLiked: false,
        description:
          "What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum ha",
      },
      cardColor: getRandomColor(),
    },
    {
      user,
      postDetails: {
        images: [],
        likes: 188,
        isLiked: false,
        description:
          "What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum ha",
      },
      cardColor: getRandomColor(),
    },
    {
      user,
      postDetails: {
        images: [],
        likes: 19,
        isLiked: false,
        description:
          "What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum ha",
      },
      cardColor: getRandomColor(),
    },
    {
      user,
      postDetails: {
        images: [],
        likes: 1,
        isLiked: false,
        description:
          "What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum ha",
      },
      cardColor: getRandomColor(),
    },
    {
      user,
      postDetails: {
        images: [],
        likes: 4,
        isLiked: false,
        description:
          "What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum ha",
      },
      cardColor: getRandomColor(),
    },
    {
      user,
      postDetails: {
        images: [],
        likes: 30,
        isLiked: false,
        description:
          "What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum ha",
      },
      cardColor: getRandomColor(),
    },
    {
      user,
      postDetails: {
        images: [],
        likes: 99,
        isLiked: false,
        description:
          "What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum ha",
      },
      cardColor: getRandomColor(),
    },
    {
      user,
      postDetails: {
        images: [],
        likes: 178,
        isLiked: false,
        description:
          "What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum ha",
      },
      cardColor: getRandomColor(),
    },
  ]);

  const handleLike = (index: number) => {
    setPosts((prev) =>
      prev.map((post: PostType, i: number) => {
        if (i === index) {
          post.postDetails.likes += post.postDetails.isLiked ? -1 : 1;
          post.postDetails.isLiked = !post.postDetails.isLiked;
        }
        return post;
      })
    );
  };

  return (
    <Wrapper privateRoute>
      <>
        <div className="px-[16px] pt-[16px] flex flex-col relative">
          <div className="header">
            <Profile
              imageUrl={
                "https://lh3.googleusercontent.com/a/ACg8ocKuCFLBWVSBJOZxF6Nxy5X3R7P2oJrzcvQ4o2asMonhlMza5LxV"
              }
              name={user.displayName}
              showGreeting
            />
          </div>
          <div className="mt-[31px]">
            <p className="text-black text-left text-[24px] font-[800] tracking-[2px]">
              Feeds
            </p>
          </div>
          <AddPost />

          <div className="mt-[19px] text-black flex flex-col gap-[10px] overflow-y-auto h-[calc(100vh-160px)] sm:h-[780px] [&::-webkit-scrollbar]:hidden">
            {posts.map((post, index) => (
              <Post post={post} handleLike={() => handleLike(index)} />
            ))}
          </div>
        </div>
      </>
    </Wrapper>
  );
};

export default Dashboard;
