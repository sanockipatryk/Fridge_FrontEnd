import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  fridgeAddedError,
  fridgeAddedSuccess,
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
import FridgeTextInputs from "../shared/FridgeTextInputs";
import IngredientsForm from "../../../shared/IngredientsForm/IngredientsForm";

const AddFridgePage = () => {
  const isAuthenticated = useSelector((state) => state.signIn.isAuthenticated);
  const { ingredientsList, ingredientsCategoriesList } = useSelector(
    (state) => state.ingredients
  );

  const initialTextInputState = {
    name: "",
    description: "",
  };
  const initialInputState = [];

  const [textInputState, setTextInputState] = React.useState(
    initialTextInputState
  );
  const [ingredientsState, setIngredientsState] = React.useState(
    initialInputState
  );
  const [fridgeAdded, setFridgeAdded] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, description } = textInputState;
    const requestData = {
      name: name,
      description: description,
      ingredients:
        ingredientsState?.length > 0
          ? [...prepareIngredients(ingredientsState)]
          : [],
    };
    axios
      .post("https://localhost:44356/api/Fridges/createFridge", requestData)
      .then(() => toast.success(fridgeAddedSuccess))
      .then(() => setFridgeAdded(true))
      .catch((err) => toast.error(fridgeAddedError));
  };

  return (
    <IngredientsForm
      inputState={ingredientsState}
      formType="fridge"
      action="add"
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
      elementAdded={fridgeAdded}
    >
      <FridgeTextInputs
        inputState={textInputState}
        handleSetValue={handleSetValue(textInputState, setTextInputState)}
      />
    </IngredientsForm>
  );
};

export default AddFridgePage;
