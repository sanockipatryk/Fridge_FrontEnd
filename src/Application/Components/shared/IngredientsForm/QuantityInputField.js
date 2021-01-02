import React from "react";
import { FormControl } from "@material-ui/core";
import useStyles from "./IngredientsFormStyles";
import InputField from "../../Reusable/BasicInputField";

const QuantityInputField = ({
  id,
  itemState,
  handleSetQuantity,
  handleOnBlurQuantity,
}) => {
  const classes = useStyles();
  const { quantity, quantityTouched, quantityError } = itemState;
  return (
    <FormControl
      variant="outlined"
      className={classes.FormControlSlim}
      fullWidth
    >
      <InputField
        value={quantity}
        onChange={(e) => handleSetQuantity(e, id)}
        handleOnBlur={(e) => handleOnBlurQuantity(e, id)}
        touched={quantityTouched}
        error={quantityError}
        name="Quantity"
        label="Quantity (g/ml)"
        type="number"
        fullWidth
      />
    </FormControl>
  );
};

export default QuantityInputField;
