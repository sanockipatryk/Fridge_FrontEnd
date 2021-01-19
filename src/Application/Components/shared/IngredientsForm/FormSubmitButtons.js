import React, { Fragment } from "react";
import { Button, Grid } from "@material-ui/core";
import useStyles from "./IngredientsFormStyles";
import LoadingIndicator from "../../Reusable/LoadingIndicator";

const FormSubmitButtons = ({
  action,
  formType,
  history,
  formLoading,
  formLoadingText,
}) => {
  const classes = useStyles();
  return (
    <Grid container item xs={12} justify="flex-end">
      {!formLoading ? (
        <Fragment>
          {" "}
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
              : formType === "addProducts"
              ? "Add products"
              : action === "add"
              ? "Add fridge"
              : "Edit fridge"}
          </Button>
        </Fragment>
      ) : (
        <LoadingIndicator displayText={formLoadingText} />
      )}
    </Grid>
  );
};

export default FormSubmitButtons;
