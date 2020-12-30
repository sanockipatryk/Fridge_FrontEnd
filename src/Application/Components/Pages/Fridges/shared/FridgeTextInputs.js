import React, { Fragment } from "react";
import InputField from "../../../Reusable/BasicInputField";

const FridgeTextInputs = React.memo(
  ({ inputState, handleSetValue }) => {
    const { name, description } = inputState;
    return (
      <Fragment>
        <InputField
          value={name}
          onChange={handleSetValue}
          name="name"
          label="Fridge name"
        />
        <InputField
          value={description}
          onChange={handleSetValue}
          multiline
          rows={4}
          name="description"
          label="Description"
        />
      </Fragment>
    );
  },
  (prevProps, nextProps) => {
    if (
      prevProps.inputState.name !== nextProps.inputState.name ||
      prevProps.inputState.description !== nextProps.inputState.description
    ) {
      return false;
    } else return true;
  }
);
export default FridgeTextInputs;
