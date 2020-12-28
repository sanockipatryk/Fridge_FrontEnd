import React, { Fragment } from "react";
import InputField from "../../Reusable/BasicInputField";

const SignInFormFields = ({
  inputState,
  isLoading,
  handleSetValue,
  handleOnBlur,
}) => {
  const { values, touched, errors } = inputState;
  return (
    <Fragment>
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
    </Fragment>
  );
};

export default SignInFormFields;
