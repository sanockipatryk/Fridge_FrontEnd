import React from "react";
import { Grid, TextField } from "@material-ui/core";
import useStyles from "./Styles";

const InputField = ({
  value,
  onChange,
  name,
  label,
  type = "text",
  multiline = false,
  rows = null,
  fullWidth = true,
  additionalClass = null,
  disabled = false,
  error = null,
  touched,
  handleOnBlur = null,
}) => {
  const classes = useStyles();
  return (
    <Grid container item xs={12} className={additionalClass}>
      <TextField
        className={`${classes.TextField}`}
        name={name}
        label={label}
        type={type}
        variant="outlined"
        value={value}
        onChange={onChange}
        multiline={multiline}
        rows={rows}
        fullWidth={fullWidth}
        disabled={disabled}
        error={error?.length > 0 && touched}
        helperText={error && touched ? error : null}
        onBlur={handleOnBlur}
      />
    </Grid>
  );
};

export default InputField;
