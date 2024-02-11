import { UsersType } from "../types/userType";

export interface UserState {
  users: Array<UsersType>;
  showModal: boolean;
  mode: "create" | "update" | "delete";
  userId: number | null;
  loading: boolean;
  searchValue: string;
  timer: null;
}
