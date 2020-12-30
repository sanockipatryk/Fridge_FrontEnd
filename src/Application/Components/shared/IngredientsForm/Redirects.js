import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { FRIDGES, LOGIN, RECIPES } from "../../../SSOT/navPaths";

const Redirects = ({ isAuthenticated, formType, elementAdded }) => {
  return (
    <Fragment>
      {!isAuthenticated ? <Redirect to={LOGIN.path} exact /> : null}
      {formType === "recipe" ? (
        elementAdded ? (
          <Redirect to={RECIPES.path} exact />
        ) : null
      ) : elementAdded ? (
        <Redirect to={FRIDGES.path} exact />
      ) : null}
    </Fragment>
  );
};

export default Redirects;
