import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import useStyles from "./IngredientsFormStyles";

const IngredientsFormSelect = ({
  id,
  value,
  onChange,
  itemList,
  labelId,
  labelText,
}) => {
  const classes = useStyles();
  return (
    <FormControl variant="outlined" className={classes.FormControlWide}>
      <InputLabel id={labelId}>{labelText}</InputLabel>
      <Select
        labelId={labelId}
        value={value}
        onChange={(e) => onChange(e, id)}
        label={labelText}
        inputProps={{ MenuProps: { disableScrollLock: true } }}
      >
        {itemList.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default IngredientsFormSelect;
