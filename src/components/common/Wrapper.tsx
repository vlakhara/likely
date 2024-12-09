import React from "react";

interface WrapperPropType {
  children: React.ReactNode;
  privateRoute?: boolean;
  className?: string;
}

const Wrapper = ({
  children,
  className = "",
}: WrapperPropType): JSX.Element => {
  return (
    <div className={`h-full w-full flex flex-col ${className}`}>{children}</div>
  );
};

export default Wrapper;
