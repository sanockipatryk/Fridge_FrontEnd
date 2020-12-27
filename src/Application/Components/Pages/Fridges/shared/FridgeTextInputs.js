import React, { Fragment } from "react";
import InputField from "../../../Reusable/BasicInputField";
import { addRecipeStyles } from "../../Recipes/RecipesPageStyles";

const FridgeTextInputs = ({ name, description, handleSetValue }) => {
  const classes = addRecipeStyles();
  return (
    <Fragment>
      <InputField
        value={name}
        onChange={handleSetValue}
        name="Name"
        label="Fridge name"
      />
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

export default FridgeTextInputs;
