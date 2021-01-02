import * as yup from "yup";

export const fridgeFormSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string(),
  quantities: yup
    .array()
    .of(
      yup
        .number()
        .typeError("Quantity is required")
        .required("Quantity is required")
        .min(1, "Quantity has to be higher than 0 (g/ml)")
        .max(2147483647, "Quantity cannot be higher than 2147483647 (g/ml)")
    ),
});
