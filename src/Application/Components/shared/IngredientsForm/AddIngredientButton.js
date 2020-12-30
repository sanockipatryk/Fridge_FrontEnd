import React from "react";
import { Button } from "@material-ui/core";
import useStyles from "./IngredientsFormStyles";

const AddIngredientButton = ({ ingredients, handleAddNextIngredient }) => {
  const classes = useStyles();
  return (
    <div className={classes.IngredientRow}>
      <Button
        color="secondary"
        variant="contained"
        onClick={handleAddNextIngredient}
        className={
          ingredients.length !== 0 ? classes.NextIngredientButton : null
        }
      >
        {ingredients.length === 0 ? "Add ingredient" : "Next ingredient"}
      </Button>
    </div>
  );
};

export default AddIngredientButton;
