import Camera from "../assets/svgs/Camera";
import MultipleSelect from "../assets/svgs/MultipleSelect";

interface UploadImageStepOnePropsType {
  next: () => void;
}

const UploadImageStepOne: React.FC<UploadImageStepOnePropsType> = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="min-h-[400px] w-full flex items-center justify-center">
        <p className="p">Upload</p>
      </div>
      <div className="py-[20px] px-[21px] flex items-center justify-between w-full shadow-upper">
        <p className="text-[18px] font-semibold tracking-wide">Gallery</p>
        <div className="flex items-center gap-[8px]">
          <MultipleSelect />
          <Camera />
        </div>
      </div>
      <div className="flex-grow w-full"></div>
    </div>
  );
};

export default UploadImageStepOne;
