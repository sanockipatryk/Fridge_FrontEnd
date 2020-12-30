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

  const initialTextInputState = {
    name: "",
    description: "",
    cookingTime: 0,
  };
  const initialInputState = [];

  let location = useLocation();
  const { recipe } = location?.state;

  const [textInputState, setTextInputState] = React.useState(
    initialTextInputState
  );
  const [ingredientsState, setIngredientsState] = React.useState(
    initialInputState
  );
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
      setTextInputState({
        name: recipe?.name,
        description: recipe?.description,
        cookingTime: recipe?.cookingTime,
      });
      setIngredientsState(initialIngredients);
    };
    initializeData();
  }, [recipe]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, description, cookingTime } = textInputState;
    const requestData = {
      recipeId: recipe.id,
      name: name,
      description: description,
      cookingTime: parseInt(cookingTime),
      ingredients: [...prepareIngredients(ingredientsState)],
    };
    axios
      .put("https://localhost:44356/api/Recipes/editRecipe", requestData)
      .then(() => toast.success(recipeEditedSuccess))
      .then(() => setRecipeAdded(true))
      .catch((err) => toast.error(recipeEditedError));
  };

  return (
    <IngredientsForm
      inputState={ingredientsState}
      formType="recipe"
      action="edit"
      ingredientsList={ingredientsList}
      ingredientsCategoriesList={ingredientsCategoriesList}
      handleSubmit={handleSubmit}
      handleSetIngredient={handleSetIngredient(
        ingredientsState,
        setIngredientsState
      )}
      handleSetIngredientCategory={handleSetIngredientCategory(
        ingredientsState,
        setIngredientsState,
        ingredientsList
      )}
      handleSetQuantity={handleSetQuantity(
        ingredientsState,
        setIngredientsState
      )}
      handleRemoveIngredientFromList={handleRemoveIngredientFromList(
        ingredientsState,
        setIngredientsState
      )}
      handleAddNextIngredient={handleAddNextIngredient(
        ingredientsState,
        setIngredientsState,
        ingredientsCategoriesList,
        ingredientsList
      )}
      isAuthenticated={isAuthenticated}
      elementAdded={recipeAdded}
    >
      <RecipeTextInputs
        inputState={textInputState}
        handleSetValue={handleSetValue(textInputState, setTextInputState)}
      />
    </IngredientsForm>
  );
};

export default EditRecipePage;
