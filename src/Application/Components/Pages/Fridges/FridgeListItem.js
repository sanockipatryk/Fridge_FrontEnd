import React, { Fragment } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { useFridgeListItemStyles } from "./FridgesPageStyles";
import ConfirmDialog from "../Recipes/shared/ConfirmDialog";
import { deleteFridgeContent } from "../../../SSOT/confirmDialogContents";

const FridgeListItem = ({ fridge, handleDeleteRecipe }) => {
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
            <strong>{fridge.name}</strong>
          </Typography>
          {/* <Typography className={classes.pos} color="textSecondary">
          {new Date(fridge.dateCreated).toDateString()}
        </Typography> */}
          <Typography variant="body2" component="p">
            {fridge.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Details</Button>
          <Button size="small">Add products</Button>
          <Button size="small">Invite user</Button>
          <Button size="small" onClick={handleClickDialogOpen}>
            Delete fridge
          </Button>
        </CardActions>
        {fridge.isOwner ? (
          <Tooltip title="Owner of the fridge" placement="top">
            <span className={classes.IsOwner} />
          </Tooltip>
        ) : null}
      </Card>
      <ConfirmDialog
        open={dialogOpen}
        handleClose={handleDialogClose}
        handleDelete={handleDeleteRecipe}
        content={deleteFridgeContent}
      />
    </Fragment>
  );
};

export default FridgeListItem;
