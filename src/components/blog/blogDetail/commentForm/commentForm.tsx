import { useCommentBlogsById } from "@/redux/hooks/blogHook";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/defaultHooks";
import { setFormData } from "@/redux/slices/formSlice";

const CommentForm = () => {
  const dispatch = useAppDispatch();
  const { postData } = useCommentBlogsById();
  const form = useAppSelector((state) => state.form);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = event.target;
    dispatch(setFormData({ [id]: value }));
  };

  const HandelSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postData();
  };

  return (
    <form className="space-y-4" onSubmit={HandelSubmit}>
      <div className="space-y-2">
        <label
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="name"
        >
          Name
        </label>
        <input
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:outline-[#1890FF] focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          id="name"
          required
          value={form.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="space-y-2">
        <label
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="email"
        >
          Email
        </label>
        <input
          type="email"
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:outline-[#1890FF] focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          id="email"
          required
          value={form.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="space-y-2">
        <label
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="body"
        >
          Comment
        </label>
        <textarea
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:outline-[#1890FF] focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          id="body"
          required
          value={form.body}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="flex flex-row items-center focus:outline-none bg-[#1890FF] rounded-lg px-12 py-2 text-sm font-semibold text-white hover:bg-[#0084ff]"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
