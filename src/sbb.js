import { react, useEffect, useState, Component } from "react";
import axios from "axios";
import { render } from "react-dom";

// const make = "HONDA";
// const type = "truck";
// const year = 0;

function App() {
  const [make, setMake] = useState("Volkswagen");
  const [type, setType] = useState("car");
  const [year, setYear] = useState(0);
  const [results, setResults] = useState([]);

  function fetchApi(make, type, year) {
    if (type === "" && year === 0) {
      //no type or year
      console.log(" no type and year");
      fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${make}?format=json`
      )
        .then((response) => response.json())
        .then((data) => setResults(data.Results));
    } else if (year === 0) {
      //no year
      console.log("no year");
      fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${make}/vehicletype/${type}?format=json`
      )
        .then((response) => response.json())
        .then((data) => setResults(data.Results));
    } else if (type === "") {
      //no type
      console.log("no type");

      fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${make}/modelyear/${year}?format=json`
      )
        .then((response) => response.json())
        .then((data) => setResults(data.Results));
    }
  }

  return (
    <div>
      <h1 onClick={fetchApi(make, type, year)}>Hello</h1>
    </div>
  );
}

export default App;
