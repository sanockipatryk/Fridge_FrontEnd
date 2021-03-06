import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  MainGrid: {
    padding: "20px",
    maxWidth: "1280px",
    margin: "0 auto 20px",
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
    position: "relative",
  },

  FridgesBoxList: {
    display: "block",
    padding: "0 10px",
    flexBasis: "94%",
  },
  FridgesFooter: {
    display: "block",
    marginTop: "10px",
    flexBasis: "6%",
    flexShrink: 0,
    maxHeight: "48px",
    backgroundColor: "#FE9920",
    borderBottomLeftRadius: "4px",
    borderBottomRightRadius: "4px",
  },
  FridgesFooterButton: {
    width: "25%",
    height: "100%",
    padding: 0,
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
    flexBasis: "74%",
  },
  RecipeCookingTimeInput: {
    flexBasis: "25%",
  },
}));

export const useRecipeStyles = makeStyles((theme) => ({
  MainGrid: {
    padding: "20px",
    maxWidth: "960px",
    margin: "0 auto 20px",
  },
  ItemsBox: {
    height: "100%",
    boxSizing: "border-box",
    backgroundColor: "white",
  },
  GridPaper: {
    width: "100%",
    minHeight: "100%",
    padding: "20px",
    backgroundColor: "white",
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
}));
