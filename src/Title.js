import logo from "./logo.svg";
import { React, Component } from "react";
import "./App.css";

class Title extends Component {
  render() {
    return (
      <>
        <h2 className="title">Welcome to Find-A-Car</h2>
        <hr />
        <h5 className="subTitle">
          Please Select the Make, Type and Year of the Car
        </h5>
      </>
    );
  }
}

export default Title;
