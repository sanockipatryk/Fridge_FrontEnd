import React, { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  recipeAddedError,
  recipeAddedSuccess,
} from "../../../../SSOT/toastMessages";
import RecipeForm from "../shared/RecipeForm";
import {
  handleSetValue,
  handleSetIngredient,
  handleSetIngredientCategory,
  handleSetQuantity,
  handleRemoveIngredientFromList,
  handleAddNextIngredient,
  prepareIngredients,
} from "../shared/recipeFormsFunctions";
import RecipeTextInputs from "../shared/RecipeTextInputs";

const AddRecipePage = () => {
  const isAuthenticated = useSelector((state) => state.signIn.isAuthenticated);
  const { ingredientsList, ingredientsCategoriesList } = useSelector(
    (state) => state.ingredients
  );

  const [name, setName] = React.useState("Boiled potatoes");
  const [description, setDescription] = React.useState(
    "First off start with washing the potatoes and peel them. Next put them in a pot with enough water to cover all potatoes. Salt the water..."
  );
  const [cookingTime, setCookingTime] = React.useState("50");
  const [ingredientCategory, setIngredientCategory] = React.useState([
    { id: 0, category: 0 },
  ]);
  const [ingredient, setIngredient] = React.useState([
    { id: 0, ingredient: 0 },
  ]);
  const [quantity, setQuantity] = React.useState([{ id: 0, quantity: 0 }]);
  const [recipeAdded, setRecipeAdded] = React.useState(false);

  useEffect(() => {
    setIngredientCategory(
      ingredientsCategoriesList.length > 0
        ? [{ id: 0, category: ingredientsCategoriesList[0]?.id }]
        : [{ id: 0, category: 0 }]
    );
    setIngredient(
      ingredientsList.length > 0
        ? [
            {
              id: 0,
              ingredient: ingredientsList.filter(
                (i) => i?.categoryId === ingredientsCategoriesList[0]?.id
              )[0]?.id,
            },
          ]
        : [{ id: 0, ingredient: 0 }]
    );
  }, [ingredientsCategoriesList, ingredientsList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestData = {
      name: name,
      description: description,
      cookingTime: parseInt(cookingTime),
      ingredients: [...prepareIngredients(ingredient, quantity)],
    };
    console.log(requestData);
    axios
      .post("https://localhost:44356/api/Recipes/createRecipe", requestData)
      .then((response) => console.log(response))
      .then(() => toast.success(recipeAddedSuccess))
      .then(() => setRecipeAdded(true))
      .catch((err) => toast.error(recipeAddedError));
  };

  return (
    <RecipeForm
      formType="recipe"
      action="add"
      ingredientsList={ingredientsList}
      ingredientsCategoriesList={ingredientsCategoriesList}
      handleSubmit={handleSubmit}
      // name={name}
      // description={description}
      // cookingTime={cookingTime}
      // handleSetValue={handleSetValue(setName, setDescription, setCookingTime)}
      ingredient={ingredient}
      handleSetIngredient={handleSetIngredient(ingredient, setIngredient)}
      ingredientCategory={ingredientCategory}
      handleSetIngredientCategory={handleSetIngredientCategory(
        ingredientCategory,
        ingredient,
        ingredientsList,
        setIngredient,
        setIngredientCategory
      )}
      quantity={quantity}
      handleSetQuantity={handleSetQuantity(quantity, setQuantity)}
      handleRemoveIngredientFromList={handleRemoveIngredientFromList(
        ingredientCategory,
        ingredient,
        quantity,
        setIngredientCategory,
        setIngredient,
        setQuantity
      )}
      handleAddNextIngredient={handleAddNextIngredient(
        ingredient,
        ingredientCategory,
        quantity,
        ingredientsCategoriesList,
        ingredientsList,
        setIngredientCategory,
        setIngredient,
        setQuantity
      )}
      isAuthenticated={isAuthenticated}
      elementAdded={recipeAdded}
    >
      <RecipeTextInputs
        name={name}
        description={description}
        cookingTime={cookingTime}
        handleSetValue={handleSetValue(setName, setDescription, setCookingTime)}
      />
    </RecipeForm>
  );
};

export default AddRecipePage;
