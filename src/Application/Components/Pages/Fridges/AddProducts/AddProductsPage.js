import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  productsAddedToFridgeError,
  productsAddedToFridgeSuccess,
} from "../../../../SSOT/toastMessages";
import {
  handleSetIngredient,
  handleSetIngredientCategory,
  handleSetQuantity,
  handleRemoveIngredientFromList,
  handleAddNextIngredient,
  prepareIngredients,
  handleOnBlurQuantity,
  handleChangePage,
  handleSubmitPartialAddProducts,
  checkValidationAddProducts,
} from "../../../shared/IngredientsForm/ingredientsFormFunctions";

import IngredientsForm from "../../../shared/IngredientsForm/IngredientsForm";
import { fridgeFormSchema } from "../../../../../Validations/FridgeFormValidation";
import { addProductsSchema } from "../../../../../Validations/AddProductsValidation";
import { useLocation } from "react-router-dom";
import {
  setAddingFridge,
  setAddingFridgeDone,
} from "../../../../../store/actions/fridges";

const AddProductsPage = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.signIn.isAuthenticated);
  const addingFridge = useSelector((state) => state.fridges.addingFridge);

  const { ingredientsList, ingredientsCategoriesList } = useSelector(
    (state) => state.ingredients
  );

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

  let location = useLocation();
  const { fridge } = location?.state;

  const [ingredientsState, setIngredientsState] = React.useState(
    initialInputState
  );
  const [fridgeAdded, setFridgeAdded] = React.useState(false);
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
    handleSubmitPartialAddProducts(
      addProductsSchema,
      ingredientsState,
      setIngredientsState
    );
    if (await checkValidationAddProducts(addProductsSchema, ingredientsState)) {
      dispatch(setAddingFridge());
      const requestData = {
        fridgeId: fridge?.id,
        ingredients:
          ingredientsState?.length > 0
            ? [...prepareIngredients(ingredientsState)]
            : [],
      };
      axios
        .put("https://localhost:44356/api/Fridges/addProducts", requestData)
        .then(() => dispatch(setAddingFridgeDone()))
        .then(() => toast.success(productsAddedToFridgeSuccess))
        .then(() => setFridgeAdded(true))
        .catch((err) => {
          setAddingFridgeDone(true);
          toast.error(productsAddedToFridgeError);
        });
    }
  };

  return (
    <IngredientsForm
      formType="addProducts"
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
      pagination={pagination}
      handleChangePage={handleChangePage(pagination, setPagination)}
      isAuthenticated={isAuthenticated}
      elementAdded={fridgeAdded}
      formLoading={addingFridge}
      formLoadingText="Adding products"
    ></IngredientsForm>
  );
};

export default AddProductsPage;
