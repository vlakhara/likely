import { useRef, useState } from "react";
import Add from "../assets/svgs/Add";
import BackIcon from "../assets/svgs/BackIcon";
import Camera from "../assets/svgs/Camera";
import MultipleSelect from "../assets/svgs/MultipleSelect";
import { UPLOAD_PRESET, uploadToCloudinary } from "../utils/functions";
import Carousel from "./common/ImageCaraousel";
import { useNavigate } from "react-router-dom";
import { useData } from "../context";

interface UploadImageStepOnePropsType {
  next: () => void;
}

const UploadImageStepOne: React.FC<UploadImageStepOnePropsType> = ({
  next,
}) => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [, setLoading] = useState<boolean>(false);
  const { uploadedImages, setUploadedImages } = useData();

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setLoading(true);
      try {
        const files = Array.from(event.target.files);
        const urls: string[] = [];
        for (const file of files) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", UPLOAD_PRESET || "");
          formData.append("public_id", file.name);

          const response = await uploadToCloudinary(file, file.name, formData);
          urls.push(response);
        }
        setUploadedImages(urls);
      } catch (error) {
        console.log("handleChange error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="min-h-[400px] w-full flex items-center justify-center bg-[#2A3335]  relative">
        <div className=" absolute top-6 left-5 right-5 flex items-center justify-between z-[100]">
          <span className="cursor-pointer" onClick={() => navigate(-1)}>
            <BackIcon fill="white" />
          </span>
          {Boolean(uploadedImages.length) && (
            <span onClick={() => next()}>
              <p className="text-white">Next</p>
            </span>
          )}
        </div>
        <Carousel images={uploadedImages} />
      </div>
      <div className="py-[20px] px-[21px] flex items-center justify-between w-full shadow-upper">
        <p className="text-[18px] font-semibold tracking-wide">Gallery</p>
        <div className="flex items-center gap-[8px]">
          <MultipleSelect />
          <Camera />
        </div>
      </div>
      <div className={`flex-grow w-full flex items-center justify-center `}>
        <div className="">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleChange}
            ref={inputRef}
            className="hidden"
          />
          <div
            className="w-72 h-64 gap-2 rounded-lg bg-slate-50 shadow-md hover:shadow-inner hover:shadow-gray-300 shadow-gray-300 flex items-center justify-center cursor-pointer transition-shadow"
            onClick={handleClick}
          >
            <Add fill="#000" />
            <p className="uppercase">Add Images</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadImageStepOne;
