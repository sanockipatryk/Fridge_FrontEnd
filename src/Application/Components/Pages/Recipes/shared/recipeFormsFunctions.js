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
  const { ingredients } = inputState;
  let currentIngredients = [...ingredients];
  currentIngredients.find((i) => i.id === id).ingredientId = event.target.value;
  setInputState({
    ...inputState,
    ingredients: currentIngredients,
  });
};

export const handleSetIngredientCategory = (
  inputState,
  setInputState,
  ingredientsList
) => (event, id) => {
  const { ingredients } = inputState;
  let currentIngredients = [...ingredients];
  currentIngredients.find((i) => i.id === id).ingredientCategoryId =
    event.target.value;

  currentIngredients.find(
    (i) => i.id === id
  ).ingredientId = ingredientsList.filter(
    (ingredient) => ingredient.categoryId === event.target.value
  )[0]?.id;

  setInputState({
    ...inputState,
    ingredients: currentIngredients,
  });
};

export const handleSetQuantity = (inputState, setInputState) => (event, id) => {
  const { ingredients } = inputState;
  let currentIngredients = [...ingredients];
  currentIngredients.find((i) => i.id === id).quantity = event.target.value;
  setInputState({
    ...inputState,
    ingredients: currentIngredients,
  });
};

export const handleRemoveIngredientFromList = (inputState, setInputState) => (
  id
) => {
  const { ingredients } = inputState;
  const currentIngredients = [...ingredients];

  setInputState({
    ...inputState,
    ingredients: currentIngredients.filter((i) => i.id !== id),
  });
};

export const handleAddNextIngredient = (
  inputState,
  setInputState,
  ingredientsCategoriesList,
  ingredientsList
) => () => {
  const { ingredients } = inputState;
  let currentIngredients = [...ingredients];
  const firstCategoryId = ingredientsCategoriesList[0]?.id;
  const firstIngredientId = ingredientsList.filter(
    (ingredient) => ingredient.categoryId === firstCategoryId
  )[0]?.id;
  let maxId;
  currentIngredients.length > 0
    ? (maxId = currentIngredients[currentIngredients.length - 1]?.id)
    : (maxId = -1);

  setInputState({
    ...inputState,
    ingredients: [
      ...ingredients,
      {
        id: ++maxId,
        ingredientCategoryId: firstCategoryId,
        ingredientId: firstIngredientId,
        quantity: 0,
      },
    ],
  });
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
