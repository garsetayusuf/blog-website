import Link from "next/link";
import { navigationData } from "@/model/navigation";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const blogPathDetail = pathname.includes("/blog") ? "/" : null;

  return (
    <>
      <ul className="hidden font-semibold md:flex gap-x-6 text-black">
        {navigationData.map((item, index) => (
          <li key={index}>
            <Link href={item.path}>
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
      <div className="hidden md:block"></div>
    </>
  );
};

export default Navbar;
