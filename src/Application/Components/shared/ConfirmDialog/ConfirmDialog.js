import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useStyles from "./ConfirmDialogStyles";

const ConfirmDialog = ({ open, handleClose, handleDelete, content }) => {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{content.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleClose()}
            variant="contained"
            className={`${classes.CancelButton} ${classes.CancelButtonNoMargin}`}
          >
            {content.no}
          </Button>
          <Button
            onClick={handleDelete}
            color="secondary"
            variant="contained"
            autoFocus
          >
            {content.yes}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmDialog;
