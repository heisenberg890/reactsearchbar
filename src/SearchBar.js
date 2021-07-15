import React, { useState, useEffect } from "react";
import { Select, Spin, Card, Button, List, Space, Typography } from "antd";
import "antd/dist/antd.css";
import { Slider } from "antd";
import axios from "axios";

const SearchBar = () => {
  const [make, setMake] = useState("ASTON MARTIN");
  const [type, setType] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());

  const [result, setResult] = useState([]);
  const [typeResult, setTypeResult] = useState([]);
  const [finishingResults, setFinishingResults] = useState([]);

  const { Option } = Select;

  const { Text, Title } = Typography;

  let array = [];

  if (array.length === 0) {
    for (let i = 1900; i <= 2021; i++) {
      array.push(i);
    }
  }

  console.log(finishingResults);

  useEffect(() => {
    axios
      .get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json`)
      .then((response) => setResult(response.data.Results))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMake/${make}?format=json`
      )
      .then((response) => setTypeResult(response.data.Results))
      .catch((err) => console.log(err));
  }, [make]);

  const finish = () => {
    let url = `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${make}/modelyear/${year}/vehicletype/${type}?format=json`;
    if (type === null) {
      url = `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${make}/modelyear/${year}?format=json`;
    }
    axios
      .get(url)
      .then((response) => setFinishingResults(response.data.Results))
      .catch((err) => console.log(err));
  };

  return (
    <>
      {result.length > 0 ? (
        <Card
          title="Search For Your Desired Models"
          bordered={false}
          style={{ width: "50%", margin: "auto" }}
        >
          <h6>Select Make *</h6>
          <Select
            defaultValue={result[0].Make_Name}
            style={{ width: "50%", paddingBottom: "10px", margin: "auto" }}
            onChange={(value) => setMake(value)}
          >
            {result.map((maker) => {
              return (
                <Option key={maker.Make_ID} value={maker.Make_Name}>
                  {maker.Make_Name}
                </Option>
              );
            })}
          </Select>
          <br />
          <h6>Select Type</h6>
          <Select
            placeholder="Select a model type"
            style={{ width: "50%", paddingBottom: "10px", margin: "auto" }}
            onChange={(value) => setType(value)}
          >
            {typeResult.map((types) => {
              return (
                <Option key={types.VehicleTypeName}>
                  {types.VehicleTypeName}
                </Option>
              );
            })}
          </Select>
          <br />
          <h6>Select Year *</h6>
          <Slider
            defaultValue={2005}
            min={1990}
            max={2021}
            tooltipVisible
            onChange={(value) => setYear(value)}
          />
          {/* <Select
            defaultValue={year}
            style={{ width: "50%", paddingBottom: "10px", margin: "auto" }}
            onChange={(value) => setYear(value)}
          >
            {array.map((yearList) => {
              return <Option key={yearList}>{yearList}</Option>;
            })}
          </Select> */}
          <br />
          <Button onClick={finish}>Search</Button>
        </Card>
      ) : (
        <Spin />
      )}
      {finishingResults.length !== 0 && (
        <List
          header={<Title level={4}>Results</Title>}
          bordered
          dataSource={finishingResults}
          renderItem={(item) => (
            <List.Item>
              <Space>
                <Text>
                  <b>Make ID:</b> {item.Make_ID} |&nbsp;
                </Text>
                <Text>
                  <b>Make Name:</b> {item.Make_Name} |&nbsp;
                </Text>
                <Text>
                  <b>Model ID:</b> {item.Model_ID} |&nbsp;
                </Text>
                <Text>
                  <b>Model Name:</b> {item.Model_Name}{" "}
                  {item.VehicleTypeId ? <> | </> : ""}
                </Text>

                {item.VehicleTypeId ? (
                  <>
                    <Text>
                      <b>Vehicle Type ID:</b> {item.VehicleTypeId} |&nbsp;
                    </Text>
                    <Text>
                      <b>Vehicle Type:</b> {item.VehicleTypeName}
                    </Text>
                  </>
                ) : (
                  ""
                )}
              </Space>
            </List.Item>
          )}
        />
      )}
    </>
  );
};

export default SearchBar;
