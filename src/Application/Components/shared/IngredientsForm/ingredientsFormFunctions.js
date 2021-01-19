import {
  validateForm,
  validateSingleQuantityField,
} from "../../../../Validations/validations";

export const handleSetValue = (ingredientsState, setIngredientsState) => (
  event
) => {
  const { name, value } = event.target;
  setIngredientsState({
    ...ingredientsState,
    values: {
      ...ingredientsState.values,
      [name]: value,
    },
  });
};

export const handleSetIngredient = (ingredientsState, setIngredientsState) => (
  event,
  id
) => {
  const index = ingredientsState.findIndex((i) => i.id === id);
  const old = ingredientsState[index];
  const updated = { ...old, ingredientId: event.target.value };
  const clone = [...ingredientsState];
  clone[index] = updated;

  setIngredientsState(clone);
};

export const handleSetIngredientCategory = (
  ingredientsState,
  setIngredientsState,
  ingredientsList
) => (event, id) => {
  const { value } = event.target;
  const addedIngredients = getAddedIngredients(ingredientsState);

  const index = ingredientsState.findIndex((i) => i.id === id);
  const old = ingredientsState[index];
  const updated = {
    ...old,
    ingredientCategoryId: value,
    ingredientId: ingredientsList.filter(
      (ingredient) =>
        ingredient.categoryId === value &&
        !addedIngredients.includes(ingredient.id)
    )[0]?.id,
  };
  const clone = [...ingredientsState];
  clone[index] = updated;

  setIngredientsState(clone);
};

export const handleSetQuantity = (
  ingredientsState,
  setIngredientsState,
  schema
) => async (event, id) => {
  const { value } = event.target;
  const index = ingredientsState.findIndex((i) => i.id === id);
  let err;

  if (ingredientsState[index].quantityTouched === true)
    err = await validateSingleQuantityField(schema, value);
  else err = null;

  const old = ingredientsState[index];
  const updated = { ...old, quantity: parseInt(value), quantityError: err };
  const clone = [...ingredientsState];
  clone[index] = updated;

  setIngredientsState(clone);
};

export const handleOnBlurQuantity = (
  ingredientsState,
  setIngredientsState,
  schema
) => async (event, id) => {
  if (ingredientsState.find((i) => i.id === id).quantityTouched === false) {
    const { value } = event.target;
    let err;
    err = await validateSingleQuantityField(schema, value);

    const index = ingredientsState.findIndex((i) => i.id === id);
    const old = ingredientsState[index];
    const updated = { ...old, quantityTouched: true, quantityError: err };
    const clone = [...ingredientsState];
    clone[index] = updated;

    setIngredientsState(clone);
  }
};

export const handleRemoveIngredientFromList = (
  ingredientsState,
  setIngredientsState
) => (id) => {
  const clone = [...ingredientsState];
  setIngredientsState(clone.filter((i) => i.id !== id));
};

// filtering ingredientList from already ingredients that were already added to the form
export const getUnselectedIngredients = (
  ingredientsState,
  ingredientsList,
  id = null
) => {
  const ingredientsToDisplay = getAddedIngredients(ingredientsState)?.filter(
    (i) => i !== id
  );
  return ingredientsList.filter((e) => !ingredientsToDisplay.includes(e.id));
};

// using map to return a list of ingredientId's that were already added to the form
export const getAddedIngredients = (ingredientsState) => {
  const clone = [...ingredientsState];
  return clone?.map((i) => i?.ingredientId);
};

// returning ingredient categories that have a ingredient to select from
export const getPossibleIngredientCategories = (
  addedIngredients,
  ingredientsList,
  ingredientsCategoriesList,
  currentCategory
) => {
  let nonEmptyCategories = [];
  for (let category of ingredientsCategoriesList) {
    if (
      category.id === currentCategory ||
      ingredientsList.filter(
        (ingredient) =>
          ingredient.categoryId === category.id &&
          !addedIngredients?.includes(ingredient.id)
      )?.length > 0
    )
      nonEmptyCategories.push(category);
  }
  return nonEmptyCategories;
};

