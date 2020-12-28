import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .matches(/^[a-zA-Z]/, `Only letters are acceptable.`),
  lastName: yup
    .string()
    .required("Last name is required")
    .matches(/^[a-zA-Z]/, `Only letters are acceptable.`),
  eMail: yup
    .string()
    .email("Not a valid e-mail")
    .required("E-mail is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must have at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d#?!@$%^&*-]/,
      `Password must contain at least 1 upper case letter, one lower case letter and one digit`
    ),
  confirmPassword: yup
    .string()
    .required("Confirm password")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
