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
    flexBasis: "39%",
  },
  FormControlSlim: {
    paddingBottom: "20px",
    flexBasis: "20%",
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
    marginTop: "-20px",
  },
}));

export default useStyles;
