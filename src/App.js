import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";

import Header from "./Application/Components/Structure/Header/Header";
import MainScreen from "./Application/Components/Structure/MainScreen/MainScreen";
import useStyles from "./AppStyles";
import { initalizeAuthorization } from "./config/tokenHelpers";
import { useDispatch } from "react-redux";
import initalizeApplication from "./helpers/initalizeApplication";

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();

  initalizeAuthorization();

  useEffect(() => {
    initalizeApplication(dispatch);
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Grid container className={classes.App}>
        <Header />
        <MainScreen />
      </Grid>
    </BrowserRouter>
  );
}

export default App;
