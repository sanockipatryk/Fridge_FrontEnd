import React, { Fragment } from "react";
import InputField from "../../Reusable/BasicInputField";

const SignUpFormFields = ({
  inputState,
  isLoading,
  handleSetValue,
  handleOnBlur,
}) => {
  const { values, touched, errors } = inputState;
  return (
    <Fragment>
      <InputField
        value={values?.firstName}
        touched={touched?.firstName}
        error={errors?.firstName}
        onChange={handleSetValue}
        handleOnBlur={handleOnBlur}
        name="firstName"
        label="First name"
        disabled={isLoading}
      />
      <InputField
        value={values?.lastName}
        touched={touched?.lastName}
        error={errors?.lastName}
        onChange={handleSetValue}
        handleOnBlur={handleOnBlur}
        name="lastName"
        label="Last name"
        disabled={isLoading}
      />
      <InputField
        value={values?.eMail}
        touched={touched?.eMail}
        error={errors?.eMail}
        onChange={handleSetValue}
        handleOnBlur={handleOnBlur}
        name="eMail"
        label="E-mail address"
        disabled={isLoading}
      />
      <InputField
        value={values?.password}
        touched={touched?.password}
        error={errors?.password}
        onChange={handleSetValue}
        handleOnBlur={handleOnBlur}
        name="password"
        label="Password"
        type="password"
        disabled={isLoading}
      />
      <InputField
        value={values?.confirmPassword}
        touched={touched?.confirmPassword}
        error={errors?.confirmPassword}
        onChange={handleSetValue}
        handleOnBlur={handleOnBlur}
        name="confirmPassword"
        label="Confirm password"
        type="password"
        disabled={isLoading}
      />
    </Fragment>
  );
};

export default SignUpFormFields;
