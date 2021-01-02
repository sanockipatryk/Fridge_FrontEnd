import React, { Fragment } from "react";
import InputField from "../../../Reusable/BasicInputField";
import { addRecipeStyles } from "../RecipesPageStyles";

const RecipeTextInputs = React.memo(
  ({ inputState, handleSetValue, handleOnBlur }) => {
    const classes = addRecipeStyles();
    const { values, touched, errors } = inputState;
    return (
      <Fragment>
        <div className={classes.IngredientRow}>
          <InputField
            value={values.name}
            onChange={handleSetValue}
            handleOnBlur={handleOnBlur}
            name="name"
            label="Recipe name"
            additionalClass={classes.RecipeNameInput}
            touched={touched?.name}
            error={errors?.name}
          />
          <InputField
            value={values.cookingTime}
            onChange={handleSetValue}
            handleOnBlur={handleOnBlur}
            name="cookingTime"
            label="Cooking time (min)"
            type="number"
            additionalClass={classes.RecipeCookingTimeInput}
            touched={touched?.cookingTime}
            error={errors?.cookingTime}
          />
        </div>
        <InputField
          value={values.description}
          onChange={handleSetValue}
          handleOnBlur={handleOnBlur}
          multiline
          rows={4}
          name="description"
          label="Description"
          touched={touched?.description}
          error={errors?.description}
        />
      </Fragment>
    );
  },
  (prevProps, nextProps) => {
    if (
      JSON.stringify(prevProps.inputState) !==
      JSON.stringify(nextProps.inputState)
    ) {
      return false;
    } else return true;
  }
);

export default RecipeTextInputs;
