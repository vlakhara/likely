import { User } from "firebase/auth";
import { useCallback, useEffect, useState } from "react";
import AddPost from "../components/common/AddPost";
import Post from "../components/common/Post";
import Profile from "../components/common/Profile";
import Wrapper from "../components/common/Wrapper";
import ShareModal from "../components/ShareModal";
import { useData } from "../context";
import { dislikePost, getPosts, likePost } from "../utils/functions";

const user = JSON.parse(localStorage.getItem("authUser") || JSON.stringify({}));
export interface PostType {
  id: string;
  user: User;
  images: [string?];
  description: string;
  likes: number;
  isLiked: boolean;
}

const Dashboard = () => {
  const [openShareModal, setOpenShareModal] = useState<boolean>(false);
  const { posts, setPosts } = useData();

  const fetchPosts = useCallback(async () => {
    const response = await getPosts();
    if (!response) return;
    setPosts(response);
  }, [setPosts]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleLike = (index: number) => {
    setPosts((prev) =>
      prev.map((post: PostType, i: number) => {
        if (i === index) {
          if (post.isLiked) {
            dislikePost(post.id);
          } else {
            likePost(post.id);
          }
          post.likes += post.isLiked ? -1 : 1;
          post.isLiked = !post.isLiked;
        }
        return post;
      })
    );
  };

  const handleShare = () => {
    setOpenShareModal(true);
  };

  return (
    <Wrapper privateRoute>
      <>
        <div className="px-[16px] pt-[16px] flex flex-col relative">
          <div className="header">
            <Profile
              imageUrl={user.photoURL || ""}
              name={user.displayName}
              showGreeting
            />
          </div>
          <div className="mt-[31px]">
            <p className="text-left text-[24px] font-[800] tracking-[2px]">
              Feeds
            </p>
          </div>
          <AddPost />
          <div className="mt-[19px] flex flex-col gap-[10px] overflow-y-auto h-[calc(100vh-160px)] sm:h-[780px] [&::-webkit-scrollbar]:hidden">
            {posts.map((post, index) => (
              <Post
                post={post}
                handleLike={() => handleLike(index)}
                handleShare={handleShare}
              />
            ))}
          </div>
        </div>
      </>
      {openShareModal && (
        <ShareModal postId="1" handleClose={() => setOpenShareModal(false)} />
      )}
    </Wrapper>
  );
};

export default Dashboard;
