import * as yup from "yup";

export const recipeFormSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string(),
  cookingTime: yup
    .number()
    .typeError("Cooking time is required")
    .required("Cooking time is required")
    .min(1, "Cooking time has to be higher than 0 minutes")
    .max(2147483647, "Cooking time cannot be higher than 2147483647 minutes"),
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
