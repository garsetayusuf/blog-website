import { navigationData } from "@/model/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/defaultHooks";
import { setIsShow } from "@/redux/slices/navigationSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { isShow } = useAppSelector((state) => state.navigation);
  const blogPathDetail = pathname.includes("/blog") ? "/" : null;

  const toggle = () => {
    if (!isShow) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }

    dispatch(setIsShow(!isShow));
  };

  return (
    <div
      className="fixed w-full h-full flex items-center justify-center bg-white text-black left-0 bottom-0 md:hidden"
      style={{
        opacity: `${isShow ? "1" : "0"}`,
      }}
    >
      <ul className="text-center font-semibold leading-relaxed text-2xl">
        {navigationData.map((item, index) => (
          <li key={index}>
            <Link href={item.path} onClick={toggle}>
              <p
                className={`${
                  pathname === item.path || blogPathDetail === item.path
                    ? "text-red-500"
                    : ""
                }`}
              >
                {item.name}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
