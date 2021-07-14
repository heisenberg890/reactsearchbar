import React, { Component, useState, useEffect } from "react";
import { render } from "react-dom";
import "./App.css";
import Button from "react-bootstrap/Button";

function SearchBar() {
  const [make, setMake] = useState("Select Make");
  const [type, setType] = useState("Select Type");
  const [year, setYear] = useState("Select Year");
  const [result, setResult] = useState([]);
  const [typeResult, setTypeResult] = useState([]);

  const [finishingResults, setFinishingResults] = useState([]);

  useEffect(() => {
    getMakes();

    fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMake/${make}?format=json`
    )
      .then((response) => response.json())
      .then((data) => setTypeResult(data.Results));
  }, []);

  /************************************* Get the Makes ************************************************** */
  function getMakes() {
    fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json`)
      .then((response) => response.json())
      .then((data) => setResult(data.Results));
  }
  /************************************************************************************************************* */

  //fetch the new API
  function fetchApi() {
    console.log("Fetching API");
    if (type === "Select Type" && year === "Select Year") {
      console.log("Fetching API");
      fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${make}?format=json`
      )
        .then((response) => response.json())
        .then((data) => setFinishingResults(data.Results));
    } else if (year === "Select Year") {
      fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${make}/vehicletype/${type}?format=json`
      )
        .then((response) => response.json())
        .then((data) => setFinishingResults(data.Results));
    } else if (type === "Select Type") {
      fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${make}/modelyear/${year}?format=json`
      )
        .then((response) => response.json())
        .then((data) => setFinishingResults(data.Results));
    } else {
      console.log("Fetching API");
      fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${make}/modelyear/${year}?format=json`
      )
        .then((response) => response.json())
        .then((data) => setFinishingResults(data.Results));
    }
  }

  //read out the items
  const makeItems = result.map((maker) => (
    <option
      onClick={(e) => setTypes(e.target.value)}
      key={maker.Make_ID}
      value={maker.Make_Name.toString()}
    >
      {maker.Make_Name.toString()}
    </option>
  ));

  //read out the results
  const allResults = finishingResults.map((noner) => (
    <li key={noner.Model_ID}>
      {noner.Make_Name.toString()}: {noner.Model_Name.toString()}
    </li>
  ));

  const typeItems = typeResult.map((types) => (
    <option
      key={types.VehicleTypeName}
      value={types.VehicleTypeName.toString()}
    >
      {types.VehicleTypeName.toString()}
    </option>
  ));

  function setTypes(e) {
    console.log("Setting type");

    fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMake/${make}?format=json`
    )
      .then((response) => response.json())
      .then((data) => setTypeResult(data.Results));
  }

  let array = [];
  function setTheYear() {
    for (let i = 1900; i <= 2021; i++) {
      array.push(i);
    }
  }
  setTheYear();
  const yearItems = array.map((item, i) => <option key={i}>{item}</option>);

  const reset = () => {
    setMake("Select Make");
    setType("Select Type");
    setYear("Select Year");
    document.getElementById("makeID").value = "Select Make";
    document.getElementById("typeID").value = "Select Type";
    document.getElementById("yearID").value = "Select Year";

    document.getElementById("results").innerHTML = " ";
  };

  return (
    <div>
      <select id="makeID" onChange={(e) => setMake(e.target.value)}>
        <option>Select Make</option>
        {makeItems}
      </select>
      <select id="typeID" onChange={(e) => setType(e.target.value)}>
        <option>Select Type</option>
        {typeItems}
      </select>
      <select id="yearID" onChange={(e) => setYear(e.target.value)}>
        <option>Select Year</option>
        {yearItems}
      </select>
      <div>
        <Button
          className="button"
          variant="primary"
          size="lg"
          onClick={fetchApi}
        >
          Search
        </Button>
        <Button
          className="button"
          variant="secondary"
          size="lg"
          onClick={reset}
        >
          Clear Selections
        </Button>
      </div>

      <ul id="results">{allResults}</ul>
    </div>
  );
}

export default SearchBar;
