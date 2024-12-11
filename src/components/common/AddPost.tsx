import React from "react";
import Add from "../../assets/svgs/Add";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/new-post");
  };
  return (
    <div
      className="absolute rounded-full bg-black h-[50px] w-[50px] bottom-[12px] right-[10px] flex items-center justify-center cursor-pointer z-20"
      onClick={handleClick}
    >
      <Add />
    </div>
  );
};

export default AddPost;
