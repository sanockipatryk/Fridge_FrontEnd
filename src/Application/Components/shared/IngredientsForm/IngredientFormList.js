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
    pagination,
  }) => {
    const ingredientsInState = getAddedIngredients(ingredientsState);
    const reversedIngredientsState = [...ingredientsState].reverse();
    return (
      <Fragment>
        {reversedIngredientsState
          .slice(
            pagination.page * pagination.itemsPerPage,
            pagination.page * pagination.itemsPerPage + pagination.itemsPerPage
          )
          ?.map((item, index) => (
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
        JSON.stringify([...nextProps.ingredientsState]) ||
      prevProps.pagination !== nextProps.pagination
    )
      return false;
    else return true;
  }
);
export default IngredientFormList;
