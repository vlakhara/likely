import { useState } from "react";
import Wrapper from "../components/common/Wrapper";
import UploadImageStepOne from "../components/UploadImageStepOne";

const NewPost = () => {
  const [step, setStep] = useState<number>(1);

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };
  return (
    <Wrapper privateRoute>
      {step === 1 && <UploadImageStepOne next={handleNext} />}
    </Wrapper>
  );
};

export default NewPost;
