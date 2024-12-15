import { useState } from "react";
import Wrapper from "../components/common/Wrapper";
import UploadImageStepOne from "../components/UploadImageStepOne";
import FinalPost from "../components/FinalPost";

const NewPost = () => {
  const [step, setStep] = useState<number>(1);

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  return (
    <Wrapper privateRoute>
      {step === 1 && <UploadImageStepOne next={handleNext} />}
      {step === 2 && <FinalPost />}
    </Wrapper>
  );
};

export default NewPost;
