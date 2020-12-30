import React from "react";
import { Button, Grid } from "@material-ui/core";
import useStyles from "./IngredientsFormStyles";

const FormSubmitButtons = ({ action, formType, history }) => {
  const classes = useStyles();
  return (
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
  );
};

export default FormSubmitButtons;
