import React, { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import {
  recipeEditedError,
  recipeEditedSuccess,
} from "../../../../SSOT/toastMessages";
import {
  handleSetValue,
  handleSetIngredient,
  handleSetIngredientCategory,
  handleSetQuantity,
  handleRemoveIngredientFromList,
  handleAddNextIngredient,
  prepareIngredients,
} from "../../../shared/IngredientsForm/ingredientsFormFunctions";
import RecipeTextInputs from "../shared/RecipeTextInputs";
import IngredientsForm from "../../../shared/IngredientsForm/IngredientsForm";

const EditRecipePage = () => {
  const isAuthenticated = useSelector((state) => state.signIn.isAuthenticated);
  const { ingredientsList, ingredientsCategoriesList } = useSelector(
    (state) => state.ingredients
  );

  const initialInputState = {
    name: "",
    description: "",
    cookingTime: 0,
    ingredients: [],
  };

  let location = useLocation();
  const { recipe } = location?.state;

  const [inputState, setInputState] = React.useState(initialInputState);
  const [recipeAdded, setRecipeAdded] = React.useState(false);

  useEffect(() => {
    const initializeData = () => {
      const currentIngredients = [...recipe?.ingredients];
      let initialIngredients = [];

      currentIngredients.forEach((i, index) => {
        initialIngredients.push({
          id: index,
          ingredientCategoryId: i.categoryId,
          ingredientId: i.ingredientId,
          quantity: i.quantity,
        });
      });
      setInputState({
        name: recipe?.name,
        description: recipe?.description,
        cookingTime: recipe?.cookingTime,
        ingredients: initialIngredients,
      });
    };
    initializeData();
  }, [recipe]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, description, cookingTime, ingredients } = inputState;
    const requestData = {
      recipeId: recipe.id,
      name: name,
      description: description,
      cookingTime: parseInt(cookingTime),
      ingredients: [...prepareIngredients(ingredients)],
    };
    axios
      .put("https://localhost:44356/api/Recipes/editRecipe", requestData)
      .then(() => toast.success(recipeEditedSuccess))
      .then(() => setRecipeAdded(true))
      .catch((err) => toast.error(recipeEditedError));
  };

  return (
    <IngredientsForm
      inputState={inputState}
      formType="recipe"
      action="edit"
      ingredientsList={ingredientsList}
      ingredientsCategoriesList={ingredientsCategoriesList}
      handleSubmit={handleSubmit}
      handleSetIngredient={handleSetIngredient(inputState, setInputState)}
      handleSetIngredientCategory={handleSetIngredientCategory(
        inputState,
        setInputState,
        ingredientsList
      )}
      handleSetQuantity={handleSetQuantity(inputState, setInputState)}
      handleRemoveIngredientFromList={handleRemoveIngredientFromList(
        inputState,
        setInputState
      )}
      handleAddNextIngredient={handleAddNextIngredient(
        inputState,
        setInputState,
        ingredientsCategoriesList,
        ingredientsList
      )}
      isAuthenticated={isAuthenticated}
      elementAdded={recipeAdded}
    >
      <RecipeTextInputs
        inputState={inputState}
        handleSetValue={handleSetValue(inputState, setInputState)}
      />
    </IngredientsForm>
  );
};

export default EditRecipePage;
