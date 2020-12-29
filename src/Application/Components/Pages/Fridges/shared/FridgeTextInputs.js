import React, { Fragment } from "react";
import InputField from "../../../Reusable/BasicInputField";
import { addRecipeStyles } from "../../Recipes/RecipesPageStyles";

const FridgeTextInputs = ({ inputState, handleSetValue }) => {
  const classes = addRecipeStyles();
  return (
    <Fragment>
      <InputField
        value={inputState.name}
        onChange={handleSetValue}
        name="name"
        label="Fridge name"
      />
      <InputField
        value={inputState.description}
        onChange={handleSetValue}
        multiline
        rows={4}
        name="description"
        label="Description"
      />
    </Fragment>
  );
};

export default FridgeTextInputs;
