import React, { Fragment } from "react";
import { Typography } from "@material-ui/core";

const SufficientIngredientsPanel = ({
  type,
  sufficientIngredientsResponse,
}) => {
  return (
    <Fragment>
      {" "}
      <Typography
        align="center"
        variant="subtitle1"
        gutterBottom
        style={{ color: type === "sufficient" ? "green" : "#EC5766" }}
      >
        {type === "sufficient"
          ? `Sufficient ingredients`
          : `Insufficient ingredients`}
      </Typography>
      <Typography
        align="left"
        variant="subtitle2"
        gutterBottom
        style={{
          margin: "auto 100px 20px",
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          wordBreak: "break-word",
          color: type === "sufficient" ? "green" : "#EC5766",
        }}
      >
        {/* {suficientIngredientsResponse?.enoughIngredients?.length} */}
        {type === "sufficient" ? (
          <div>
            {sufficientIngredientsResponse?.enoughIngredients?.map((i) => (
              <Typography variant="subtitle1" gutterBottom>
                {i?.ingredient} - {i?.quantity}(g/ml)
              </Typography>
            ))}
          </div>
        ) : (
          <div>
            {sufficientIngredientsResponse?.notEnoughIngredients?.map((i) => (
              <Typography variant="subtitle1" gutterBottom>
                {i?.ingredient} - {i?.quantity}(g/ml)
              </Typography>
            ))}
          </div>
        )}
      </Typography>
    </Fragment>
  );
};

export default SufficientIngredientsPanel;
