import React from "react";
import { Navigate } from "react-router-dom";

interface WrapperPropType {
  children: React.ReactNode;
  privateRoute?: boolean;
  className?: string;
}

const Wrapper = ({
  children,
  privateRoute = false,
  className = "",
}: WrapperPropType): JSX.Element => {
  const token = localStorage.getItem("token");

  if (privateRoute && !token) {
    return <Navigate to="/" />;
  }

  return (
    <div className={`h-full w-full flex flex-col ${className}`}>{children}</div>
  );
};

export default Wrapper;
