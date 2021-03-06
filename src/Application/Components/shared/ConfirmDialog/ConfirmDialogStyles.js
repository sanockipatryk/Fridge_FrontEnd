import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  DialogActionsMargin: { margin: "0 15px" },
  CancelButton: {
    marginRight: "5px",
    color: "#fff",
    backgroundColor: "#EC5766",
    "&:hover": {
      backgroundColor: "#EB4758",
    },
  },
  CancelButtonNoMargin: {
    marginRight: "0",
  },
}));

export default useStyles;
