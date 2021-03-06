import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import {
  recipeEditedError,
  recipeEditedSuccess,
} from "../../../../SSOT/toastMessages";
import {
  handleSetIngredient,
  handleSetIngredientCategory,
  handleSetQuantity,
  handleRemoveIngredientFromList,
  handleAddNextIngredient,
  prepareIngredients,
  handleSubmitPartial,
  handleOnBlurQuantity,
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

const EditRecipePage = () => {
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
  const initialInputState = [];
  const initialPaginationState = {
    page: 0,
    itemsPerPage: 10,
  };

  let location = useLocation();
  const { recipe } = location?.state;

  const [textInputState, setTextInputState] = React.useState(
    initialTextInputState
  );
  const [ingredientsState, setIngredientsState] = React.useState(
    initialInputState
  );
  const [recipeAdded, setRecipeAdded] = React.useState(false);
  const [pagination, setPagination] = React.useState(initialPaginationState);

  useEffect(() => {
    const initializeData = () => {
      const currentIngredients = [...recipe?.ingredients];
      const initialIngredients = [];

      currentIngredients.forEach((i, index) => {
        initialIngredients.push({
          id: index,
          ingredientCategoryId: i.categoryId,
          ingredientId: i.ingredientId,
          quantity: i.quantity,
          quantityTouched: false,
          quantityError: "",
        });
      });
      setIngredientsState(initialIngredients);

      setTextInputState({
        values: {
          name: recipe?.name,
          description: recipe?.description,
          cookingTime: recipe?.cookingTime,
        },
        touched: {
          name: false,
          description: false,
          cookingTime: false,
        },
        errors: {},
      });
    };
    initializeData();
  }, [recipe]);

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
      dispatch(setAddingRecipe());
      const { name, description, cookingTime } = textInputState.values;
      const requestData = {
        recipeId: recipe.id,
        name: name,
        description: description,
        cookingTime: parseInt(cookingTime),
        ingredients: [...prepareIngredients(ingredientsState)],
      };
      axios
        .put("https://localhost:44356/api/Recipes/editRecipe", requestData)
        .then(() => dispatch(setAddingRecipeDone()))
        .then(() => toast.success(recipeEditedSuccess))
        .then(() => setRecipeAdded(true))
        .catch((err) => {
          dispatch(setAddingRecipeDone());
          toast.error(recipeEditedError);
        });
    }
  };

  return (
    <IngredientsForm
      formType="recipe"
      action="edit"
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
      formLoadingText="Editing recipe"
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

export default EditRecipePage;
