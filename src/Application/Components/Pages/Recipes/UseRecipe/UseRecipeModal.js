import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { USE_RECIPE } from "../../../../SSOT/navPaths";
import useStyles from "../../../shared/ConfirmDialog/ConfirmDialogStyles";

const UseRecipeModal = ({
  open,
  handleClose,
  content,
  recipe,
  fridgesList,
}) => {
  const classes = useStyles();
  const [chosenFridge, setChosenFridge] = React.useState(fridgesList[0]?.id);

  useEffect(() => {
    setChosenFridge(fridgesList[0]?.id);
  }, [fridgesList]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="use-recipe-title"
        aria-describedby="use-recipe-description"
        fullWidth
      >
        <DialogTitle id="use-recipe-title">{content.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="use-recipe-description">
            {content.message}
          </DialogContentText>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="Fridge-select">Fridge</InputLabel>
            <Select
              fullWidth
              labelId="Fridge-select"
              value={chosenFridge}
              onChange={(e) => setChosenFridge(e?.target.value)}
              label="Fridge"
              inputProps={{ MenuProps: { disableScrollLock: true } }}
            >
              {fridgesList?.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions className={classes.DialogActionsMargin}>
          <Button
            onClick={() => handleClose()}
            variant="contained"
            className={`${classes.CancelButton} ${classes.CancelButtonNoMargin}`}
          >
            {content.no}
          </Button>
          <Button
            color="secondary"
            variant="contained"
            component={Link}
            to={{
              pathname: USE_RECIPE.path,
              state: {
                recipe,
                fridge: fridgesList?.find((f) => f.id === chosenFridge),
              },
            }}
          >
            {content.yes}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UseRecipeModal;
