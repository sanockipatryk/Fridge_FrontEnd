import { validateForm } from "../../../Validations/validations";

export const handleSetValue = (state, setState, schema) => async (event) => {
  const { name, value } = event.target;
  let schemaErrors;
  let newInputState = {
    ...state,
    values: {
      ...state.values,
      [name]: value,
    },
  };
  schemaErrors = await validateForm(schema, newInputState.values);
  newInputState = {
    ...newInputState,
    errors: { ...schemaErrors },
  };
  setState(newInputState);
};

export const handleOnBlur = (state, setState, schema) => async (event) => {
  const { name } = event.target;
  const schemaErrors = await validateForm(schema, state.values);
  const newState = {
    ...state,
    touched: {
      ...state.touched,
      [name]: true,
    },
    errors: {
      ...schemaErrors,
    },
  };
  setState(newState);
};

export const handleSubmitPartial = async (schema, state, setState) => {
  let touchedAll = {};
  Object.keys(state.touched).forEach(
    (t) => (touchedAll = { ...touchedAll, [t]: true })
  );

  const err = await validateForm(schema, state.values);
  setState({
    ...state,
    touched: {
      ...touchedAll,
    },
    errors: {
      ...err,
    },
  });
};
