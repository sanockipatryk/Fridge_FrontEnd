import {
  validateForm,
  validateSingleTextField,
} from "../../../Validations/validations";

export const handleSetValue = (state, setState, schema) => async (event) => {
  const { name, value } = event.target;
  let newValue = value;
  if (name === "cookingTime") newValue = parseInt(value);
  let err;
  if (state.touched[name] === true)
    err = await validateSingleTextField(schema, name, value);
  else err = null;

  let newInputState = {
    ...state,
    values: {
      ...state.values,
      [name]: newValue,
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
  if (state?.touched[name] === false) {
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
  }
};

export const handleSubmitPartial = async (schema, state, setState) => {
  let touchedAll = {};
  Object.keys(state.touched).forEach(
    (t) => (touchedAll = { ...touchedAll, [t]: true })
  );
  const err = await validateForm(schema, state.values);
  const old = { ...state };
  const updated = { ...old, touched: { ...touchedAll }, errors: { ...err } };
  setState(updated);
  return updated;
};
