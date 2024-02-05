import { useAppSelector } from "@/redux/hooks/defaultHooks";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import moment from "moment";
import CommentForm from "./commentForm/commentForm";
import { RotatingLines } from "react-loader-spinner";
import { useGetBlogsById } from "@/redux/hooks/blogHook";

const BlogDetail = () => {
  const router = useRouter();
  const { blogDetail, comment, loadingComment } = useAppSelector(
    (state) => state.blogs
  );

  useGetBlogsById();

  return (
    <div className="mx-[32rem] px-4 md:px-6 lg:py-6 md:py-6">
      <button
        type="button"
        onClick={() => router.push(`/`)}
        className="mb-10 flex flex-row items-center bg-gray-200 rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-[#d2d2d2]"
      >
        <Icon icon="carbon:chevron-left" width={15} height={15} />
        <p className="px-1">Back</p>
      </button>

      <article className="text-gray-700 mx-auto">
        {loadingComment ? (
          <div className="flex justify-center items-center">
            <RotatingLines
              visible={true}
              width="50"
              strokeColor="#1890FF"
              strokeWidth="3"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
            />
          </div>
        ) : (
          <>
            <div className="space-y-2 not-prose">
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl lg:leading-[3.5rem]">
                {blogDetail.title}
              </h1>
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <span>By Jane Doe</span>
                <span>•</span>
                <span>Posted on {moment().format("LL")}</span>
              </div>
            </div>
            <p className="text-base my-6">{blogDetail.body}</p>
          </>
        )}

        <h2 className="mb-5 mt-10 text-2xl font-bold">Comments</h2>
        <div className="space-y-4">
          {loadingComment ? (
            <div className="flex justify-center items-center">
              <RotatingLines
                visible={true}
                width="50"
                strokeColor="#1890FF"
                strokeWidth="3"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
              />
            </div>
          ) : comment.length > 0 ? (
            comment.map((comment, index) => (
              <div
                key={index}
                className="grid gap-2 my-6 border p-4 rounded-md bg-gray-50"
              >
                <div>
                  <h3 className="font-semibold">{comment.name}</h3>
                  <h5 className="font-normal text-sm text-gray-500">
                    {comment.email}
                  </h5>
                </div>
                <p className="text-sm font-semibold text-gray-500">
                  {moment().format("MMMM D, YYYY [at] h:mm A")}
                </p>
                <p className="py-2">{comment.body}</p>
              </div>
            ))
          ) : (
            <div className="grid gap-2 my-6 border p-4 rounded-md bg-gray-50">
              <div>
                <h3 className="font-semibold py-2">Post not have comments</h3>
              </div>
            </div>
          )}
        </div>
        <h2 className="mb-5 mt-10 text-2xl font-bold">Add a Comment</h2>
        <CommentForm />
      </article>
    </div>
  );
};

export default BlogDetail;
