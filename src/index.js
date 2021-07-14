import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import SearchBar from "./SearchBar";
import Title from "./Title";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <Title />
    <SearchBar />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
