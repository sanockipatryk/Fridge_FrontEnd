import React from "react";
import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./SignUpPageStyles";
import axios from "axios";
import { Redirect } from "react-router-dom";
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

const SignUpPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const userSigningUp = useSelector((state) => state.signUp.userSigningUp);
  const isAuthenticated = useSelector((state) => state.signIn.isAuthenticated);

  const initialValues = {
    firstName: "",
    lastName: "",
    eMail: "",
    password: "",
    confirmPassword: "",
  };
  const [values, setValues] = React.useState(initialValues);
  const [registerSuccess, setRegisterSuccess] = React.useState(false);

  const handleSetValue = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const { eMail, firstName, lastName, password, confirmPassword } = values;
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
  };
  return (
    <Grid container item xs={12} justify="center" alignItems="center">
      <SignInUpForm
        handleForm={handleRegister}
        isLoading={userSigningUp}
        submitText="Sign up"
      >
        <SignUpFormFields values={values} handleSetValue={handleSetValue} />
      </SignInUpForm>
      {registerSuccess ? <Redirect to={LOGIN.path} exact /> : null}
      {isAuthenticated ? <Redirect to={HOME.path} exact /> : null}
    </Grid>
  );
};

export default SignUpPage;
