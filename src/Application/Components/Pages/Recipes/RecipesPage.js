import React from "react";
import { Button, Grid, Paper } from "@material-ui/core";
import axios from "axios";
import { toast } from "react-toastify";
import {
  recipeDeletedError,
  recipeDeletedSuccess,
} from "../../../SSOT/toastMessages";
import { useStyles } from "../../shared/ItemsPage/ItemsPageStyles";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ADD_RECIPE } from "../../../SSOT/navPaths";
import RecipeListItem from "./RecipeListItem";
import {
  getUserRecipes,
  setDeletingRecipe,
  setDeletingRecipeDone,
} from "../../../../store/actions/recipes";
import LoadingIndicator from "../../Reusable/LoadingIndicator";
import { loadingRecipesMessage } from "../../../SSOT/loadingIndicatorMessages";

const RecipesPage = () => {
  const { recipesList, recipesListLoading, deletingRecipe } = useSelector(
    (state) => state.recipes
  );
  const { fridgesList, fridgesListLoading } = useSelector(
    (state) => state.fridges
  );

  const classes = useStyles();
  const dispatch = useDispatch();

  const initialPagination = {
    page: 0,
    itemsPerPage: 5,
  };

  const [pagination, setPagination] = React.useState(initialPagination);
  const { page, itemsPerPage } = pagination;

  const handleDeleteRecipe = (id) => () => {
    dispatch(setDeletingRecipe());
    axios
      .delete(`https://localhost:44356/api/Recipes/deleteRecipe/${id}`)
      .then(() => {
        if (recipesList?.length % itemsPerPage === 1) {
          setPagination({ ...pagination, page: page - 1 });
        }
      })
      .then(() =>
        dispatch(getUserRecipes(recipesList.filter((r) => r.id !== id)))
      )
      .then(() => dispatch(setDeletingRecipeDone()))
      .then(() => toast.success(recipeDeletedSuccess))
      .catch((err) => {
        dispatch(setDeletingRecipeDone());
        toast.error(recipeDeletedError);
      });
  };

  return (
    <Grid
      container
      item
      xs={12}
      className={classes.MainGrid}
      justify="space-between"
    >
      <Grid container item xs={12} className={classes.ItemsBox}>
        <Paper elevation={3} className={classes.GridPaper}>
          <Grid container item xs={12} className={classes.ItemsBoxList}>
            {recipesListLoading ? (
              <LoadingIndicator displayText={loadingRecipesMessage} />
            ) : (
              recipesList
                .slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage)
                ?.map((recipe) => (
                  <RecipeListItem
                    key={recipe.id}
                    recipe={recipe}
                    handleDeleteRecipe={handleDeleteRecipe(recipe.id)}
                    deletingRecipe={deletingRecipe}
                    fridgesList={fridgesList}
                  />
                ))
            )}
          </Grid>
          {!fridgesListLoading ? (
            <Button
              component={Link}
              to={ADD_RECIPE.path}
              color="primary"
              variant="contained"
              className={classes.AddButton}
            >
              {ADD_RECIPE.name}
            </Button>
          ) : null}
          <Grid container item xs={12} className={classes.BoxFooter}>
            <Button
              disabled={page <= 0}
              onClick={() => setPagination({ ...pagination, page: page - 1 })}
              className={classes.BoxFooterButton}
            >
              prev
            </Button>
            <Button
              disabled
              className={`${classes.BoxFooterButton} ${classes.PageCounter}`}
            >
              {recipesList?.length > 0
                ? `${page * itemsPerPage + 1} - ${
                    recipesList?.length < (page + 1) * itemsPerPage
                      ? recipesList?.length
                      : (page + 1) * itemsPerPage
                  } out of ${recipesList?.length}`
                : `List empty`}
            </Button>
            <Button
              disabled={
                recipesList?.length <= page * itemsPerPage + itemsPerPage
              }
              onClick={() => setPagination({ ...pagination, page: page + 1 })}
              className={classes.BoxFooterButton}
            >
              next
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default RecipesPage;
