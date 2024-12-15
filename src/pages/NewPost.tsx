import { useEffect, useState } from "react";
import Wrapper from "../components/common/Wrapper";
import UploadImageStepOne from "../components/UploadImageStepOne";
import FinalPost from "../components/FinalPost";
import { useData } from "../context";

const NewPost = () => {
  const [step, setStep] = useState<number>(1);
  const { setImageDescription, setUploadedImages } = useData();
  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  useEffect(() => {
    return () => {
      setImageDescription("");
      setUploadedImages([]);
    };
  }, [setImageDescription, setUploadedImages]);

  return (
    <Wrapper privateRoute>
      {step === 1 && <UploadImageStepOne next={handleNext} />}
      {step === 2 && <FinalPost />}
    </Wrapper>
  );
};

export default NewPost;
