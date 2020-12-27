import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { combineReducers, compose, createStore } from "redux";
import { signIn } from "./store/reducers/signIn";
import { signUp } from "./store/reducers/signUp";
import { fridges } from "./store/reducers/fridges";
import { recipes } from "./store/reducers/recipes";
import { ingredients } from "./store/reducers/ingredients";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./theme/theme";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true,
        traceLimit: 25,
      })
    : null || compose;

const rootReducer = combineReducers({
  signIn,
  signUp,
  fridges,
  recipes,
  ingredients,
});

const store = createStore(rootReducer, composeEnhancers());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
