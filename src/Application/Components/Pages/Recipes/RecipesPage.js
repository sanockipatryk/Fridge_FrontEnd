import React from "react";
import { Button, Grid, Paper } from "@material-ui/core";
import axios from "axios";
import { toast } from "react-toastify";
import {
  recipeDeletedError,
  recipeDeletedSuccess,
} from "../../../SSOT/toastMessages";
import { useStyles } from "./RecipesPageStyles";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ADD_RECIPE } from "../../../SSOT/navPaths";
import RecipeListItem from "./RecipeListItem";
import { getUserRecipes } from "../../../../store/actions/recipes";
import LoadingIndicator from "../../Reusable/LoadingIndicator";
import { loadingRecipesMessage } from "../../../SSOT/loadingIndicatorMessages";

const RecipesPage = () => {
  const { recipesList, recipesListLoading } = useSelector(
    (state) => state.recipes
  );
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleDeleteRecipe = (id) => () => {
    axios
      .delete(`https://localhost:44356/api/Recipes/deleteRecipe/${id}`)
      .then((response) => console.log(response))
      .then(() =>
        dispatch(getUserRecipes(recipesList.filter((r) => r.id !== id)))
      )
      .then(() => toast.success(recipeDeletedSuccess))
      .catch((err) => toast.error(recipeDeletedError));
  };

  return (
    <Grid
      container
      item
      xs={12}
      className={classes.MainGrid}
      justify="space-between"
    >
      <Grid container item xs={12} className={classes.FridgesBox}>
        <Paper elevation={3} className={classes.GridPaper}>
          <Grid container item xs={12} className={classes.FridgesBoxList}>
            {recipesListLoading ? (
              <LoadingIndicator displayText={loadingRecipesMessage} />
            ) : (
              recipesList?.map((recipe) => (
                <RecipeListItem
                  key={recipe.id}
                  recipe={recipe}
                  handleDeleteRecipe={handleDeleteRecipe(recipe.id)}
                />
              ))
            )}
          </Grid>
          <Grid container item xs={12} className={classes.FridgesFooter}>
            <Button disabled className={classes.FridgesFooterButton}>
              prev
            </Button>
            <Button className={classes.FridgesFooterButton}>next</Button>
            <Button
              component={Link}
              to={ADD_RECIPE.path}
              className={classes.FridgesFooterButton}
            >
              {ADD_RECIPE.name}
            </Button>
            <Button className={classes.FridgesFooterButton}>something</Button>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default RecipesPage;
