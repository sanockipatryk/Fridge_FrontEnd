import React, { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  recipeAddedError,
  recipeAddedSuccess,
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
import RecipeTextInputs from "../shared/RecipeTextInputs";
import IngredientsForm from "../../../shared/IngredientsForm/IngredientsForm";
import { recipeFormSchema } from "../../../../../Validations/RecipeFormValidation";

const AddRecipePage = () => {
  const isAuthenticated = useSelector((state) => state.signIn.isAuthenticated);
  const { ingredientsList, ingredientsCategoriesList } = useSelector(
    (state) => state.ingredients
  );

  const initialTextInputState = {
    values: {
      name: "",
      description: "",
      cookingTime: 0,
    },
    touched: {
      name: false,
      description: false,
      cookingTime: false,
    },
    errors: {},
  };
  const initialInputState = [
    {
      id: 0,
      ingredientCategoryId: 0,
      ingredientId: 0,
      quantity: 0,
      quantityTouched: false,
      quantityErorr: "",
    },
  ];

  const [textInputState, setTextInputState] = React.useState(
    initialTextInputState
  );
  const [ingredientsState, setIngredientsState] = React.useState(
    initialInputState
  );
  const [recipeAdded, setRecipeAdded] = React.useState(false);

  useEffect(() => {
    const firstCategoryId = ingredientsCategoriesList[0]?.id;
    const firstIngredientIdInCategory = ingredientsList.filter(
      (i) => i?.categoryId === firstCategoryId
    )[0]?.id;
    setIngredientsState([
      {
        id: 0,
        ingredientCategoryId: firstCategoryId,
        ingredientId: firstIngredientIdInCategory
          ? firstIngredientIdInCategory
          : 0,
        quantity: 0,
        quantityError: "",
        quantityTouched: false,
      },
    ]);
  }, [ingredientsCategoriesList, ingredientsList]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleSubmitPartial(
      recipeFormSchema,
      textInputState,
      setTextInputState,
      ingredientsState,
      setIngredientsState
    );
    if (
      await checkValidation(recipeFormSchema, textInputState, ingredientsState)
    ) {
      const { name, description, cookingTime } = textInputState.values;
      const requestData = {
        name: name,
        description: description,
        cookingTime: parseInt(cookingTime),
        ingredients: [...prepareIngredients(ingredientsState)],
      };
      axios
        .post("https://localhost:44356/api/Recipes/createRecipe", requestData)
        .then(() => toast.success(recipeAddedSuccess))
        .then(() => setRecipeAdded(true))
        .catch((err) => toast.error(recipeAddedError));
    }
  };

  return (
    <IngredientsForm
      formType="recipe"
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
        recipeFormSchema
      )}
      handleOnBlurQuantity={handleOnBlurQuantity(
        ingredientsState,
        setIngredientsState,
        recipeFormSchema
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
        handleSetValue={handleSetValue(
          textInputState,
          setTextInputState,
          recipeFormSchema
        )}
        handleOnBlur={handleOnBlur(
          textInputState,
          setTextInputState,
          recipeFormSchema
        )}
      />
    </IngredientsForm>
  );
};

export default AddRecipePage;
