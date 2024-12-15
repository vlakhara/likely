import { User } from "firebase/auth";
import Like from "../../assets/svgs/Like";
import Share from "../../assets/svgs/Share";
import { PostType } from "../../pages/Dashboard";
import PostImages from "../PostImages";
import Profile from "./Profile";
import Carousel from "./ImageCaraousel";

export interface PostPropType {
  post: {
    id: string;
    user: User;
    images: [string];
    description: string;
    likes: number;
    isLiked: boolean;
    createdAt: string;
    color: string;
  };
  handleLike: () => void;
  handleShare: (post: PostType) => void;
}

const Post = ({ post, handleLike, handleShare }: PostPropType) => {
  const { user } = post;

  const prepareDescription = () => {
    const des = post.description.split(" ");

    return des.map((word) => {
      if (word.includes("#")) {
        return { word, isHashTag: true };
      }
      return { word, isHashTag: false };
    });
  };

  return (
    <div
      className="w-full h-[max-content] rounded-[26px] p-[12px]"
      style={{
        background: post.color,
      }}
    >
      <Profile
        imageUrl={user.photoURL || ""}
        name={user.displayName || ""}
        showTimestamp
        date={post.createdAt}
      />
      <div className="max-h-[150px] overflow-auto mt-[14px] py-1 flex justify-start">
        {prepareDescription().map((word, index) => (
          <p
            key={index}
            className={`text-left ${word.isHashTag ? "text-[#3f19ff]" : ""}`}
          >
            {word.word}
          </p>
        ))}
      </div>
      {Boolean(post.images.length) && (
        <div className="Image-Section h-[200px] mt-[9px] rounded-[12px] overflow-hidden">
          <Carousel images={post.images} />
        </div>
      )}
      <div className="Action-Section h-[50px] mt-[11px] flex items-center justify-between pl-[0.1px]">
        <div className="cursor-pointer flex items-center gap-[8px]">
          <span onClick={handleLike}>
            <Like isLiked={post.isLiked} />
          </span>
          <p className="text-[14px] tracking-wide font-medium">{post.likes}</p>
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
            <p>Share</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
