import React from "react";
import { Button, Grid, makeStyles, Paper } from "@material-ui/core";
import CircularProgressForButton from "../../Reusable/CircularProgressForButton";

const useStyles = makeStyles((theme) => ({
  SignInPaper: {
    width: "100%",
    padding: "25px",
  },
}));

const SignInUpForm = ({ children, handleForm, isLoading, submitText }) => {
  const classes = useStyles();
  return (
    <Grid container item xs={2}>
      <Paper elevation={3} className={classes.SignInPaper}>
        <Grid container item xs={12} justify="center">
          <form
            autoComplete="off"
            onSubmit={handleForm}
            style={{ width: "100%" }}
            noValidate
          >
            {children}
            <Grid container item xs={12} justify="flex-end">
              {isLoading ? (
                <CircularProgressForButton />
              ) : (
                <Button color="primary" variant="contained" type="submit">
                  {submitText}
                </Button>
              )}
            </Grid>
          </form>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default SignInUpForm;
