export interface FormState {
  id: number;
  name: string;
  email: string;
  body: string;
  gender: "male" | "female";
  status: "active" | "inactive";
}
