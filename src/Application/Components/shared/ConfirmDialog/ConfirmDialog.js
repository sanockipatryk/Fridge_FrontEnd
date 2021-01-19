import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useStyles from "./ConfirmDialogStyles";
import LoadingIndicator from "../../Reusable/LoadingIndicator";

const ConfirmDialog = ({
  open,
  handleClose,
  handleDelete,
  deleting,
  deletingMessage,
  content,
}) => {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        fullWidth
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

        {!deleting ? (
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
            >
              {content.yes}
            </Button>
          </DialogActions>
        ) : (
          <LoadingIndicator displayText={deletingMessage} />
        )}
      </Dialog>
    </div>
  );
};

export default ConfirmDialog;
