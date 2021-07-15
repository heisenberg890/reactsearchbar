import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import SearchBar from "./SearchBar";
import Header from "./Header";
import Footer from "./Footer";

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <SearchBar />
    <Footer />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
