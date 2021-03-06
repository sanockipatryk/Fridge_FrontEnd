import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  FormPaper: {
    margin: "40px 0",
    width: "100%",
    padding: "25px",
  },
  Form: {
    width: "80%",
  },
  IngredientRow: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  RecipeNameInput: {
    flexBasis: "79%",
  },
  RecipeCookingTimeInput: {
    flexBasis: "20%",
  },
  FormControlWide: {
    paddingBottom: "20px",
    flexBasis: "36.5%",
  },
  FormControlSlim: {
    paddingBottom: "20px",
    flexBasis: "25%",
  },
  RemoveIngredientButton: {
    display: "block",
    width: "30px",
    height: "30px",
    lineHeight: "30px",
    textAlign: "center",
    fontSize: "30px",
    padding: "none",
    minWidth: "30px",
    position: "absolute",
    transform: "translate(-40px, 50%)",
    backgroundColor: "#EC5766",
    "&:hover": {
      backgroundColor: "#EB4758",
    },
  },
  RemoveIngredientIcon: {
    width: "30px",
    height: "30px",
    transform: "translate(-50%, -20%)",
    color: "#fff",
  },
  NextIngredientButton: {
    marginBottom: "20px",
  },
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
  PaginationButtons: {
    marginTop: "-20px",
    marginBottom: "20px",
  },
  PaginationButton: {
    color: "black !important",
    backgroundColor: "white !important",
  },
  PaginationButtonMove: {
    padding: "0 ",
  },
  PaginationButtonHidden: {
    opacity: "0",
  },
}));

export default useStyles;
