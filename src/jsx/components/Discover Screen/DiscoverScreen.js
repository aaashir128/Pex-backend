import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, Dropdown, Modal, Nav, Tab } from "react-bootstrap";

import axios from "axios";
import { baseURL, createTradeAPI, tradeAPI } from "../../../Strings/Strings";
import PageTitle from "../../layouts/PageTitle";
import { themePrimary } from "../../../css/color";

import CommoditiesTable from "./CommoditiesTable";
import StocksTable from "./StocksTable";

const tabData = [
  {
    name: "Commodities",
    icon: "",
    content: <CommoditiesTable />,
  },
  {
    name: "Stocks",
    icon: "",
    content: <StocksTable />,
  },
];
function DiscoverScreen(props) {
  const [commodityData, setCommodityData] = useState([]);
  const [perCoinData, setPerCoinData] = useState([]);

  const [modalCentered, setModalCentered] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(null);

  let usr = localStorage.getItem("user");
  usr = JSON.parse(usr);

  // useEffect(() => {
  //   fetchData();
  //   const id = setInterval(() => {
  //     let aa = localStorage.getItem("perData");
  //     aa = aa && JSON.parse(aa);
  //     console.log(aa, "aa");
  //     setPerCoinData(aa);

  //     fetchData();
  //   }, 15000);
  //   return () => clearInterval(id);
  // }, []);
  // const fetchData = async () => {
  //   axios.get("http://localhost:4000/api/admin/watchList").then((data) => {
  //     console.log(data.data?.watchList);
  //     var result = data.data?.watchList;

  //     const config = {
  //       headers: {
  //         "Access-Control-Allow-Origin": "*",
  //       },
  //     };
  //     axios
  //       .get(
  //         "https://commodities-api.com/api/latest?access_key=hzgskub280sxx539r7pwxv98m376j6b2yoio0tk0kr4c9kksx5o2ijp6j7ya&base=USD&symbols=RICE%2CWHEAT%2CSUGAR%2CCORN%2CWTIOIL%2CBRENTOIL%2CSOYBEAN%2CCOFFEE%2CXAU%2CXAG%2CXPD%2CXPT%2CXRH%2CRUBBER%2CETHANOL%2CCPO%2CNG%2CLUMBER%2CCOTTON%2CROBUSTA%2CCOCOA",
  //         {
  //           headers: {
  //             "x-apikey": "b102e6d8-b50b-4e58-9893-053706a2b065",
  //             "Access-Control-Allow-Origin": "*",
  //             "Access-Control-Allow-Methods":
  //               "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         console.log("res commodity", res);
  //         //   localStorage.setItem("perData", JSON.stringify(res.data.data));

  //         //   var filter = res.data.data.filter(function (item) {
  //         //     return !result.find((i) => item?.name == i?.coin_name);
  //         //   });
  //         //   console.log("Result", result);

  //         //   setCoinData(filter);
  //         //   console.log("Filterrrrrr", filter);
  //       });
  //   });
  // };

  return (
    <>
      <PageTitle activeMenu="Discover" motherMenu="Home" />

      <div className="custom-tab-1">
        <Tab.Container defaultActiveKey={tabData[0].name.toLowerCase()}>
          <Nav as="ul" className="nav-tabs">
            {tabData.map((data, i) => (
              <Nav.Item as="li" key={i}>
                <Nav.Link eventKey={data.name.toLowerCase()}>
                  <i className={`la la-${data.icon} me-2`} />
                  {data.name}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
          <Tab.Content className="pt-4">
            {tabData.map((data, i) => (
              <Tab.Pane eventKey={data.name.toLowerCase()} key={i}>
                {data.content}
              </Tab.Pane>
            ))}
          </Tab.Content>
        </Tab.Container>
      </div>
    </>
  );
}

export default DiscoverScreen;
