import {
  validateForm,
  validateSingleTextField,
} from "../../../Validations/validations";

export const handleSetValue = (state, setState, schema) => async (event) => {
  const { name, value } = event.target;
  let err;
  if (state.touched[name] === true)
    err = await validateSingleTextField(schema, name, value);
  else err = null;

  let newInputState = {
    ...state,
    values: {
      ...state.values,
      [name]: value,
    },
    errors: {
      ...state.errors,
      [name]: err,
    },
  };
  setState(newInputState);
};

export const handleOnBlur = (state, setState, schema) => async (event) => {
  const { name, value } = event.target;
  const err = await validateSingleTextField(schema, name, value);

  const newState = {
    ...state,
    touched: {
      ...state.touched,
      [name]: true,
    },
    errors: {
      ...state.errors,
      [name]: err,
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
