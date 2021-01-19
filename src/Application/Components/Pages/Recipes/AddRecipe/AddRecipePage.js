import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
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
  handleChangePage,
} from "../../../shared/IngredientsForm/ingredientsFormFunctions";
import {
  handleOnBlur,
  handleSetValue,
} from "../../../Reusable/textInputHandlers";
import RecipeTextInputs from "../shared/RecipeTextInputs";
import IngredientsForm from "../../../shared/IngredientsForm/IngredientsForm";
import { recipeFormSchema } from "../../../../../Validations/RecipeFormValidation";
import {
  setAddingRecipe,
  setAddingRecipeDone,
} from "../../../../../store/actions/recipes";

const AddRecipePage = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.signIn.isAuthenticated);
  const addingRecipe = useSelector((state) => state.recipes.addingRecipe);

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
  const initialPaginationState = {
    page: 0,
    itemsPerPage: 10,
  };

  const [textInputState, setTextInputState] = React.useState(
    initialTextInputState
  );
  const [ingredientsState, setIngredientsState] = React.useState(
    initialInputState
  );
  const [recipeAdded, setRecipeAdded] = React.useState(false);
  const [pagination, setPagination] = React.useState(initialPaginationState);

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
    await handleSubmitPartial(
      recipeFormSchema,
      textInputState,
      setTextInputState,
      ingredientsState,
      setIngredientsState
    );
    if (
      await checkValidation(recipeFormSchema, textInputState, ingredientsState)
    ) {
      dispatch(setAddingRecipe());
      const { name, description, cookingTime } = textInputState.values;
      const requestData = {
        name: name,
        description: description,
        cookingTime: parseInt(cookingTime),
        ingredients: [...prepareIngredients(ingredientsState)],
      };
      axios
        .post("https://localhost:44356/api/Recipes/createRecipe", requestData)
        .then(() => dispatch(setAddingRecipeDone()))
        .then(() => toast.success(recipeAddedSuccess))
        .then(() => setRecipeAdded(true))
        .catch((err) => {
          dispatch(setAddingRecipeDone());
          toast.error(recipeAddedError);
        });
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
      pagination={pagination}
      handleChangePage={handleChangePage(pagination, setPagination)}
      isAuthenticated={isAuthenticated}
      elementAdded={recipeAdded}
      formLoading={addingRecipe}
      formLoadingText="Adding recipe"
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
