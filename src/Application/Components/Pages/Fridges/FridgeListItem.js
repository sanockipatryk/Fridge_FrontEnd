import React, { Fragment } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { useFridgeListItemStyles } from "./FridgesPageStyles";
import ConfirmDialog from "../../shared/ConfirmDialog/ConfirmDialog";
import {
  deleteFridgeContent,
  inviteUserContent,
} from "../../../SSOT/confirmDialogContents";
import InviteUserModal from "./InviteUser/InviteUserModal";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptFridgeInvitation,
  declineFridgeInvitation,
} from "../../../../store/actions/fridges";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { ADD_PRODUCTS, EDIT_FRIDGE } from "../../../SSOT/navPaths";
import { useListItemStyles } from "../../shared/ItemsPage/ItemsPageStyles";

const FridgeListItem = ({ fridge, handleDeleteFridge, deletingFridge }) => {
  const classes = { ...useFridgeListItemStyles(), ...useListItemStyles() };
  const fridgesList = useSelector((state) => state.fridges.fridgesList);
  const dispatch = useDispatch();

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [inviteUserModalOpen, setInviteUserModalOpen] = React.useState(false);

  const handleAcceptInvitation = async () => {
    axios
      .post(
        `https://localhost:44356/api/FridgeUsers/acceptInvitation/${fridge.id}`
      )
      .then(() => {
        const index = fridgesList?.findIndex((f) => f.id === fridge.id);
        const old = fridgesList[index];
        const updated = {
          ...old,
          invitationPending: false,
          invitationAccepted: true,
        };
        const clone = [...fridgesList];
        clone[index] = updated;
        dispatch(acceptFridgeInvitation(clone));
        toast.success("Invitation accepted");
      })
      .catch((err) => console.log(err));
  };

  const handleDeclineInvitation = async () => {
    axios
      .post(
        `https://localhost:44356/api/FridgeUsers/declineInvitation/${fridge.id}`
      )
      .then(() => {
        console.log(fridgesList.filter((f) => f.id !== fridge.id));
        dispatch(
          declineFridgeInvitation(fridgesList.filter((f) => f.id !== fridge.id))
        );
        toast.info("Invitation declined");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Fragment>
      <Card className={classes.Card}>
        <CardContent>
          <Typography
            className={`${classes.Title} ${classes.TextRightMargin}`}
            gutterBottom
          >
            <strong>{fridge.name}</strong>
          </Typography>
          {/* <Typography className={classes.pos} color="textSecondary">
          {new Date(fridge.dateCreated).toDateString()}
        </Typography> */}
          <Typography
            variant="body2"
            component="p"
            className={`${classes.TextBreakWord} ${classes.TextRightMargin}`}
          >
            {fridge.invitationPending ? (
              <Fragment>
                Invited by: <strong>{fridge.invitedBy} </strong>
              </Fragment>
            ) : (
              fridge.description
            )}
          </Typography>
        </CardContent>
        <CardActions>
          {fridge.invitationAccepted ? (
            <Fragment>
              {/* <Button variant="outlined" size="medium">
                Details
              </Button> */}
              <Button
                variant="outlined"
                size="medium"
                component={Link}
                to={{ pathname: EDIT_FRIDGE.path, state: { fridge } }}
              >
                {EDIT_FRIDGE.name}
              </Button>
              <Button
                variant="outlined"
                size="medium"
                component={Link}
                to={{ pathname: ADD_PRODUCTS.path, state: { fridge } }}
              >
                {ADD_PRODUCTS.name}
              </Button>
              {fridge.isOwner ? (
                <Fragment>
                  <Button
                    size="medium"
                    variant="outlined"
                    className={classes.ButtonsToRight}
                    onClick={() => setInviteUserModalOpen(true)}
                  >
                    Invite user
                  </Button>
                  <Button
                    size="medium"
                    variant="contained"
                    className={`${classes.LastRightButton} ${classes.CancelButton}`}
                    onClick={() => setDialogOpen(true)}
                  >
                    Delete fridge
                  </Button>
                </Fragment>
              ) : null}
            </Fragment>
          ) : fridge.invitationPending ? (
            <Fragment>
              <Button
                size="medium"
                variant="contained"
                className={classes.CancelButton}
                onClick={handleDeclineInvitation}
              >
                Decline
              </Button>
              <Button
                color="secondary"
                variant="contained"
                size="medium"
                onClick={handleAcceptInvitation}
              >
                Accept
              </Button>
            </Fragment>
          ) : null}
        </CardActions>
        {fridge.isOwner ? (
          <Tooltip title="Owner of the fridge" placement="top">
            <span className={classes.IsOwner} />
          </Tooltip>
        ) : null}
        {fridge.invitationPending ? (
          <Tooltip title="Invitation pending" placement="top">
            <span className={classes.InvPending} />
          </Tooltip>
        ) : null}
      </Card>
      <InviteUserModal
        open={inviteUserModalOpen}
        handleClose={() => setInviteUserModalOpen(false)}
        content={inviteUserContent}
        fridgeId={fridge.id}
      />
      <ConfirmDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        handleDelete={handleDeleteFridge}
        deleting={deletingFridge}
        deletingMessage="Deleting fridge"
        content={deleteFridgeContent}
      />
    </Fragment>
  );
};

export default FridgeListItem;
