import { Button, Grid, Paper, Typography } from "@material-ui/core";
import axios from "axios";
import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import {
  setSufficientIngredientsLoading,
  setSufficientIngredientsLoadingEnded,
} from "../../../../../store/actions/recipes";
import { useRecipeStyles } from "../RecipesPageStyles";
import useStyles from "../../../shared/ConfirmDialog/ConfirmDialogStyles";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import SufficientIngredientsPanel from "./SufficientIngredientsPanel";
import { calculateCookingTime } from "../../../shared/IngredientsForm/ingredientsFormFunctions";
import {
  copyShoppingListInfo,
  recipeOnUseError,
  recipeOnUseSuccess,
} from "../../../../SSOT/toastMessages";

const UseRecipePage = ({ history }) => {
  const classes = { ...useRecipeStyles(), ...useStyles() };
  const dispatch = useDispatch();

  let location = useLocation();
  const { recipe, fridge } = location?.state;

  const [
    sufficientIngredientsResponse,
    setSufficientIngredientsResponse,
  ] = React.useState({});

  useEffect(() => {
    dispatch(setSufficientIngredientsLoading());
    axios
      .post("https://localhost:44356/api/Recipes/checkEnoughIngredients", {
        recipeId: parseInt(location?.state?.recipe?.id),
        fridgeId: parseInt(location?.state?.fridge?.id),
      })
      .then((response) => setSufficientIngredientsResponse(response?.data))
      .then(() => dispatch(setSufficientIngredientsLoadingEnded()))
      .catch((err) => {
        dispatch(setSufficientIngredientsLoadingEnded());
      });
  }, [dispatch, location?.state]);

  const handleOnUseRecipe = () => {
    axios
      .put("https://localhost:44356/api/Recipes/useRecipe", {
        recipeId: parseInt(recipe?.id),
        fridgeId: parseInt(fridge?.id),
      })
      .then((response) => setSufficientIngredientsResponse(response?.data))
      .then(() => toast.success(recipeOnUseSuccess))
      .catch((err) => {
        toast.error(recipeOnUseError);
      });
  };

  const copyToClipboard = () => {
    var textField = document.createElement("textarea");
    let text = "";
    sufficientIngredientsResponse?.notEnoughIngredients?.forEach(
      (i) => (text += `${i?.ingredient} - ${i?.quantity}(g/ml), `)
    );
    text = text.substr(0, text.length - 2) + ".";
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    toast.info(copyShoppingListInfo);
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
          <Grid
            container
            item
            xs={12}
            className={classes.ItemsBoxList}
            justify="center"
          >
            <Typography align="center" variant="h4" gutterBottom>
              {recipe?.id ? recipe?.name : null}
            </Typography>
            <Typography align="center" variant="subtitle2" gutterBottom>
              using contents of{" "}
            </Typography>
            <Typography align="center" variant="h6" gutterBottom>
              {fridge?.id ? fridge?.name : null}
            </Typography>
            <hr style={{ margin: "20px 50px" }} />
            <Typography
              align="left"
              variant="subtitle2"
              gutterBottom
              style={{
                margin: "auto 100px 20px",
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                wordBreak: "break-word",
              }}
            >
              <AccessTimeIcon style={{ marginRight: "10px" }} />
              <strong>{calculateCookingTime(recipe?.cookingTime)}</strong>
            </Typography>
            <Typography
              align="left"
              variant="subtitle2"
              gutterBottom
              style={{ margin: "auto 100px" }}
            >
              {recipe?.description}
            </Typography>
            {sufficientIngredientsResponse?.enoughIngredients?.length > 0 ? (
              <Fragment>
                <hr style={{ margin: "20px 50px" }} />
                <SufficientIngredientsPanel
                  type="sufficient"
                  sufficientIngredientsResponse={sufficientIngredientsResponse}
                />
              </Fragment>
            ) : null}
            {sufficientIngredientsResponse?.notEnoughIngredients?.length > 0 ? (
              <Fragment>
                <hr style={{ margin: "20px 50px" }} />
                <SufficientIngredientsPanel
                  type="insufficient"
                  sufficientIngredientsResponse={sufficientIngredientsResponse}
                />
              </Fragment>
            ) : null}
          </Grid>
          <Grid container item xs={12} justify="space-between">
            <Button
              onClick={() => history.goBack()}
              variant="contained"
              className={`${classes.CancelButton} ${classes.CancelButtonNoMargin}`}
            >
              Cancel
            </Button>
            {sufficientIngredientsResponse?.notEnoughIngredients?.length <=
            0 ? (
              <Button
                onClick={() => handleOnUseRecipe()}
                color="secondary"
                variant="contained"
              >
                Use recipe
              </Button>
            ) : (
              <Button
                onClick={() => copyToClipboard()}
                color="primary"
                variant="contained"
              >
                Copy shopping list
              </Button>
            )}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default UseRecipePage;
