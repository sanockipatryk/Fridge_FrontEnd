import React, { Fragment } from "react";
import InputField from "../../../Reusable/BasicInputField";
import { addRecipeStyles } from "../RecipesPageStyles";

const RecipeTextInputs = ({
  name,
  description,
  cookingTime,
  handleSetValue,
}) => {
  const classes = addRecipeStyles();
  return (
    <Fragment>
      <div className={classes.IngredientRow}>
        <InputField
          value={name}
          onChange={handleSetValue}
          name="Name"
          label="Recipe name"
          additionalClass={classes.RecipeNameInput}
        />
        <InputField
          value={cookingTime}
          onChange={handleSetValue}
          name="CookingTime"
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
        name="Description"
        label="Description"
      />
    </Fragment>
  );
};

export default RecipeTextInputs;
