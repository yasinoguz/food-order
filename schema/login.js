import { CgPassword } from "react-icons/cg";
import * as Yup from "yup";
export const loginSchema = Yup.object({
  email: Yup.string().required("Email is required.").email("Email is invalid."),
  password: Yup.string()
    .required("Password is required.")
    .min(8, "Password must be at least 8 characters."),
});
