import React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import InputField from "../../../Reusable/BasicInputField";
import RemoveIcon from "@material-ui/icons/Remove";
import { addRecipeStyles } from "../RecipesPageStyles";

const RecipeIngredientRow = ({
  index,
  formType,
  ingredient,
  handleSetIngredient,
  ingredientsList,
  ingredientCategory,
  handleSetIngredientCategory,
  ingredientsCategoriesList,
  quantity,
  handleSetQuantity,
  handleRemoveIngredientFromList,
}) => {
  const classes = addRecipeStyles();
  return (
    <div className={classes.IngredientRow}>
      {formType === "fridge" || index > 0 ? (
        <Button
          className={classes.RemoveIngredientButton}
          variant="contained"
          onClick={() => handleRemoveIngredientFromList(ingredient.id)}
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
          value={ingredientCategory.category}
          onChange={(e) =>
            handleSetIngredientCategory(e, ingredientCategory.id)
          }
          label="Ingredient category"
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
          value={ingredient.ingredient}
          onChange={(e) => handleSetIngredient(e, ingredient.id)}
          label="Ingredient"
        >
          {ingredientsList
            .filter(
              (ingredient) =>
                ingredient.categoryId === ingredientCategory.category
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
          value={quantity.quantity}
          onChange={(e) => handleSetQuantity(e, quantity.id)}
          name="Quantity"
          label="Quantity (g/ml)"
          type="number"
          fullWidth
        />
      </FormControl>
    </div>
  );
};

export default RecipeIngredientRow;
