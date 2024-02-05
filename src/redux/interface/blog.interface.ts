import { BlogsType, CommentType } from "../types/blogType";

export interface BlogState {
  blogs: Array<BlogsType>;
  blogsCurrent: Array<BlogsType>;
  showEllipsis: boolean;
  blogId: string | null;
  blogDetail: BlogsType;
  comment: Array<CommentType>;
  loadingComment: boolean;
}
