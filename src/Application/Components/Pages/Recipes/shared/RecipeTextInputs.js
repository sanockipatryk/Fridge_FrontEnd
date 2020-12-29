import React, { Fragment } from "react";
import InputField from "../../../Reusable/BasicInputField";
import { addRecipeStyles } from "../RecipesPageStyles";

const RecipeTextInputs = ({ inputState, handleSetValue }) => {
  const classes = addRecipeStyles();
  const { name, cookingTime, description } = inputState;
  return (
    <Fragment>
      <div className={classes.IngredientRow}>
        <InputField
          value={name}
          onChange={handleSetValue}
          name="name"
          label="Recipe name"
          additionalClass={classes.RecipeNameInput}
        />
        <InputField
          value={cookingTime}
          onChange={handleSetValue}
          name="cookingTime"
          label="Cooking time (min)"
          type="number"
          additionalClass={classes.RecipeCookingTimeInput}
        />
      </div>
      <InputField
        value={description}
        onChange={handleSetValue}
        multiline
        rows={4}
        name="description"
        label="Description"
      />
    </Fragment>
  );
};

export default RecipeTextInputs;
