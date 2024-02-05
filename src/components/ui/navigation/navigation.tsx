"use client";

import Navbar from "./navbar";
import Logo from "./logo";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/defaultHooks";
import Sidebar from "./sidebar";
import { setIsShow } from "@/redux/slices/navigationSlice";

const Navigation = () => {
  const dispatch = useAppDispatch();
  const selectorIsSshow = useAppSelector((state) => state.navigation.isShow);

  // hidden scroll when menu show
  const toggle = () => {
    if (!selectorIsSshow) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }

    dispatch(setIsShow(!selectorIsSshow));
  };

  return (
    <div
      className={`${
        selectorIsSshow ? "bg-white" : "backdrop-blur-3xl"
      } w-full h-[75px] sticky top-0 z-50`}
    >
      <div className="mx-auto px-5 h-full">
        <div className="flex justify-between items-center h-full">
          <Logo />
          <button
            type="button"
            className="inline-flex items-center md:hidden z-[9999]"
            onClick={toggle}
          >
            <Icon
              icon={selectorIsSshow ? "ion:close" : "ion:menu"}
              color="black"
              className="inline-flex items-center md:hidden"
              width={40}
              height={40}
            />
          </button>
          <Navbar />
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Navigation;