export const handleAddNextIngredient = (
  ingredientsState,
  setIngredientsState,
  ingredientsCategoriesList,
  ingredientsList
) => () => {
  const clone = [...ingredientsState];
  const currentlyAddedIngredients = getAddedIngredients(clone);
  let newCategoryId;

  const possibleCategories = getPossibleIngredientCategories(
    currentlyAddedIngredients,
    ingredientsList,
    ingredientsCategoriesList
  );

  newCategoryId = possibleCategories[0]?.id;

  // setting newly added ingredient to first possible category(category that contains ingredients to add from) and to first ingredientId from selected category
  const newIngredientId = ingredientsList.filter(
    (ingredient) =>
      ingredient.categoryId === newCategoryId &&
      !currentlyAddedIngredients?.includes(ingredient.id)
  )[0]?.id;

  let maxId;
  clone.length > 0 ? (maxId = clone[clone.length - 1]?.id) : (maxId = -1);

  if (newCategoryId !== undefined)
    setIngredientsState([
      ...clone,
      {
        id: ++maxId,
        ingredientCategoryId: newCategoryId,
        ingredientId: newIngredientId,
        quantity: 0,
        quantityError: "",
        quantityTouched: false,
      },
    ]);
};

export const handleSubmitPartial = async (
  schema,
  textInputState,
  setTextInputState,
  ingredientsState,
  setIngredientsState
) => {
  let touchedAll = {};
  Object.keys(textInputState.touched).forEach(
    (t) => (touchedAll = { ...touchedAll, [t]: true })
  );
  const cloneIngredients = [...ingredientsState];
  const cloneInputState = { ...textInputState };
  const quantities = cloneIngredients.map((i) => i.quantity);
  const values = {
    ...cloneInputState.values,
    quantities: quantities,
  };
  let schemaErrors = await validateForm(schema, values);

  let textInputStateErrors = {};
  Object.keys(textInputState.values).forEach(
    (t) =>
      (textInputStateErrors = { ...textInputStateErrors, [t]: schemaErrors[t] })
  );

  setTextInputState({
    ...cloneInputState,
    touched: touchedAll,
    errors: textInputStateErrors,
  });

  const newIngredients = [];
  cloneIngredients.forEach((i) => {
    newIngredients.push({
      ...i,
      quantityError: schemaErrors[`quantities[${i.id}]`] ?? "",
      quantityTouched: true,
    });
  });

  setIngredientsState(newIngredients);
};

export const handleSubmitPartialAddProducts = async (
  schema,
  ingredientsState,
  setIngredientsState
) => {
  const cloneIngredients = [...ingredientsState];
  const quantities = cloneIngredients.map((i) => i.quantity);
  const values = {
    quantities: quantities,
  };
  let schemaErrors = await validateForm(schema, values);

  const newIngredients = [];
  cloneIngredients.forEach((i) => {
    newIngredients.push({
      ...i,
      quantityError: schemaErrors[`quantities[${i.id}]`] ?? "",
      quantityTouched: true,
    });
  });

  setIngredientsState(newIngredients);
};

export const checkValidation = async (
  schema,
  textInputState,
  ingredientsState
) => {
  const cloneIngredients = [...ingredientsState];
  const cloneInputState = { ...textInputState };

  const quantities = cloneIngredients.map((i) => i.quantity);
  const values = {
    ...cloneInputState.values,
    quantities: [...quantities],
  };
  const schemaErrors = await validateForm(schema, values)
    .then((e) => e)
    .catch();

  return (
    Object.keys(schemaErrors).length === 0 &&
    schemaErrors.constructor === Object
  );
};

export const checkValidationAddProducts = async (schema, ingredientsState) => {
  const cloneIngredients = [...ingredientsState];

  const quantities = cloneIngredients.map((i) => i.quantity);
  const values = {
    quantities: [...quantities],
  };
  const schemaErrors = await validateForm(schema, values)
    .then((e) => e)
    .catch();

  return (
    Object.keys(schemaErrors).length === 0 &&
    schemaErrors.constructor === Object
  );
};

export const prepareIngredients = (ingredients) => {
  const currentIngredients = [];
  ingredients.forEach((i) => {
    currentIngredients.push({
      ingredientId: i.ingredientId,
      quantity: parseInt(i.quantity),
    });
  });
  return currentIngredients;
};

export const handleChangePage = (pagination, setPagination) => (direction) => {
  if (direction === "prev" && pagination.page > 0) {
    setPagination({
      ...pagination,
      page: pagination.page - 1,
    });
  } else if (direction === "next") {
    setPagination({
      ...pagination,
      page: pagination.page + 1,
    });
  }
};

export const calculateCookingTime = (cookingTime) => {
  const hours = Math.floor(cookingTime / 60);
  if (hours > 0)
    return `${hours} ${hours === 1 ? "hour" : "hours"} ${
      cookingTime - hours * 60
    } ${cookingTime - hours * 60 === 1 ? "minute" : "minutes"}`;
  else return `${cookingTime} ${cookingTime === 1 ? "minute" : "minutes"}`;
};
