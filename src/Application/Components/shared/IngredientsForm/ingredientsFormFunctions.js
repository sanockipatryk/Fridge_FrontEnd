export const handleSetValue = (inputState, setInputState) => (event) => {
  const { name, value } = event.target;
  setInputState({
    ...inputState,
    [name]: value,
  });
};

export const handleSetIngredient = (inputState, setInputState) => (
  event,
  id
) => {
  let currentIngredients = [...inputState];
  currentIngredients.find((i) => i.id === id).ingredientId = event.target.value;
  setInputState(currentIngredients);
};

export const handleSetIngredientCategory = (
  inputState,
  setInputState,
  ingredientsList
) => (event, id) => {
  let currentIngredients = [...inputState];
  currentIngredients.find((i) => i.id === id).ingredientCategoryId =
    event.target.value;

  const addedIngredients = getAddedIngredients(inputState);

  currentIngredients.find(
    (i) => i.id === id
  ).ingredientId = ingredientsList.filter(
    (ingredient) =>
      ingredient.categoryId === event.target.value &&
      !addedIngredients.includes(ingredient.id)
  )[0]?.id;

  setInputState(currentIngredients);
};

export const handleSetQuantity = (inputState, setInputState) => (event, id) => {
  console.log(inputState);
  let currentIngredients = [...inputState];
  currentIngredients.find((i) => i.id === id).quantity = event.target.value;
  setInputState(currentIngredients);
};

export const handleRemoveIngredientFromList = (inputState, setInputState) => (
  id
) => {
  const currentIngredients = [...inputState];

  setInputState(currentIngredients.filter((i) => i.id !== id));
};

// filtering ingredientList from already ingredients that were already added to the form
export const getUnselectedIngredients = (
  inputState,
  ingredientsList,
  id = null
) => {
  const ingredientsToDisplay = getAddedIngredients(inputState)?.filter(
    (i) => i !== id
  );
  return ingredientsList.filter((e) => !ingredientsToDisplay.includes(e.id));
};

// using map to return a list of ingredientId's that were already added to the form
export const getAddedIngredients = (inputState) => {
  return inputState?.map((i) => i?.ingredientId);
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
  inputState,
  setInputState,
  ingredientsCategoriesList,
  ingredientsList
) => () => {
  let currentIngredients = [...inputState];
  const currentlyAddedIngredients = getAddedIngredients(inputState);
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
  currentIngredients.length > 0
    ? (maxId = currentIngredients[currentIngredients.length - 1]?.id)
    : (maxId = -1);

  if (newCategoryId !== undefined)
    setInputState([
      ...inputState,
      {
        id: ++maxId,
        ingredientCategoryId: newCategoryId,
        ingredientId: newIngredientId,
        quantity: 0,
      },
    ]);
};

export const prepareIngredients = (ingredients) => {
  let currentIngredients = [];
  ingredients.forEach((i) => {
    currentIngredients.push({
      ingredientId: i.ingredientId,
      quantity: parseInt(i.quantity),
    });
  });
  return currentIngredients;
};
