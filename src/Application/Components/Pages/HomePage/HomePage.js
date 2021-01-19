import React from "react";
import { Grid } from "@material-ui/core";
import axios from "axios";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { FRIDGES, LOGIN } from "../../../SSOT/navPaths";

const HomePage = () => {
  const isAuthenticated = useSelector((state) => state.signIn.isAuthenticated);
  return (
    <Grid container item xs={12}>
      {isAuthenticated ? (
        <Redirect to={FRIDGES.path} />
      ) : (
        <Redirect to={LOGIN.path} />
      )}
    </Grid>
  );
};

export default HomePage;
