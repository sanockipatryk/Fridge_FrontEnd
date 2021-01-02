import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  fridgeAddedError,
  fridgeAddedSuccess,
} from "../../../../SSOT/toastMessages";
import {
  handleSetIngredient,
  handleSetIngredientCategory,
  handleSetQuantity,
  handleRemoveIngredientFromList,
  handleAddNextIngredient,
  prepareIngredients,
  handleOnBlurQuantity,
  handleSubmitPartial,
  checkValidation,
} from "../../../shared/IngredientsForm/ingredientsFormFunctions";
import {
  handleOnBlur,
  handleSetValue,
} from "../../../Reusable/textInputHandlers";
import FridgeTextInputs from "../shared/FridgeTextInputs";
import IngredientsForm from "../../../shared/IngredientsForm/IngredientsForm";
import { fridgeFormSchema } from "../../../../../Validations/FridgeFormValidation";

const AddFridgePage = () => {
  const isAuthenticated = useSelector((state) => state.signIn.isAuthenticated);
  const { ingredientsList, ingredientsCategoriesList } = useSelector(
    (state) => state.ingredients
  );

  const initialTextInputState = {
    values: {
      name: "",
      description: "",
    },
    touched: {
      name: false,
      description: false,
    },
    errors: {},
  };
  const initialInputState = [];

  const [textInputState, setTextInputState] = React.useState(
    initialTextInputState
  );
  const [ingredientsState, setIngredientsState] = React.useState(
    initialInputState
  );
  const [fridgeAdded, setFridgeAdded] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleSubmitPartial(
      fridgeFormSchema,
      textInputState,
      setTextInputState,
      ingredientsState,
      setIngredientsState
    );
    if (
      await checkValidation(fridgeFormSchema, textInputState, ingredientsState)
    ) {
      const { name, description } = textInputState.values;
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
    }
  };

  return (
    <IngredientsForm
      formType="fridge"
      action="add"
      ingredientsState={ingredientsState}
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
        setIngredientsState,
        fridgeFormSchema
      )}
      handleOnBlurQuantity={handleOnBlurQuantity(
        ingredientsState,
        setIngredientsState,
        fridgeFormSchema
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
        handleSetValue={handleSetValue(
          textInputState,
          setTextInputState,
          fridgeFormSchema
        )}
        handleOnBlur={handleOnBlur(
          textInputState,
          setTextInputState,
          fridgeFormSchema
        )}
      />
    </IngredientsForm>
  );
};

export default AddFridgePage;
