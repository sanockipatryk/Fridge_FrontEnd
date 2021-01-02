import React from "react";
import useStyles from "./IngredientsFormStyles";
import QuantityInputField from "./QuantityInputField";
import RemoveIngredientButton from "./RemoveIngredientButton";
import IngredientsFormSelect from "./IngredientsFormSelect";

const IngredientsFormRow = ({
  itemState,
  formType,
  addedIngredients,
  ingredientsList,
  ingredientsCategoriesList,
  handleSetIngredient,
  handleSetIngredientCategory,
  handleSetQuantity,
  handleOnBlurQuantity,
  handleRemoveIngredientFromList,
}) => {
  const classes = useStyles();
  const { id, ingredientCategoryId, ingredientId } = itemState;

  return (
    <div className={classes.IngredientRow}>
      <RemoveIngredientButton
        id={id}
        formType={formType}
        addedIngredients={addedIngredients}
        handleRemoveIngredientFromList={handleRemoveIngredientFromList}
      />
      <IngredientsFormSelect
        id={id}
        value={ingredientCategoryId}
        itemState={itemState}
        addedIngredients={addedIngredients}
        onChange={handleSetIngredientCategory}
        itemList={ingredientsCategoriesList}
        labelId="IngredientCategoryLabel"
        labelText="Ingredient category"
      />
      <IngredientsFormSelect
        id={id}
        value={ingredientId}
        itemState={itemState}
        addedIngredients={addedIngredients}
        onChange={handleSetIngredient}
        itemList={ingredientsList.filter(
          (ingredient) => ingredient.categoryId === ingredientCategoryId
        )}
        labelId="IngredientLabel"
        labelText="Ingredient"
      />
      <QuantityInputField
        id={id}
        itemState={itemState}
        handleSetQuantity={handleSetQuantity}
        handleOnBlurQuantity={handleOnBlurQuantity}
      />
    </div>
  );
};

export default IngredientsFormRow;
