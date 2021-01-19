import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  MainGrid: {
    padding: "20px",
    maxWidth: "1280px",
    margin: "0 auto 20px",
  },
  ItemsBox: {
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
    position: "relative",
  },
  ItemsBoxList: {
    display: "block",
    padding: "0 10px",
    flexBasis: "94%",
    flexGrow: 1,
  },
  AddButton: { margin: "10px auto 0" },
  BoxFooter: {
    display: "block",
    marginTop: "10px",
    flexBasis: "6%",
    flexShrink: 0,
    maxHeight: "48px",
    backgroundColor: "#FE9920",
    borderBottomLeftRadius: "4px",
    borderBottomRightRadius: "4px",
  },
  BoxFooterButton: {
    width: "calc(100%/3)",
    height: "100%",
    padding: 0,
    color: "white",
    fontSize: "18px",
  },
  PageCounter: {
    color: "white !important",
  },
}));

export const useListItemStyles = makeStyles((theme) => ({
  Card: {
    marginTop: "10px",
    minHeight: "120px",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  TextBreakWord: {
    wordBreak: "break-word",
  },
  TextRightMargin: {
    marginRight: "25px",
  },
  Title: {
    fontSize: 14,
  },
  CancelButton: {
    color: "#fff",
    backgroundColor: "#EC5766",
    "&:hover": {
      backgroundColor: "#EB4758",
    },
  },
  ButtonsToRight: {
    marginLeft: "auto !important",
  },
  LastRightButton: {
    marginRight: "40px !important",
  },
}));
