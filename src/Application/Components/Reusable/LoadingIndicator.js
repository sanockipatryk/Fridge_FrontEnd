import React, { Fragment } from "react";
import { CircularProgress, Grid, Typography } from "@material-ui/core";

const LoadingIndicator = ({ displayText }) => {
  return (
    <Fragment>
      <Grid container item xs={12} justify="center">
        <CircularProgress
          style={{
            marginTop: "20px",
          }}
        />
      </Grid>
      <Grid container item xs={12} justify="center">
        <Typography style={{ marginTop: "10px" }}>{displayText}</Typography>
      </Grid>
    </Fragment>
  );
};

export default LoadingIndicator;
