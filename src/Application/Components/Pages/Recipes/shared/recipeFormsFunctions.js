export const handleSetValue = (setName, setDescription, setCookingTime) => (
  event
) => {
  switch (event.target.name) {
    case "Name":
      setName(event.target.value);
      break;
    case "Description":
      setDescription(event.target.value);
      break;
    case "CookingTime":
      setCookingTime(event.target.value);
      break;
    default:
      break;
  }
};

export const handleSetIngredient = (ingredient, setIngredient) => (
  event,
  id
) => {
  let currentIngredient = [...ingredient];
  currentIngredient.find((i) => i.id === id).ingredient = event.target.value;
  setIngredient(currentIngredient);
};

export const handleSetIngredientCategory = (
  ingredientCategory,
  ingredient,
  ingredientsList,
  setIngredient,
  setIngredientCategory
) => (event, id) => {
  let currentIngredientCategory = [...ingredientCategory];
  currentIngredientCategory.find((i) => i.id === id).category =
    event.target.value;

  let currentIngredient = [...ingredient];
  currentIngredient.find(
    (i) => i.id === id
  ).ingredient = ingredientsList.filter(
    (ingredient) => ingredient.categoryId === event.target.value
  )[0]?.id;

  setIngredient(currentIngredient);
  setIngredientCategory(currentIngredientCategory);
};

export const handleSetQuantity = (quantity, setQuantity) => (event, id) => {
  let currentQuantities = [...quantity];
  currentQuantities.find((i) => i.id === id).quantity = event.target.value;
  setQuantity(currentQuantities);
};

export const handleRemoveIngredientFromList = (
  ingredientCategory,
  ingredient,
  quantity,
  setIngredientCategory,
  setIngredient,
  setQuantity
) => (id) => {
  let currentIngredientCategories = [...ingredientCategory];
  let currentIngredients = [...ingredient];
  let currentQuantities = [...quantity];

  const reducedIngredientCategories = currentIngredientCategories.filter(
    (i) => i.id !== id
  );
  const reducedIngredients = currentIngredients.filter((i) => i.id !== id);
  const reducedQuantities = currentQuantities.filter((i) => i.id !== id);

  setIngredientCategory(reducedIngredientCategories);
  setIngredient(reducedIngredients);
  setQuantity(reducedQuantities);
};

export const handleAddNextIngredient = (
  ingredient,
  ingredientCategory,
  quantity,
  ingredientsCategoriesList,
  ingredientsList,
  setIngredientCategory,
  setIngredient,
  setQuantity
) => () => {
  let currentIngredients = [...ingredient];
  let currentIngredientCategories = [...ingredientCategory];
  let currentQuantities = [...quantity];
  const firstCategoryId = ingredientsCategoriesList[0]?.id;
  let maxId;
  currentIngredients.length > 0
    ? (maxId = currentIngredients[currentIngredients.length - 1]?.id)
    : (maxId = -1);
  currentIngredientCategories.push({
    id: maxId + 1,
    category: firstCategoryId,
  });
  currentIngredients.push({
    id: maxId + 1,
    ingredient: ingredientsList.filter(
      (ingredient) => ingredient.categoryId === firstCategoryId
    )[0]?.id,
  });
  currentQuantities.push({ id: maxId + 1, quantity: 0 });
  setIngredientCategory(currentIngredientCategories);
  setIngredient(currentIngredients);
  setQuantity(currentQuantities);
};

export const prepareIngredients = (ingredientList, quantityList) => {
  let currentIngredients = [];
  ingredientList.forEach((i) => {
    currentIngredients.push({
      ingredientId: i.ingredient,
      quantity: parseInt(quantityList.find((q) => q.id === i.id).quantity),
    });
  });
  return currentIngredients;
};
