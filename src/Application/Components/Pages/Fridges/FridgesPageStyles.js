import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  MainGrid: {
    padding: "20px",
    maxWidth: "1280px",
    margin: "0 auto",
  },
  FridgesBox: {
    height: "100%",
    boxSizing: "border-box",
    backgroundColor: "#FFEACE",
  },
  GridPaper: {
    width: "100%",
    height: "100%",
    backgroundColor: "#FFEACE",
    display: "flex",
    flexDirection: "column",
  },
  FridgesBoxHeaderText: {
    alignSelf: "center",
    justifySelf: "center",
  },
  FridgesBoxList: {
    display: "block",
    padding: "0 10px",
    flexBasis: "94%",
  },
  FridgesFooter: {
    display: "block",
    flexBasis: "6%",
    backgroundColor: "#FE9920",
    borderBottomLeftRadius: "4px",
    borderBottomRightRadius: "4px",
  },
  FridgesFooterButton: {
    width: "25%",
    height: "100%",
    color: "white",
    fontSize: "18px",
  },
}));

export const useFridgeListItemStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    marginTop: "10px",
    position: "relative",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  IsOwner: {
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
