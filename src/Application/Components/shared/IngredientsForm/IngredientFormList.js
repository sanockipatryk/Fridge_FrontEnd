import React, { Fragment } from "react";
import IngredientsFormRow from "./IngredientsFormRow";

const IngredientFormList = React.memo(
  ({
    ingredientsState,
    formType,
    ingredientsList,
    ingredientsCategoriesList,
    handleSetIngredient,
    handleSetIngredientCategory,
    handleSetQuantity,
    handleOnBlurQuantity,
    handleRemoveIngredientFromList,
    getUnselectedIngredients,
    getAddedIngredients,
    getPossibleIngredientCategories,
  }) => {
    const ingredientsInState = getAddedIngredients(ingredientsState);
    return (
      <Fragment>
        {ingredientsState?.map((item, index) => (
          <IngredientsFormRow
            key={index}
            itemState={item}
            ingredientsState={ingredientsState}
            formType={formType}
            ingredientsList={getUnselectedIngredients(
              ingredientsState,
              ingredientsList,
              item.ingredientId
            )}
            addedIngredients={getAddedIngredients(ingredientsState)}
            ingredientsCategoriesList={getPossibleIngredientCategories(
              ingredientsInState,
              ingredientsList,
              ingredientsCategoriesList,
              item.ingredientCategoryId
            )}
            handleSetIngredient={handleSetIngredient}
            handleSetIngredientCategory={handleSetIngredientCategory}
            handleSetQuantity={handleSetQuantity}
            handleOnBlurQuantity={handleOnBlurQuantity}
            handleRemoveIngredientFromList={handleRemoveIngredientFromList}
          />
        ))}
      </Fragment>
    );
  },
  (prevProps, nextProps) => {
    if (
      JSON.stringify([...prevProps.ingredientsState]) !==
      JSON.stringify([...nextProps.ingredientsState])
    )
      return false;
    else return true;
  }
);
export default IngredientFormList;
