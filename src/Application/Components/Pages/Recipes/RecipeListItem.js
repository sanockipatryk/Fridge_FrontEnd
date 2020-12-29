import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import React, { Fragment } from "react";
import { EDIT_RECIPE } from "../../../SSOT/navPaths";
import { useFridgeListItemStyles } from "../Fridges/FridgesPageStyles";
import ConfirmDialog from "../../shared/ConfirmDialog/ConfirmDialog";
import { deleteRecipeContent } from "../../../SSOT/confirmDialogContents";

const RecipeListItem = ({ recipe, handleDeleteRecipe }) => {
  const classes = useFridgeListItemStyles();

  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleClickDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Fragment>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} gutterBottom>
            <strong>{recipe.name}</strong>
          </Typography>
          <Typography variant="body2" component="p">
            {recipe.description}
          </Typography>
          <Typography variant="body2" component="p">
            Cooking time: {recipe.cookingTime}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Details</Button>
          <Button
            component={Link}
            to={{ pathname: EDIT_RECIPE.path, state: { recipe } }}
            className={classes.FridgesFooterButton}
          >
            {EDIT_RECIPE.name}
          </Button>
          <Button size="small" onClick={handleClickDialogOpen}>
            Delete recipe
          </Button>
        </CardActions>
      </Card>
      <ConfirmDialog
        open={dialogOpen}
        handleClose={handleDialogClose}
        handleDelete={handleDeleteRecipe}
        content={deleteRecipeContent}
      />
    </Fragment>
  );
};

export default RecipeListItem;
