import React, { Fragment } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { EDIT_RECIPE } from "../../../SSOT/navPaths";
import ConfirmDialog from "../../shared/ConfirmDialog/ConfirmDialog";
import {
  deleteRecipeContent,
  useRecipeContent,
} from "../../../SSOT/confirmDialogContents";
import { useListItemStyles } from "../../shared/ItemsPage/ItemsPageStyles";
import UseRecipeModal from "./UseRecipe/UseRecipeModal";
import { calculateCookingTime } from "../../shared/IngredientsForm/ingredientsFormFunctions";

const RecipeListItem = ({
  recipe,
  handleDeleteRecipe,
  deletingRecipe,
  fridgesList,
}) => {
  const classes = useListItemStyles();

  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [useRecipeDialogOpen, setUseRecipeDialogOpen] = React.useState(false);

  const handleClickDeleteDialogOpen = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <Fragment>
      <Card className={classes.Card}>
        <CardContent>
          <Typography
            className={`${classes.Title} ${classes.TextRightMargin}`}
            gutterBottom
          >
            <strong>{recipe.name}</strong>
          </Typography>
          <Typography
            className={`${classes.TextBreakWord} ${classes.TextRightMargin}`}
            variant="body2"
            component="p"
          >
            {recipe.description}
          </Typography>
          <Typography
            variant="body2"
            component="p"
            style={{ marginTop: "10px", display: "flex", alignItems: "center" }}
          >
            <AccessTimeIcon style={{ marginRight: "10px" }} />{" "}
            {calculateCookingTime(recipe.cookingTime)}
          </Typography>
        </CardContent>
        <CardActions>
          {/* <Button size="medium" variant="outlined">
            Details
          </Button> */}
          <Button
            size="medium"
            variant="outlined"
            component={Link}
            to={{ pathname: EDIT_RECIPE.path, state: { recipe } }}
          >
            {EDIT_RECIPE.name}
          </Button>
          {/* <Button
            component={Link}
            to={{ pathname: USE_RECIPE.path, state: { recipe } }}
          >
            {USE_RECIPE.name}
          </Button> */}
          <Button
            size="medium"
            variant="contained"
            color="secondary"
            onClick={() => setUseRecipeDialogOpen(true)}
          >
            Use recipe
          </Button>
          <Button
            size="medium"
            onClick={handleClickDeleteDialogOpen}
            className={`${classes.CancelButton} ${classes.ButtonsToRight} `}
          >
            Delete recipe
          </Button>
        </CardActions>
      </Card>
      <UseRecipeModal
        open={useRecipeDialogOpen}
        handleClose={() => setUseRecipeDialogOpen(false)}
        content={useRecipeContent}
        recipe={recipe}
        fridgesList={fridgesList}
      />
      <ConfirmDialog
        open={deleteDialogOpen}
        handleClose={handleDeleteDialogClose}
        handleDelete={handleDeleteRecipe}
        deleting={deletingRecipe}
        deletingMessage="Deleting recipe"
        content={deleteRecipeContent}
      />
    </Fragment>
  );
};

export default RecipeListItem;
