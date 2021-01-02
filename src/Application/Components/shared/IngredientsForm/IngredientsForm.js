import React from "react";
import { Grid, Paper } from "@material-ui/core";
import useStyles from "./IngredientsFormStyles";
import { withRouter } from "react-router-dom";
import IngredientsFormRow from "./IngredientsFormRow";
import AddIngredientButton from "./AddIngredientButton";
import FormSubmitButtons from "./FormSubmitButtons";
import Redirects from "./Redirects";
import {
  getAddedIngredients,
  getPossibleIngredientCategories,
  getUnselectedIngredients,
} from "./ingredientsFormFunctions";
import IngredientFormList from "./IngredientFormList";

const IngredientsForm = ({
  children,
  ingredientsState,
  formType,
  action,
  ingredientsList,
  ingredientsCategoriesList,
  handleSubmit,
  handleSetIngredient,
  handleSetIngredientCategory,
  handleSetQuantity,
  handleOnBlurQuantity,
  handleRemoveIngredientFromList,
  handleAddNextIngredient,
  isAuthenticated,
  elementAdded,
  history,
}) => {
  const classes = useStyles();

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
                <IngredientFormList
                  ingredientsState={ingredientsState}
                  formType={formType}
                  ingredientsList={ingredientsList}
                  ingredientsCategoriesList={ingredientsCategoriesList}
                  handleSetIngredient={handleSetIngredient}
                  handleSetIngredientCategory={handleSetIngredientCategory}
                  handleSetQuantity={handleSetQuantity}
                  handleOnBlurQuantity={handleOnBlurQuantity}
                  handleRemoveIngredientFromList={
                    handleRemoveIngredientFromList
                  }
                  getUnselectedIngredients={getUnselectedIngredients}
                  getAddedIngredients={getAddedIngredients}
                  getPossibleIngredientCategories={
                    getPossibleIngredientCategories
                  }
                />
                <AddIngredientButton
                  ingredients={ingredientsState}
                  handleAddNextIngredient={handleAddNextIngredient}
                />
                <FormSubmitButtons
                  action={action}
                  formType={formType}
                  history={history}
                />
              </form>
            ) : null}
          </Grid>
        </Paper>
      </Grid>
      <Redirects
        formType={formType}
        isAuthenticated={isAuthenticated}
        elementAdded={elementAdded}
      />
    </Grid>
  );
};

export default withRouter(IngredientsForm);
