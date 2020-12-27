import React, { Fragment } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import { ADD_FRIDGE } from "../../../SSOT/navPaths";
import { toast } from "react-toastify";
import {
  fridgeDeletedError,
  fridgeDeletedSuccess,
} from "../../../SSOT/toastMessages";
import { useStyles } from "./FridgesPageStyles";
import { useDispatch, useSelector } from "react-redux";
import FridgeListItem from "./FridgeListItem";
import { Link } from "react-router-dom";
import { setUserFridges } from "../../../../store/actions/fridges";
import LoadingIndicator from "../../Reusable/LoadingIndicator";
import { loadingFridgesMessage } from "../../../SSOT/loadingIndicatorMessages";

const FridgesPage = () => {
  const { fridgesList, fridgesListLoading } = useSelector(
    (state) => state.fridges
  );
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleDeleteRecipe = (id) => () => {
    axios
      .delete(`https://localhost:44356/api/Fridges/deleteFridge/${id}`)
      .then((response) => console.log(response))
      .then(() =>
        dispatch(setUserFridges(fridgesList.filter((f) => f.id !== id)))
      )
      .then(() => toast.success(fridgeDeletedSuccess))
      .catch((err) => toast.error(fridgeDeletedError));
  };
  return (
    <Grid
      container
      item
      xs={12}
      className={classes.MainGrid}
      justify="space-between"
    >
      <Grid container item xs={12} className={classes.FridgesBox}>
        <Paper elevation={3} className={classes.GridPaper}>
          <Grid container item xs={12} className={classes.FridgesBoxList}>
            {fridgesListLoading ? (
              <LoadingIndicator displayText={loadingFridgesMessage} />
            ) : (
              fridgesList?.map((fridge) => (
                <FridgeListItem
                  key={fridge.id}
                  fridge={fridge}
                  handleDeleteRecipe={handleDeleteRecipe(fridge.id)}
                />
              ))
            )}
          </Grid>
          <Grid container item xs={12} className={classes.FridgesFooter}>
            <Button disabled className={classes.FridgesFooterButton}>
              prev
            </Button>
            <Button className={classes.FridgesFooterButton}>next</Button>
            <Button
              component={Link}
              to={ADD_FRIDGE.path}
              className={classes.FridgesFooterButton}
            >
              {ADD_FRIDGE.name}
            </Button>
            <Button className={classes.FridgesFooterButton}>something</Button>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default FridgesPage;
