import React from "react";
import { Button, Grid, Paper } from "@material-ui/core";
import useStyles from "./IngredientsFormStyles";
import { Redirect, withRouter } from "react-router-dom";
import { FRIDGES, LOGIN, RECIPES } from "../../../SSOT/navPaths";
import IngredientsFormRow from "./IngredientsFormRow";

const IngredientsForm = ({
  children,
  inputState,
  formType,
  action,
  ingredientsList,
  ingredientsCategoriesList,
  handleSubmit,
  handleSetIngredient,
  handleSetIngredientCategory,
  handleSetQuantity,
  handleRemoveIngredientFromList,
  handleAddNextIngredient,
  isAuthenticated,
  elementAdded,
  history,
}) => {
  const classes = useStyles();
  const { ingredients } = inputState;
  return (
    <Grid container item xs={12} justify="center" alignItems="center">
      <Grid container item xs={6}>
        <Paper elevation={3} className={classes.FormPaper}>
          <Grid container item xs={12} justify="center">
            {ingredientsList?.length > 0 &&
            ingredientsCategoriesList.length > 0 ? (
              <form
                autoComplete="off"
                onSubmit={handleSubmit}
                className={classes.Form}
              >
                {children}
                {ingredients?.map((item, index) => (
                  <IngredientsFormRow
                    key={index}
                    index={index}
                    itemState={item}
                    formType={formType}
                    ingredientsList={ingredientsList}
                    ingredientsCategoriesList={ingredientsCategoriesList}
                    handleSetIngredient={handleSetIngredient}
                    handleSetIngredientCategory={handleSetIngredientCategory}
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
                      ingredients.length !== 0
                        ? classes.NextIngredientButton
                        : null
                    }
                  >
                    {ingredients.length === 0
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

export default withRouter(IngredientsForm);
