import * as Yup from "yup";
export const newPasswordSchema = Yup.object({
  password: Yup.string()
    .required("Password is required.")
    .min(8, "Password must be at least 7 characters."),
  confirmPassword: Yup.string()
    .required("Confirm password is required.")
    .oneOf([Yup.ref("password"), null], "Passwords must match."),
});
