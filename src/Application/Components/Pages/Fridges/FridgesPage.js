import React from "react";
import axios from "axios";
import { Button, Grid, Paper } from "@material-ui/core";
import { ADD_FRIDGE } from "../../../SSOT/navPaths";
import { toast } from "react-toastify";
import {
  fridgeDeletedError,
  fridgeDeletedSuccess,
} from "../../../SSOT/toastMessages";
import { useStyles } from "../../shared/ItemsPage/ItemsPageStyles";
import { useDispatch, useSelector } from "react-redux";
import FridgeListItem from "./FridgeListItem";
import { Link } from "react-router-dom";
import {
  setDeletingFridge,
  setDeletingFridgeDone,
  setUserFridges,
} from "../../../../store/actions/fridges";
import LoadingIndicator from "../../Reusable/LoadingIndicator";
import { loadingFridgesMessage } from "../../../SSOT/loadingIndicatorMessages";

const FridgesPage = () => {
  const { fridgesList, fridgesListLoading, deletingFridge } = useSelector(
    (state) => state.fridges
  );

  const classes = useStyles();
  const dispatch = useDispatch();

  const initialPagination = {
    page: 0,
    itemsPerPage: 5,
  };

  const [pagination, setPagination] = React.useState(initialPagination);
  const { page, itemsPerPage } = pagination;

  const handleDeleteFridge = (id) => () => {
    dispatch(setDeletingFridge());
    axios
      .delete(`https://localhost:44356/api/Fridges/deleteFridge/${id}`)
      .then(() => {
        if (fridgesList?.length % itemsPerPage === 1) {
          setPagination({ ...pagination, page: page - 1 });
        }
      })
      .then(() =>
        dispatch(setUserFridges(fridgesList.filter((f) => f.id !== id)))
      )
      .then(() => dispatch(setDeletingFridgeDone()))
      .then(() => toast.success(fridgeDeletedSuccess))
      .catch((err) => {
        dispatch(setDeletingFridgeDone());
        toast.error(fridgeDeletedError);
      });
  };
  return (
    <Grid
      container
      item
      xs={12}
      className={classes.MainGrid}
      justify="space-between"
    >
      <Grid container item xs={12} className={classes.ItemsBox}>
        <Paper elevation={3} className={classes.GridPaper}>
          <Grid container item xs={12} className={classes.ItemsBoxList}>
            {fridgesListLoading ? (
              <LoadingIndicator displayText={loadingFridgesMessage} />
            ) : (
              fridgesList
                .slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage)
                ?.map((fridge) => (
                  <FridgeListItem
                    key={fridge.id}
                    fridge={fridge}
                    handleDeleteFridge={handleDeleteFridge(fridge.id)}
                    deletingFridge={deletingFridge}
                  />
                ))
            )}
          </Grid>
          {!fridgesListLoading ? (
            <Button
              component={Link}
              to={ADD_FRIDGE.path}
              color="primary"
              variant="contained"
              className={classes.AddButton}
            >
              {ADD_FRIDGE.name}
            </Button>
          ) : null}
          {/* {fridgesList?.length > 0 ? (
            <span
              style={{
                position: "absolute",
                left: "50%",
                bottom: "55px",
                fontSize: "18px",
                transform: "translateX(-50%)",
              }}
            >
              {" "}
              {`${page * itemsPerPage + 1} - ${
                fridgesList?.length < (page + 1) * itemsPerPage
                  ? fridgesList?.length
                  : (page + 1) * itemsPerPage
              } out of ${fridgesList?.length}`}
            </span>
          ) : null} */}
          <Grid container item xs={12} className={classes.BoxFooter}>
            <Button
              disabled={page <= 0}
              onClick={() => setPagination({ ...pagination, page: page - 1 })}
              className={classes.BoxFooterButton}
            >
              prev
            </Button>
            <Button
              disabled
              className={`${classes.BoxFooterButton} ${classes.PageCounter}`}
            >
              {fridgesList?.length > 0
                ? `${page * itemsPerPage + 1} - ${
                    fridgesList?.length < (page + 1) * itemsPerPage
                      ? fridgesList?.length
                      : (page + 1) * itemsPerPage
                  } out of ${fridgesList?.length}`
                : `List empty`}
            </Button>
            <Button
              disabled={
                fridgesList?.length <= page * itemsPerPage + itemsPerPage
              }
              onClick={() => setPagination({ ...pagination, page: page + 1 })}
              className={classes.BoxFooterButton}
            >
              next
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default FridgesPage;
