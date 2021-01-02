export const checkValidation = (state) => {
  let touchedInputs = 0;
  const inputs = Object.keys(state.touched);
  inputs.forEach((i) => (state.touched[i] === true ? touchedInputs++ : null));
  return (
    Object.keys(state.errors).length === 0 && inputs.length === touchedInputs
  );
};

const typeToFormErrors = (err) => {
  const errors = {};
  err.inner.forEach((item) => {
    if (!errors[item.path]) {
      errors[item.path] = item.message;
    }
  });
  return errors;
};

export const validateForm = (schema, values) =>
  new Promise((resolve) => {
    schema.validate(values, { abortEarly: false }).then(
      () => {
        resolve({});
      },
      (err) => {
        resolve(typeToFormErrors(err));
      }
    );
  });

export const validateSingleTextField = async (schema, field, value) => {
  const err = await schema
    .validateAt(field, { [field]: value })
    .then(() => "")
    .catch((err) => err?.message);

  return err;
};

export const validateSingleQuantityField = async (schema, value) => {
  const err = await schema
    .validateAt("quantities[0]", { quantities: [value] })
    .then(() => "")
    .catch((err) => err?.message);

  return err;
};
