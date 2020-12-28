import React from "react";
import { Grid } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./SignInPageStyles";
import axios from "axios";
import {
  handleUserSigningInError,
  setUserSigningIn,
  signIn,
} from "../../../../store/actions/signIn";
import { HOME } from "../../../SSOT/navPaths";
import { toast } from "react-toastify";
import { signInError, signInSuccess } from "../../../SSOT/toastMessages";
import setAuthorizationToken from "../../../../config/tokenHelpers";
import SignInFormFields from "./SignInFormFields";
import SignInUpForm from "../../shared/SigningInUp/SignInUpForm";
import { checkValidation } from "../../../../Validations/validations";
import { signInSchema } from "../../../../Validations/SignInValidation";
import {
  handleSetValue,
  handleOnBlur,
  handleSubmitPartial,
} from "../../Reusable/textInputHandlers";

const SignInPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { userSigningIn, isAuthenticated } = useSelector(
    (state) => state.signIn
  );

  const initialState = {
    values: {
      eMail: "",
      password: "",
    },
    touched: {
      eMail: false,
      password: false,
    },
    errors: {},
  };

  const [inputState, setInputState] = React.useState(initialState);

  const handleLogin = async (e) => {
    e.preventDefault();
    handleSubmitPartial(signInSchema, inputState, setInputState);
    if (checkValidation(inputState)) {
      const { eMail, password } = inputState.values;
      dispatch(setUserSigningIn());
      axios
        .post("https://localhost:44356/api/Token", {
          email: eMail,
          password: password,
        })
        .then((response) => response.data)
        .then((data) => {
          if (data) {
            window.localStorage.setItem("authToken", data.accessToken);
            setAuthorizationToken(data.accessToken);
            dispatch(signIn(data));
          }
        })
        .then(() => toast.success(signInSuccess))
        .catch((err) => {
          dispatch(handleUserSigningInError());
          toast.error(signInError);
        });
    }
  };

  return (
    <Grid container item xs={12} justify="center" alignItems="center">
      <SignInUpForm
        handleForm={handleLogin}
        isLoading={userSigningIn}
        submitText="Sign in"
      >
        <SignInFormFields
          inputState={inputState}
          isLoading={userSigningIn}
          handleSetValue={handleSetValue(
            inputState,
            setInputState,
            signInSchema
          )}
          handleOnBlur={handleOnBlur(inputState, setInputState, signInSchema)}
        />
      </SignInUpForm>
      {isAuthenticated ? <Redirect to={HOME.path} exact /> : null}
    </Grid>
  );
};

export default SignInPage;
