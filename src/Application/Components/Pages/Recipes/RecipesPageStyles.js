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
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundColor: "#FFEACE",
  },
  FridgesBoxHeader: {
    height: "6%",
    textAlign: "center",
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

export const addRecipeStyles = makeStyles((theme) => ({
  AddRecipePaper: {
    margin: "40px 0",
    width: "100%",
    padding: "25px",
  },
  AddRecipeForm: {
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
