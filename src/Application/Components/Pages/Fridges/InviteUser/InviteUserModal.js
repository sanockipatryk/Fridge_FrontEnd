import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputField from "../../../Reusable/BasicInputField";
import useStyles from "../../../shared/ConfirmDialog/ConfirmDialogStyles";
import {
  handleSetValue,
  handleOnBlur,
  handleSubmitPartial,
} from "../../../Reusable/textInputHandlers";
import { inviteUserSchema } from "../../../../../Validations/InviteUserValidation";
import { checkValidation } from "../../../../../Validations/validations";
import { toast } from "react-toastify";
import {
  setInvitingUser,
  setInvitingUserDone,
} from "../../../../../store/actions/fridges";
import { useDispatch, useSelector } from "react-redux";
import LoadingIndicator from "../../../Reusable/LoadingIndicator";
import {
  invitingUserError,
  invitingUserSuccess,
} from "../../../../SSOT/toastMessages";

const InviteUserModal = ({ open, handleClose, content, fridgeId }) => {
  const invitingUser = useSelector((state) => state.fridges.invitingUser);

  const classes = useStyles();
  const dispatch = useDispatch();

  const initialInputState = {
    values: {
      eMail: "",
    },
    touched: {
      eMail: false,
    },
    errors: {
      eMail: "",
    },
  };
  const [inputState, setInputState] = React.useState(initialInputState);
  const { values, errors, touched } = inputState;

  const handleInviteUser = async (e) => {
    e.preventDefault();
    const updatedState = await handleSubmitPartial(
      inviteUserSchema,
      inputState,
      setInputState
    );
    if (await checkValidation(updatedState)) {
      dispatch(setInvitingUser());
      axios
        .post("https://localhost:44356/api/FridgeUsers/inviteUserToFridge", {
          fridgeId: parseInt(fridgeId),
          email: values.eMail,
        })
        .then(() => dispatch(setInvitingUserDone()))
        .then(() => toast.success(invitingUserSuccess))
        .then(() => handleClose())
        .catch((err) => {
          dispatch(setInvitingUserDone());
          toast.error(
            `${
              err?.response?.data?.message?.length > 0
                ? err?.response?.data?.message
                : invitingUserError
            }`
          );
        });
    }
  };

  return (
    <div>
      <Dialog
        fullWidth
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="invite-user-title"
        aria-describedby="invite-user-description"
      >
        <DialogTitle id="invite-user-title">{content.title}</DialogTitle>
        <form autoComplete="off" onSubmit={handleInviteUser}>
          <DialogContent>
            <DialogContentText id="invite-user-description">
              {content.message}
            </DialogContentText>

            <InputField
              value={values.name}
              onChange={handleSetValue(
                inputState,
                setInputState,
                inviteUserSchema
              )}
              handleOnBlur={handleOnBlur(
                inputState,
                setInputState,
                inviteUserSchema
              )}
              name="eMail"
              label="E-mail address"
              touched={touched?.eMail}
              error={errors?.eMail}
            />
          </DialogContent>
          {!invitingUser ? (
            <DialogActions className={classes.DialogActionsMargin}>
              <Button
                onClick={() => handleClose()}
                variant="contained"
                className={`${classes.CancelButton} ${classes.CancelButtonNoMargin}`}
              >
                {content.no}
              </Button>
              <Button
                // onClick={handleInviteUser}
                type="submit"
                color="secondary"
                variant="contained"
              >
                {content.yes}
              </Button>
            </DialogActions>
          ) : (
            <LoadingIndicator displayText={"Inviting user"} />
          )}
        </form>
      </Dialog>
    </div>
  );
};

export default InviteUserModal;
