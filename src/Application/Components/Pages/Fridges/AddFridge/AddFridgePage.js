import React, { useEffect } from "react";
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
import { handleSetValue } from "../shared/fridgeFormsFunctions";
import FridgeTextInputs from "../shared/FridgeTextInputs";

const AddFridgePage = () => {
  const isAuthenticated = useSelector((state) => state.signIn.isAuthenticated);
  const { ingredientsList, ingredientsCategoriesList } = useSelector(
    (state) => state.ingredients
  );

  const [name, setName] = React.useState("Pantry stock");
  const [description, setDescription] = React.useState(
    "All of the food products left in my pantry"
  );
  const [ingredientCategory, setIngredientCategory] = React.useState([]);
  const [ingredient, setIngredient] = React.useState([]);
  const [quantity, setQuantity] = React.useState([]);
  const [fridgeAdded, setFridgeAdded] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestData = {
      name: name,
      description: description,
      ingredients:
        ingredient.length > 0
          ? [...prepareIngredients(ingredient, quantity)]
          : [],
    };
    console.log(requestData);
    axios
      .post("https://localhost:44356/api/Fridges/createFridge", requestData)
      .then((response) => console.log(response))
      .then(() => toast.success(fridgeAddedSuccess))
      .then(() => setFridgeAdded(true))
      .catch((err) => toast.error(fridgeAddedError));
  };

  return (
    <RecipeForm
      formType="fridge"
      action="add"
      ingredientsList={ingredientsList}
      ingredientsCategoriesList={ingredientsCategoriesList}
      handleSubmit={handleSubmit}
      //   handleSetValue={handleSetValue(setName, setDescription)}
      ingredient={ingredient}
      handleSetIngredient={handleSetIngredient(ingredient, setIngredient)}
      ingredientCategory={ingredientCategory}
      handleSetIngredientCategory={handleSetIngredientCategory(
        ingredientCategory,
        ingredient,
        ingredientsList,
        setIngredient,
        setIngredientCategory
      )}
      quantity={quantity}
      handleSetQuantity={handleSetQuantity(quantity, setQuantity)}
      handleRemoveIngredientFromList={handleRemoveIngredientFromList(
        ingredientCategory,
        ingredient,
        quantity,
        setIngredientCategory,
        setIngredient,
        setQuantity
      )}
      handleAddNextIngredient={handleAddNextIngredient(
        ingredient,
        ingredientCategory,
        quantity,
        ingredientsCategoriesList,
        ingredientsList,
        setIngredientCategory,
        setIngredient,
        setQuantity
      )}
      isAuthenticated={isAuthenticated}
      elementAdded={fridgeAdded}
    >
      <FridgeTextInputs
        name={name}
        description={description}
        handleSetValue={handleSetValue(setName, setDescription)}
      />
    </RecipeForm>
  );
};

export default AddFridgePage;
