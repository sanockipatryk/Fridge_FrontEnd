import React, { Fragment } from "react";
import InputField from "../../Reusable/BasicInputField";

const SignInFormFields = ({ values, userSigningIn, handleSetValue }) => {
  return (
    <Fragment>
      <InputField
        value={values.eMail}
        onChange={handleSetValue}
        name="eMail"
        label="E-mail address"
        disabled={userSigningIn}
      />
      <InputField
        value={values.password}
        onChange={handleSetValue}
        name="password"
        label="Password"
        type="password"
        disabled={userSigningIn}
      />
      <InputField
        value={values.confirmPassword}
        onChange={handleSetValue}
        name="confirmPassword"
        label="Confirm password"
        type="password"
        disabled={userSigningIn}
      />
    </Fragment>
  );
};

export default SignInFormFields;
