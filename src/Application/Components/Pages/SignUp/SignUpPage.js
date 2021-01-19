import React from "react";
import { Grid } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./SignUpPageStyles";
import axios from "axios";
import { HOME, LOGIN } from "../../../SSOT/navPaths";
import { toast } from "react-toastify";
import { signUpError, signUpSuccess } from "../../../SSOT/toastMessages";
import {
  handleUserSigningUpError,
  handleUserSigningUpSuccess,
  setUserSigningUp,
} from "../../../../store/actions/signUp";
import SignInUpForm from "../../shared/SigningInUp/SignInUpForm";
import SignUpFormFields from "./SignUpFormFields";
import {
  handleOnBlur,
  handleSetValue,
  handleSubmitPartial,
} from "../../Reusable/textInputHandlers";
import { signUpSchema } from "../../../../Validations/SignUpValidation";
import { checkValidation } from "../../../../Validations/validations";

const SignUpPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const userSigningUp = useSelector((state) => state.signUp.userSigningUp);
  const isAuthenticated = useSelector((state) => state.signIn.isAuthenticated);

  const initialState = {
    values: {
      firstName: "",
      lastName: "",
      eMail: "",
      password: "",
      confirmPassword: "",
    },
    touched: {
      firstName: false,
      lastName: false,
      eMail: false,
      password: false,
      confirmPassword: false,
    },
    errors: {},
  };

  const [inputState, setInputState] = React.useState(initialState);
  const [registerSuccess, setRegisterSuccess] = React.useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    const updatedState = await handleSubmitPartial(
      signUpSchema,
      inputState,
      setInputState
    );
    if (checkValidation(updatedState)) {
      const {
        eMail,
        firstName,
        lastName,
        password,
        confirmPassword,
      } = inputState.values;
      dispatch(setUserSigningUp());
      axios
        .post("https://localhost:44356/api/Register", {
          email: eMail,
          firstName: firstName,
          lastName: lastName,
          password: password,
          confirmPassword: confirmPassword,
        })
        .then(() => toast.success(signUpSuccess))
        .then(() => dispatch(handleUserSigningUpSuccess()))
        .then(() => setRegisterSuccess(true))
        .catch((err) => {
          dispatch(handleUserSigningUpError());
          toast.error(signUpError);
        });
    }
  };
  return (
    <Grid container item xs={12} justify="center" alignItems="center">
      <SignInUpForm
        handleForm={handleRegister}
        isLoading={userSigningUp}
        submitText="Sign up"
      >
        <SignUpFormFields
          inputState={inputState}
          isLoading={userSigningUp}
          handleSetValue={handleSetValue(
            inputState,
            setInputState,
            signUpSchema
          )}
          handleOnBlur={handleOnBlur(inputState, setInputState, signUpSchema)}
        />
      </SignInUpForm>
      {registerSuccess ? <Redirect to={LOGIN.path} exact /> : null}
      {isAuthenticated ? <Redirect to={HOME.path} exact /> : null}
    </Grid>
  );
};

export default SignUpPage;
