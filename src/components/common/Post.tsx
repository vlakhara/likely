import { User } from "firebase/auth";
import Like from "../../assets/svgs/Like";
import Share from "../../assets/svgs/Share";
import Profile from "./Profile";
import { PostType } from "../../pages/Dashboard";

export interface PostPropType {
  post: {
    user: User;
    postDetails: {
      images: [string?];
      description: string;
      likes: number;
      isLiked: boolean;
    };
    cardColor: string;
  };
  handleLike: () => void;
  handleShare: (post: PostType) => void;
}

const Post = ({ post, handleLike, handleShare }: PostPropType) => {
  const { user } = post;

  return (
    <div
      className="w-full h-[max-content] rounded-[26px] p-[12px]"
      style={{
        background: post.cardColor,
      }}
    >
      <Profile
        imageUrl={
          "https://lh3.googleusercontent.com/a/ACg8ocKuCFLBWVSBJOZxF6Nxy5X3R7P2oJrzcvQ4o2asMonhlMza5LxV"
        }
        name={user.displayName || ""}
        showTimestamp
      />
      <div className="max-h-[150px] overflow-auto mt-[14px] py-1 flex justify-start">
        <p className="text-left">
          What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing
          and typesetting industry. Lorem Ipsum ha
        </p>
      </div>
      {Boolean(post.postDetails.images.length) && (
        <div className="Image-Section h-[200px] mt-[9px]"></div>
      )}
      <div className="Action-Section h-[50px] mt-[11px] flex items-center justify-between pl-[0.1px]">
        <div className="cursor-pointer flex items-center gap-[8px]">
          <span onClick={handleLike}>
            <Like isLiked={post.postDetails.isLiked} />
          </span>
          <p className="text-[14px] tracking-wide font-medium">
            {post.postDetails.likes}
          </p>
        </div>
        <div
          className="rounded-[26px] h-[calc(100%-10px)] gap-[8px] relative overflow-hidden cursor-pointer"
          onClick={() => {
            handleShare(post);
          }}
        >
          <div
            className=" bg-black opacity-[0.07]  h-full w-full absolute z-[1]]"
            style={{ content: "" }}
          ></div>
          <div className="flex items-center gap-[8px] h-full w-full px-[16.5px] z-[2]">
            <Share />
            <p className="text-black">Share</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
