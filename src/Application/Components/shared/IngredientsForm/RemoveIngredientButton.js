import React, { Fragment } from "react";
import { Button } from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";
import useStyles from "./IngredientsFormStyles";

const RemoveIngredientButton = ({
  id,
  formType,
  addedIngredients,
  handleRemoveIngredientFromList,
}) => {
  const classes = useStyles();
  return (
    <Fragment>
      {formType === "fridge" || addedIngredients.length > 1 ? (
        <Button
          className={classes.RemoveIngredientButton}
          variant="contained"
          onClick={() => handleRemoveIngredientFromList(id)}
        >
          <RemoveIcon className={classes.RemoveIngredientIcon} />
        </Button>
      ) : null}
    </Fragment>
  );
};

export default RemoveIngredientButton;
