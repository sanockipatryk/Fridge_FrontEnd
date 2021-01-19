import React from "react";
import { Button, ButtonGroup, Grid } from "@material-ui/core";
import useStyles from "./IngredientsFormStyles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const FormPaginationButtons = ({
  pagination,
  listLength,
  handleChangePage,
}) => {
  const classes = useStyles();
  const { page, itemsPerPage } = pagination;
  const itemsSince = page * itemsPerPage + 1;
  const itemsUntil = page * itemsPerPage + itemsPerPage;
  return (
    <Grid
      container
      item
      xs={12}
      justify="center"
      className={classes.PaginationButtons}
    >
      <Button
        variant="contained"
        disabled={page <= 0}
        onClick={() => handleChangePage("prev")}
        className={` ${page <= 0 ? classes.PaginationButtonHidden : null} ${
          classes.PaginationButton
        } ${classes.PaginationButtonMove}`}
      >
        <ArrowBackIcon />
      </Button>
      <Button disabled className={classes.PaginationButton}>
        {listLength > 0
          ? `${itemsSince} - ${
              itemsUntil < listLength ? itemsUntil : listLength
            } out
        of ${listLength}`
          : null}
      </Button>
      <Button
        variant="contained"
        disabled={itemsUntil >= listLength}
        onClick={() => handleChangePage("next")}
        className={` ${
          itemsUntil >= listLength ? classes.PaginationButtonHidden : null
        } ${classes.PaginationButton} ${classes.PaginationButtonMove}`}
      >
        <ArrowForwardIcon />
      </Button>
    </Grid>
  );
};

export default FormPaginationButtons;
