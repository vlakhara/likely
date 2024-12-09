import React from "react";
import Add from "../../assets/svgs/Add";

const AddPost = () => {
  return (
    <div className="absolute text-black rounded-full bg-black h-[50px] w-[50px] bottom-[12px] right-[10px] flex items-center justify-center cursor-pointer">
      <Add />
    </div>
  );
};

export default AddPost;
