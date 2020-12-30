import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  NavBar: {
    backgroundColor: "#FE9920",
    minHeight: "70px",
    padding: "0 15px",
    justifyContent: "flex-end",
    boxSizing: "border-box",
    flexGrow: 0,
  },
  NavLink: {
    margin: "0 15px",
    color: "white",
    fontSize: "18px",
    textDecoration: "none",
    lineHeight: "30px",
    flexBasis: "4%",
    textAlign: "center",
    boxSizing: "border-box",
    borderBottom: "2px solid transparent",
    transition: ".2s",
    "&:hover": {
      borderBottom: "2px solid white",
    },
  },
}));

export default useStyles;
