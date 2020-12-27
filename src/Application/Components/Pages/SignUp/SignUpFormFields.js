import React, { Fragment } from "react";
import InputField from "../../Reusable/BasicInputField";

const SignUpFormFields = ({
  values,
  firstName,
  lastName,
  eMail,
  password,
  confirmPassword,
  userSigningUp,
  handleSetValue,
}) => {
  return (
    <Fragment>
      <InputField
        value={values.firstName}
        onChange={handleSetValue}
        name="firstName"
        label="First name"
        disabled={userSigningUp}
      />
      <InputField
        value={values.lastName}
        onChange={handleSetValue}
        name="lastName"
        label="Last name"
        disabled={userSigningUp}
      />
      <InputField
        value={values.eMail}
        onChange={handleSetValue}
        name="eMail"
        label="E-mail address"
        disabled={userSigningUp}
      />
      <InputField
        value={values.password}
        onChange={handleSetValue}
        name="password"
        label="Password"
        type="password"
        disabled={userSigningUp}
      />
      <InputField
        value={values.confirmPassword}
        onChange={handleSetValue}
        name="confirmPassword"
        label="Confirm password"
        type="password"
        disabled={userSigningUp}
      />
    </Fragment>
  );
};

export default SignUpFormFields;
