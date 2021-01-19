import {
  SET_USER_FRIDGES_LOADING,
  SET_USER_FRIDGES,
  HANDLE_USER_FRIDGES_LOADING_ERROR,
  ACCEPT_FRIDGE_INVITATION,
  DECLINE_FRIDGE_INVITATION,
  REQUEST_LOGOUT,
  SET_ADDING_FRIDGE,
  SET_ADDING_FRIDGE_DONE,
  SET_DELETING_FRIDGE,
  SET_DELETING_FRIDGE_DONE,
  SET_INVITING_USER_DONE,
  SET_INVITING_USER,
} from "../constants";

const initialState = {
  fridgesList: [],
  fridgesListLoading: false,
  addingFridge: false,
  deletingFridge: false,
  invitingUser: false,
};

export const fridges = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USER_FRIDGES_LOADING:
      return {
        ...state,
        fridgesListLoading: true,
      };
    case SET_USER_FRIDGES:
      return {
        fridgesList: action.values,
        fridgesListLoading: false,
      };
    case HANDLE_USER_FRIDGES_LOADING_ERROR:
      return {
        ...initialState,
      };
    case SET_ADDING_FRIDGE:
      return {
        ...state,
        addingFridge: true,
      };
    case SET_ADDING_FRIDGE_DONE:
      return {
        ...state,
        addingFridge: false,
      };
    case SET_DELETING_FRIDGE:
      return {
        ...state,
        deletingFridge: true,
      };
    case SET_DELETING_FRIDGE_DONE:
      return {
        ...state,
        deletingFridge: false,
      };
    case SET_INVITING_USER:
      return {
        ...state,
        invitingUser: true,
      };
    case SET_INVITING_USER_DONE:
      return {
        ...state,
        invitingUser: false,
      };
    case ACCEPT_FRIDGE_INVITATION:
      return { ...state, fridgesList: action.values };
    case DECLINE_FRIDGE_INVITATION:
      return { ...state, fridgesList: action.values };
    case REQUEST_LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
