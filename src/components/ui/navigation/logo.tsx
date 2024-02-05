/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Image from "next/image";
import { useEffect } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/defaultHooks";
import { setWidth } from "@/redux/slices/navigationSlice";

const Logo = () => {
  const dispatch = useAppDispatch();
  const { width, isShowButton } = useAppSelector((state) => state.navigation);

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    updateWidth();
  }, []);

  //update the size of the logo when the size of the screen changes
  const updateWidth = () => {
    const newWidth = window.innerWidth;
    dispatch(setWidth(newWidth));
  };

  return (
    <>
      <Link href="/" style={{ display: isShowButton ? "none" : "block" }}>
        <Image
          src="/images/cat.png"
          alt="cat"
          width={width! < 1024 ? "75" : "75"}
          height={width! < 1024 ? "45" : "75"}
          className="relative"
          style={{
            height: width! < 1024 ? "45" : "75",
            width: width! < 1024 ? "75" : "75",
          }}
          priority
        />
      </Link>
    </>
  );
};

export default Logo;
