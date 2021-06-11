import {
  createGenerateClassName,
  jssPreset,
  StylesProvider,
} from "@material-ui/styles";
import { create } from "jss";
import jssExtend from "jss-extend";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Router } from "react-router-dom";
import App from "./containers/App/App";
import history from "./history";
import * as serviceWorker from "./serviceWorker";
import "./styles/helpers.css";
import "./styles/styles.css";

const jss = create({
  ...jssPreset(),
  insertionPoint: "jss-insertion-point",
  plugins: [...jssPreset().plugins, jssExtend()],
});

jss.options.createGenerateClassName = createGenerateClassName;

const generateClassName = createGenerateClassName();

ReactDOM.render(
  <StylesProvider injectFirst jss={jss} generateClassName={generateClassName}>
    <Router history={history}>
      <BrowserRouter basename={"/"}>
        <App />
      </BrowserRouter>
    </Router>
  </StylesProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
