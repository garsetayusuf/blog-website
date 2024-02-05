import { useAppDispatch, useAppSelector } from "@/redux/hooks/defaultHooks";
import { setShowEllipsis } from "@/redux/slices/blogSlice";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const BlogItem = ({ item }: any) => {
  const dispatch = useAppDispatch();
  const { showEllipsis } = useAppSelector((state) => state.blogs);
  const contentRef = useRef<HTMLParagraphElement>(null);
  const router = useRouter();

  useEffect(() => {
    // elpisis content when the content is too long
    if (contentRef.current) {
      const contentHeight = contentRef.current.offsetHeight;
      const lineHeight = parseInt(
        window.getComputedStyle(contentRef.current).lineHeight
      );

      dispatch(setShowEllipsis(contentHeight > lineHeight * 3));
    }

    const titleElements = document.querySelectorAll(".font-bold.text-xl.mb-2");
    let maxHeight = 0;
    titleElements.forEach((titleElement) => {
      maxHeight = Math.max(
        maxHeight,
        (titleElement as HTMLElement).offsetHeight
      );
    });
    titleElements.forEach((titleElement) => {
      (titleElement as HTMLElement).style.height = `${maxHeight}px`;
      (titleElement as HTMLElement).style.display = "flex";
      (titleElement as HTMLElement).style.alignItems = "center";
    });
  }, [item.body, dispatch]);

  return (
    <div className="rounded-lg w-full overflow-hidden shadow-lg hover:bg-gray-50">
      <div className="px-6 py-4">
        <div>
          <h2
            className="font-bold text-xl mb-2 cursor-pointer hover:text-[#1890FF]"
            onClick={() => router.push(`/blog/${item.id}`)}
          >
            {item.title}
          </h2>
        </div>

        <p
          className="text-gray-700 text-base overflow-hidden"
          style={{
            maxHeight: showEllipsis ? "3em" : "none",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
          ref={contentRef}
        >
          {item.body}
        </p>
      </div>
      <div className="px-6 pt-1 pb-4 float-right">
        <button
          type="button"
          onClick={() => router.push(`/blog/${item.id}`)}
          className="flex flex-row items-center bg-[#1890FF] rounded-lg px-3 py-2 text-sm font-semibold hover:bg-[#0084ff] text-white"
        >
          <p className="pr-1">Read more</p>
          <Icon icon="carbon:chevron-right" width={15} height={15} />
        </button>
      </div>
    </div>
  );
};

export default BlogItem;
