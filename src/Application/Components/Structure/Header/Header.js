import React, { Fragment } from "react";
import { Grid, CssBaseline } from "@material-ui/core";
import useStyles from "./HeaderStyles";
import {
  FRIDGES,
  HOME,
  LOGIN,
  LOGOUT,
  RECIPES,
  REGISTER,
} from "../../../SSOT/navPaths";
import NavItem from "./NavItem";
import { useDispatch, useSelector } from "react-redux";
import setAuthorizationToken from "../../../../config/tokenHelpers";
import { requestLogout } from "../../../../store/actions/signIn";
import { toast } from "react-toastify";
import { logoutInfo } from "../../../SSOT/toastMessages";
import { getUserFridges } from "../../../../store/actions/fridges";

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.signIn.isAuthenticated);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setAuthorizationToken();
    dispatch(requestLogout());
    toast.info(logoutInfo);
  };

  return (
    <Grid container item xs={12} className={classes.NavBar} alignItems="center">
      <CssBaseline>
        <NavItem Route={HOME} />
        {!isAuthenticated ? (
          <Fragment>
            <NavItem Route={LOGIN} />
            <NavItem Route={REGISTER} />
          </Fragment>
        ) : (
          <Fragment>
            <NavItem Route={FRIDGES} />
            <NavItem Route={RECIPES} />
            <NavItem
              Route={{ path: "/", name: "Logout" }}
              onClick={handleLogout}
            />
          </Fragment>
        )}
      </CssBaseline>
    </Grid>
  );
};

export default Header;
