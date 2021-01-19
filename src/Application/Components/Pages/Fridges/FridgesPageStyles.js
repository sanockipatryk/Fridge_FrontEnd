import { makeStyles } from "@material-ui/core/styles";

export const useFridgeListItemStyles = makeStyles((theme) => ({
  IsOwner: {
    display: "block",
    position: "absolute",
    width: "40px",
    height: "100%",
    top: "0",
    right: "0",
    backgroundColor: "#59c292",
    textAlign: "center",
  },
  InvPending: {
    display: "block",
    position: "absolute",
    width: "40px",
    height: "100%",
    top: "0",
    right: "0",
    backgroundColor: "#FE9920",
    textAlign: "center",
  },
}));
