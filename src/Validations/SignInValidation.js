import * as yup from "yup";

export const signInSchema = yup.object().shape({
  eMail: yup
    .string()
    .email("Not a valid e-mail")
    .required("E-mail is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must have at least 8 characters"),
});
