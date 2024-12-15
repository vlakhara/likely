import { useNavigate } from "react-router-dom";
import BackIcon from "../assets/svgs/BackIcon";
import { useData } from "../context";
import Carousel from "./common/ImageCaraousel";
import { useEffect, useRef } from "react";
import { createPost } from "../utils/functions";

interface FinalPostPropsType {}

const FinalPost: React.FC<FinalPostPropsType> = () => {
  const navigate = useNavigate();
  const {
    uploadedImages,
    imageDescription,
    setImageDescription,
    setUploadedImages,
  } = useData();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, []);

  const handlePost = async () => {
    try {
      if (!imageDescription) return;
      await createPost({
        images: uploadedImages,
        description: imageDescription,
      });
      setImageDescription("");
      setUploadedImages([]);
      navigate("/dashboard");
    } catch (error) {
      console.log("handlePost", error);
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center">
      <div className="flex items-center gap-4 w-full px-5 mt-[25px]">
        <span className="cursor-pointer" onClick={() => navigate(-1)}>
          <BackIcon fill="black" />
        </span>
        <p className="font-bold tracking-wide text-[20px]">New Post</p>
      </div>
      <div className="mt-[47px] min-h-[285px] w-[280px] rounded-[12px] overflow-hidden">
        <Carousel images={uploadedImages} isLastPage />
      </div>
      <div className="mt-[47px] w-full px-5 h-full">
        <textarea
          ref={textAreaRef}
          placeholder="Title"
          value={imageDescription}
          className="w-[320px] h-full outline-none break-words"
          onChange={(e) => setImageDescription(e.target.value)}
        />
      </div>
      <div className="w-full px-5 mb-5">
        <button
          onClick={handlePost}
          className="disabled:bg-gray-400 px-4 mt-4 mb-1 h-[45px] w-full bg-black hover:bg-white hover: hover:border hover:border-black text-center tracking-wide rounded-[25px] outline-none transition-all text-white uppercase"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default FinalPost;
