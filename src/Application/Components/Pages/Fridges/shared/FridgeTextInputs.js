import React, { Fragment } from "react";
import InputField from "../../../Reusable/BasicInputField";

const FridgeTextInputs = React.memo(
  ({ inputState, handleSetValue, handleOnBlur }) => {
    const { values, touched, errors } = inputState;
    return (
      <Fragment>
        <InputField
          value={values.name}
          onChange={handleSetValue}
          handleOnBlur={handleOnBlur}
          name="name"
          label="Fridge name"
          touched={touched?.name}
          error={errors?.name}
        />
        <InputField
          value={values.description}
          onChange={handleSetValue}
          handleOnBlur={handleOnBlur}
          multiline
          rows={4}
          name="description"
          label="Description"
          touched={touched?.description}
          error={errors?.description}
        />
      </Fragment>
    );
  },
  (prevProps, nextProps) => {
    if (
      JSON.stringify(prevProps.inputState) !==
      JSON.stringify(nextProps.inputState)
    ) {
      return false;
    } else return true;
  }
);
export default FridgeTextInputs;
