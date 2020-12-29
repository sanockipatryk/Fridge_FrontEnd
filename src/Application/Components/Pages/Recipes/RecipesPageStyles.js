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
}));
