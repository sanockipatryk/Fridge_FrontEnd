import React from "react";
import useStyles from "./HeaderStyles";
import { NavLink } from "react-router-dom";

const NavItem = ({ Route = null, onClick = null }) => {
  const classes = useStyles();

  return (
    <NavLink to={Route?.path} className={classes.NavLink} onClick={onClick}>
      {Route?.name}
    </NavLink>
  );
};

export default NavItem;
