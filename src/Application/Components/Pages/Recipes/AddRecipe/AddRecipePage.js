import React, { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  recipeAddedError,
  recipeAddedSuccess,
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

const AddRecipePage = () => {
  const isAuthenticated = useSelector((state) => state.signIn.isAuthenticated);
  const { ingredientsList, ingredientsCategoriesList } = useSelector(
    (state) => state.ingredients
  );

  const initialInputState = {
    name: "",
    description: "",
    cookingTime: 0,
    ingredients: [
      {
        id: 0,
        ingredientCategoryId: 0,
        ingredientId: 0,
        quantity: 0,
      },
    ],
  };

  const [inputState, setInputState] = React.useState(initialInputState);
  const [recipeAdded, setRecipeAdded] = React.useState(false);

  useEffect(() => {
    const firstCategoryId = ingredientsCategoriesList[0]?.id;
    const firstIngredientIdInCategory = ingredientsList.filter(
      (i) => i?.categoryId === firstCategoryId
    )[0]?.id;
    setInputState({
      name: "",
      description: "",
      cookingTime: 0,
      ingredients: [
        {
          id: 0,
          ingredientCategoryId: firstCategoryId,
          ingredientId: firstIngredientIdInCategory
            ? firstIngredientIdInCategory
            : 0,
          quantity: 0,
        },
      ],
    });
  }, [ingredientsCategoriesList, ingredientsList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, description, cookingTime, ingredients } = inputState;
    const requestData = {
      name: name,
      description: description,
      cookingTime: parseInt(cookingTime),
      ingredients: [...prepareIngredients(ingredients)],
    };
    axios
      .post("https://localhost:44356/api/Recipes/createRecipe", requestData)
      .then((response) => console.log(response))
      .then(() => toast.success(recipeAddedSuccess))
      .then(() => setRecipeAdded(true))
      .catch((err) => toast.error(recipeAddedError));
  };

  return (
    <IngredientsForm
      inputState={inputState}
      formType="recipe"
      action="add"
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

export default AddRecipePage;
