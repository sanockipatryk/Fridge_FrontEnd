import React from "react";
import { Button, Grid, Paper } from "@material-ui/core";
import { addRecipeStyles } from "../RecipesPageStyles";
import { Redirect, withRouter } from "react-router-dom";
import { FRIDGES, LOGIN, RECIPES } from "../../../../SSOT/navPaths";
// import RecipeTextInputs from "../shared/RecipeTextInputs";
import RecipeIngredientRow from "../shared/RecipeIngredientRow";

const RecipeForm = ({
  children,
  formType,
  action,
  ingredientsList,
  ingredientsCategoriesList,
  handleSubmit,
  // name,
  // description,
  // cookingTime,
  // handleSetValue,
  ingredient,
  handleSetIngredient,
  ingredientCategory,
  handleSetIngredientCategory,
  quantity,
  handleSetQuantity,
  handleRemoveIngredientFromList,
  handleAddNextIngredient,
  isAuthenticated,
  elementAdded,
  history,
}) => {
  const classes = addRecipeStyles();
  return (
    <Grid container item xs={12} justify="center" alignItems="center">
      <Grid container item xs={6}>
        <Paper elevation={3} className={classes.AddRecipePaper}>
          <Grid container item xs={12} justify="center">
            {ingredientsList?.length > 0 &&
            ingredientsCategoriesList.length > 0 ? (
              <form
                autoComplete="off"
                onSubmit={handleSubmit}
                className={classes.AddRecipeForm}
              >
                {children}
                {/* <RecipeTextInputs
                  name={name}
                  description={description}
                  cookingTime={cookingTime}
                  handleSetValue={handleSetValue}
                /> */}
                {ingredient.map((item, index) => (
                  <RecipeIngredientRow
                    key={index}
                    index={index}
                    formType={formType}
                    ingredient={item}
                    handleSetIngredient={handleSetIngredient}
                    ingredientsList={ingredientsList}
                    ingredientCategory={
                      ingredientCategory.filter((q) => q.id === item.id)[0]
                    }
                    handleSetIngredientCategory={handleSetIngredientCategory}
                    ingredientsCategoriesList={ingredientsCategoriesList}
                    quantity={quantity.filter((q) => q.id === item.id)[0]}
                    handleSetQuantity={handleSetQuantity}
                    handleRemoveIngredientFromList={
                      handleRemoveIngredientFromList
                    }
                  />
                ))}
                <div className={classes.IngredientRow}>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={handleAddNextIngredient}
                    className={
                      ingredient.length !== 0
                        ? classes.NextIngredientButton
                        : null
                    }
                  >
                    {ingredient.length === 0
                      ? "Add ingredient"
                      : "Next ingredient"}
                  </Button>
                </div>
                <Grid container item xs={12} justify="flex-end">
                  <Button
                    onClick={() => history.goBack()}
                    variant="contained"
                    className={classes.CancelButton}
                  >
                    Cancel
                  </Button>
                  <Button color="primary" variant="contained" type="submit">
                    {formType === "recipe"
                      ? action === "add"
                        ? "Add recipe"
                        : "Edit recipe"
                      : action === "add"
                      ? "Add fridge"
                      : "Edit fridge"}
                  </Button>
                </Grid>
              </form>
            ) : null}
          </Grid>
        </Paper>
      </Grid>
      {!isAuthenticated ? <Redirect to={LOGIN.path} exact /> : null}
      {formType === "recipe" ? (
        elementAdded ? (
          <Redirect to={RECIPES.path} exact />
        ) : null
      ) : elementAdded ? (
        <Redirect to={FRIDGES.path} exact />
      ) : null}
    </Grid>
  );
};

export default withRouter(RecipeForm);
