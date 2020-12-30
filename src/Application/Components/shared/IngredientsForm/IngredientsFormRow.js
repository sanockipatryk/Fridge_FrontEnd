import React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";
import InputField from "../../Reusable/BasicInputField";
import useStyles from "./IngredientsFormStyles";

const IngredientsFormRow = React.memo(
  ({
    itemState,
    formType,
    addedIngredients,
    ingredientsList,
    ingredientsCategoriesList,
    handleSetIngredient,
    handleSetIngredientCategory,
    handleSetQuantity,
    handleRemoveIngredientFromList,
  }) => {
    const classes = useStyles();
    const { id, ingredientCategoryId, ingredientId, quantity } = itemState;

    return (
      <div className={classes.IngredientRow}>
        {formType === "fridge" || addedIngredients.length > 1 ? (
          <Button
            className={classes.RemoveIngredientButton}
            variant="contained"
            onClick={() => handleRemoveIngredientFromList(id)}
          >
            <RemoveIcon className={classes.RemoveIngredientIcon} />
          </Button>
        ) : null}
        <FormControl variant="outlined" className={classes.FormControlWide}>
          <InputLabel id="IngredientCategoryLabel">
            Ingredient category
          </InputLabel>
          <Select
            labelId="IngredientCategoryLabel"
            id="Ingredient category"
            value={ingredientCategoryId}
            onChange={(e) => handleSetIngredientCategory(e, id)}
            label="Ingredient category"
            inputProps={{ MenuProps: { disableScrollLock: true } }}
          >
            {ingredientsCategoriesList.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.FormControlWide}>
          <InputLabel id="IngredientLabel">Ingredient</InputLabel>
          <Select
            labelId="IngredientLabel"
            id="Ingredient"
            value={ingredientId}
            onChange={(e) => handleSetIngredient(e, id)}
            label="Ingredient"
            inputProps={{ MenuProps: { disableScrollLock: true } }}
          >
            {ingredientsList
              .filter(
                (ingredient) => ingredient.categoryId === ingredientCategoryId
              )
              .map((ingredient) => (
                <MenuItem key={ingredient.id} value={ingredient.id}>
                  {ingredient.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl
          variant="outlined"
          className={classes.FormControlSlim}
          fullWidth
        >
          <InputField
            value={quantity}
            onChange={(e) => handleSetQuantity(e, id)}
            name="Quantity"
            label="Quantity (g/ml)"
            type="number"
            fullWidth
          />
        </FormControl>
      </div>
    );
  },
  (prevProps, nextProps) => {
    if (
      prevProps.itemState.quantity !== nextProps.itemState.quantity ||
      prevProps.itemState.ingredientId !== nextProps.itemState.ingredientId ||
      JSON.stringify(prevProps.addedIngredients) !==
        JSON.stringify(nextProps.addedIngredients)
    ) {
      return false;
    } else return true;
  }
);

export default IngredientsFormRow;
