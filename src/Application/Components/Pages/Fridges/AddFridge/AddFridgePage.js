import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  fridgeAddedError,
  fridgeAddedSuccess,
} from "../../../../SSOT/toastMessages";
import RecipeForm from "../../Recipes/shared/RecipeForm";
import {
  handleSetIngredient,
  handleSetIngredientCategory,
  handleSetQuantity,
  handleRemoveIngredientFromList,
  handleAddNextIngredient,
  prepareIngredients,
} from "../../Recipes/shared/recipeFormsFunctions";
import { handleSetValue } from "../../Recipes/shared/recipeFormsFunctions";
import FridgeTextInputs from "../shared/FridgeTextInputs";

const AddFridgePage = () => {
  const isAuthenticated = useSelector((state) => state.signIn.isAuthenticated);
  const { ingredientsList, ingredientsCategoriesList } = useSelector(
    (state) => state.ingredients
  );

  const initialInputState = {
    name: "",
    description: "",
    ingredients: [],
  };

  const [fridgeAdded, setFridgeAdded] = React.useState(false);
  const [inputState, setInputState] = React.useState(initialInputState);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, description, ingredients } = inputState;
    const requestData = {
      name: name,
      description: description,
      ingredients:
        ingredients?.length > 0 ? [...prepareIngredients(ingredients)] : [],
    };
    axios
      .post("https://localhost:44356/api/Fridges/createFridge", requestData)
      .then(() => toast.success(fridgeAddedSuccess))
      .then(() => setFridgeAdded(true))
      .catch((err) => toast.error(fridgeAddedError));
  };

  return (
    <RecipeForm
      inputState={inputState}
      formType="fridge"
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
      elementAdded={fridgeAdded}
    >
      <FridgeTextInputs
        inputState={inputState}
        handleSetValue={handleSetValue(inputState, setInputState)}
      />
    </RecipeForm>
  );
};

export default AddFridgePage;
