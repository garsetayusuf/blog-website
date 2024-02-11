import React from "react";
import { RotatingLines } from "react-loader-spinner";

const LoadingIcon = () => {
  return (
    <div className="flex justify-center items-center h-[76vh]">
      <RotatingLines
        visible={true}
        width="96"
        strokeColor="#1890FF"
        strokeWidth="3"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
      />
    </div>
  );
};

export default LoadingIcon;
