import {
  SET_USER_FRIDGES_LOADING,
  SET_USER_FRIDGES,
  HANDLE_USER_FRIDGES_LOADING_ERROR,
  ACCEPT_FRIDGE_INVITATION,
  DECLINE_FRIDGE_INVITATION,
  SET_ADDING_FRIDGE,
  SET_ADDING_FRIDGE_DONE,
  SET_DELETING_FRIDGE,
  SET_DELETING_FRIDGE_DONE,
  SET_INVITING_USER,
  SET_INVITING_USER_DONE,
} from "../constants";

export const setUserFridgesLoading = () => {
  return {
    type: SET_USER_FRIDGES_LOADING,
  };
};

export const setUserFridges = (data) => {
  return {
    type: SET_USER_FRIDGES,
    values: data,
  };
};

export const handleUserFridgesLoadingError = () => {
  return {
    type: HANDLE_USER_FRIDGES_LOADING_ERROR,
  };
};

export const setAddingFridge = () => {
  return {
    type: SET_ADDING_FRIDGE,
  };
};
export const setAddingFridgeDone = () => {
  return {
    type: SET_ADDING_FRIDGE_DONE,
  };
};

export const setDeletingFridge = () => {
  return {
    type: SET_DELETING_FRIDGE,
  };
};
export const setDeletingFridgeDone = () => {
  return {
    type: SET_DELETING_FRIDGE_DONE,
  };
};

export const setInvitingUser = () => {
  return {
    type: SET_INVITING_USER,
  };
};
export const setInvitingUserDone = () => {
  return {
    type: SET_INVITING_USER_DONE,
  };
};

export const acceptFridgeInvitation = (newFridgeList) => {
  return {
    type: ACCEPT_FRIDGE_INVITATION,
    values: newFridgeList,
  };
};

export const declineFridgeInvitation = (newFridgeList) => {
  return {
    type: DECLINE_FRIDGE_INVITATION,
    values: newFridgeList,
  };
};
