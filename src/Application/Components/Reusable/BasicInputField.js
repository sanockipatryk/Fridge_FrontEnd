import { Grid, TextField } from "@material-ui/core";
import React from "react";
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
  error = false,
  helperText = null,
}) => {
  const classes = useStyles();
  return (
    <Grid container item xs={12} className={additionalClass}>
      <TextField
        className={`${classes.SignInTextField}`}
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
        error={error}
        helperText={helperText}
      />
    </Grid>
  );
};

export default InputField;
