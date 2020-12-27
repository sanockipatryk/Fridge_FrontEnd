import React from "react";
import { Grid } from "@material-ui/core";
import useStyles from "./SignInPageStyles";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  handleUserSigningInError,
  setUserSigningIn,
  signIn,
} from "../../../../store/actions/signIn";
import { Redirect } from "react-router-dom";
import { HOME } from "../../../SSOT/navPaths";
import { toast } from "react-toastify";
import { signInError, signInSuccess } from "../../../SSOT/toastMessages";
import setAuthorizationToken from "../../../../config/tokenHelpers";
import SignInFormFields from "./SignInFormFields";
import SignInUpForm from "../../shared/SigningInUp/SignInUpForm";

const SignInPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { userSigningIn, isAuthenticated } = useSelector(
    (state) => state.signIn
  );

  const initialValues = {
    eMail: "",
    password: "",
    confirmPassword: "",
  };
  const [values, setValues] = React.useState(initialValues);

  const handleSetValue = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { eMail, password, confirmPassword } = values;
    dispatch(setUserSigningIn());
    axios
      .post("https://localhost:44356/api/Token", {
        email: eMail,
        password: password,
        confirmPassword: confirmPassword,
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
  };

  return (
    <Grid container item xs={12} justify="center" alignItems="center">
      <SignInUpForm
        handleForm={handleLogin}
        isLoading={userSigningIn}
        submitText="Sign in"
      >
        <SignInFormFields
          values={values}
          userSigningIn={userSigningIn}
          handleSetValue={handleSetValue}
        />
      </SignInUpForm>
      {isAuthenticated ? <Redirect to={HOME.path} exact /> : null}
    </Grid>
  );
};

export default SignInPage;
