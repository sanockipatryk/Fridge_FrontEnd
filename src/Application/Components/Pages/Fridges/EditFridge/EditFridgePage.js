import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import {
  fridgeAddedError,
  fridgeAddedSuccess,
  fridgeEditedError,
  fridgeEditedSuccess,
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
import FridgeTextInputs from "../shared/FridgeTextInputs";
import IngredientsForm from "../../../shared/IngredientsForm/IngredientsForm";
import { fridgeFormSchema } from "../../../../../Validations/FridgeFormValidation";
import {
  setAddingFridge,
  setAddingFridgeDone,
} from "../../../../../store/actions/fridges";

const EditFridgePage = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.signIn.isAuthenticated);
  const addingFridge = useSelector((state) => state.fridges.addingFridge);

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
  const initialPaginationState = {
    page: 0,
    itemsPerPage: 10,
  };

  let location = useLocation();
  const { fridge } = location?.state;

  const [textInputState, setTextInputState] = React.useState(
    initialTextInputState
  );
  const [ingredientsState, setIngredientsState] = React.useState(
    initialInputState
  );
  const [fridgeAdded, setFridgeAdded] = React.useState(false);
  const [pagination, setPagination] = React.useState(initialPaginationState);

  useEffect(() => {
    const initializeData = () => {
      const currentIngredients = [...fridge?.ingredients];
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
          name: fridge?.name,
          description: fridge?.description,
        },
        touched: {
          name: false,
          description: false,
        },
        errors: {},
      });
    };
    initializeData();
  }, [fridge]);

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
      dispatch(setAddingFridge());
      const { name, description } = textInputState.values;
      const requestData = {
        fridgeId: fridge.id,
        name: name,
        description: description,
        ingredients:
          ingredientsState?.length > 0
            ? [...prepareIngredients(ingredientsState)]
            : [],
      };
      axios
        .put("https://localhost:44356/api/Fridges/editFridge", requestData)
        .then(() => dispatch(setAddingFridgeDone()))
        .then(() => toast.success(fridgeEditedSuccess))
        .then(() => setFridgeAdded(true))
        .catch((err) => {
          dispatch(setAddingFridgeDone());
          toast.error(fridgeEditedError);
        });
    }
  };

  return (
    <IngredientsForm
      formType="fridge"
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
      pagination={pagination}
      handleChangePage={handleChangePage(pagination, setPagination)}
      isAuthenticated={isAuthenticated}
      elementAdded={fridgeAdded}
      formLoading={addingFridge}
      formLoadingText="Editing fridge"
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

export default EditFridgePage;
