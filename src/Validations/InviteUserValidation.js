import * as yup from "yup";

export const inviteUserSchema = yup.object().shape({
  eMail: yup
    .string()
    .email("Not a valid e-mail")
    .required("E-mail is required"),
});
