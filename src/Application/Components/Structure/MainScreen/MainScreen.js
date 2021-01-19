import React, { Fragment } from "react";
import { Grid } from "@material-ui/core";
import { Route } from "react-router-dom";
import useStyles from "./MainScreenStyles";
import {
  ADD_FRIDGE,
  ADD_PRODUCTS,
  ADD_RECIPE,
  EDIT_FRIDGE,
  EDIT_RECIPE,
  FRIDGES,
  HOME,
  LOGIN,
  RECIPES,
  REGISTER,
  USE_RECIPE,
} from "../../../SSOT/navPaths";
import SignInPage from "../../Pages/SignIn/SignInPage";
import SignUpPage from "../../Pages/SignUp/SignUpPage";
import HomePage from "../../Pages/HomePage/HomePage";
import FridgesPage from "../../Pages/Fridges/FridgesPage";
import AddFridgePage from "../../Pages/Fridges/AddFridge/AddFridgePage";
import AddProductsPage from "../../Pages/Fridges/AddProducts/AddProductsPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { loadUserFridges } from "../../Pages/Fridges/helpers/loadUserFridges";
import { loadUserRecipes } from "../../Pages/Recipes/helpers/loadUserRecipes";
import RecipesPage from "../../Pages/Recipes/RecipesPage";
import AddRecipePage from "../../Pages/Recipes/AddRecipe/AddRecipePage";
import EditRecipePage from "../../Pages/Recipes/EditRecipe/EditRecipePage";
import EditFridgePage from "../../Pages/Fridges/EditFridge/EditFridgePage";
import UseRecipePage from "../../Pages/Recipes/UseRecipe/UseRecipePage";

const MainScreen = () => {
  const isAuthenticated = useSelector((state) => state.signIn.isAuthenticated);
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <Grid container item xs={12} className={classes.MainScreen}>
      <Route exact path={HOME.path} component={HomePage} />
      {isAuthenticated ? (
        <Fragment>
          <Route
            exact
            path={FRIDGES.path}
            render={() => {
              loadUserFridges(dispatch);
              return <FridgesPage />;
            }}
          />
          <Route exact path={ADD_FRIDGE.path} component={AddFridgePage} />
          <Route exact path={EDIT_FRIDGE.path} component={EditFridgePage} />
          <Route exact path={ADD_PRODUCTS.path} component={AddProductsPage} />

          <Route
            exact
            path={RECIPES.path}
            render={() => {
              loadUserFridges(dispatch);
              loadUserRecipes(dispatch);
              return <RecipesPage />;
            }}
          />
          <Route exact path={ADD_RECIPE.path} component={AddRecipePage} />
          <Route exact path={EDIT_RECIPE.path} component={EditRecipePage} />
          <Route exact path={USE_RECIPE.path} component={UseRecipePage} />
        </Fragment>
      ) : null}
      <Route exact path={LOGIN.path} component={SignInPage} />
      <Route exact path={REGISTER.path} component={SignUpPage} />
      <ToastContainer style={{ marginTop: "70px" }} />
    </Grid>
  );
};

export default MainScreen;
