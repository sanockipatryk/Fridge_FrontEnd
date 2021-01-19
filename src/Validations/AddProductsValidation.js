import * as yup from "yup";

export const addProductsSchema = yup.object().shape({
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
