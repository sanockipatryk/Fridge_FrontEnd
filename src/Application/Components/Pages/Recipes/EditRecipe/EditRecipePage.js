import React, { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import {
  recipeEditedError,
  recipeEditedSuccess,
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

const EditRecipePage = () => {
  const isAuthenticated = useSelector((state) => state.signIn.isAuthenticated);
  const { ingredientsList, ingredientsCategoriesList } = useSelector(
    (state) => state.ingredients
  );

  let location = useLocation();
  console.log(location);
  const { recipe } = location?.state;

  const [name, setName] = React.useState(recipe?.name);
  const [description, setDescription] = React.useState(recipe?.description);
  const [cookingTime, setCookingTime] = React.useState(recipe?.cookingTime);
  const [ingredientCategory, setIngredientCategory] = React.useState([
    { id: 0, category: 0 },
  ]);
  const [ingredient, setIngredient] = React.useState([
    { id: 0, ingredient: 0 },
  ]);
  const [quantity, setQuantity] = React.useState([{ id: 0, quantity: 0 }]);
  const [recipeAdded, setRecipeAdded] = React.useState(false);

  useEffect(() => {
    const initializeData = () => {
      const currentIngredients = [...recipe?.ingredients];
      let ingredientCategories = [];
      let ingredients = [];
      let quantities = [];

      currentIngredients.forEach((i, index) => {
        console.log(i);
        ingredientCategories.push({ id: index, category: i.categoryId });
        ingredients.push({ id: index, ingredient: i.ingredientId });
        quantities.push({ id: index, quantity: i.quantity });
      });
      setIngredientCategory(ingredientCategories);
      setIngredient(ingredients);
      setQuantity(quantities);
    };
    initializeData();
  }, [recipe]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestData = {
      recipeId: recipe.id,
      name: name,
      description: description,
      cookingTime: parseInt(cookingTime),
      ingredients: [...prepareIngredients(ingredient, quantity)],
    };
    console.log(requestData);
    axios
      .put("https://localhost:44356/api/Recipes/editRecipe", requestData)
      .then((response) => console.log(response))
      .then(() => toast.success(recipeEditedSuccess))
      .then(() => setRecipeAdded(true))
      .catch((err) => toast.error(recipeEditedError));
  };

  return (
    <RecipeForm
      formType="recipe"
      action="edit"
      ingredientsList={ingredientsList}
      ingredientsCategoriesList={ingredientsCategoriesList}
      handleSubmit={handleSubmit}
      //   name={name}
      //   description={description}
      //   cookingTime={cookingTime}
      //   handleSetValue={handleSetValue(setName, setDescription, setCookingTime)}
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

export default EditRecipePage;
