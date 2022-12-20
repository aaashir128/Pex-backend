import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, Dropdown, Modal, Nav, Tab } from "react-bootstrap";

import axios from "axios";
import { baseURL, createTradeAPI, tradeAPI } from "../../../Strings/Strings";
import PageTitle from "../../layouts/PageTitle";
import { themePrimary } from "../../../css/color";
// import { json } from "stream/consumers";

//cdn.datatables.net/1.13.1/js/jquery.dataTables.min.js

const sort = 10;
let perArr = [];
const svg1 = (
  <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <rect x="0" y="0" width="24" height="24"></rect>
      <circle fill="#000000" cx="5" cy="12" r="2"></circle>
      <circle fill="#000000" cx="12" cy="12" r="2"></circle>
      <circle fill="#000000" cx="19" cy="12" r="2"></circle>
    </g>
  </svg>
);

const tabData = [
  {
    name: "STOP LOSS",
    icon: "",
    content:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove.",
  },
  {
    name: "TAKE PROFIT",
    icon: "",
    content:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove.",
  },
];
function Market(props) {
  const [coinData, setCoinData] = useState([]);
  const [perCoinData, setPerCoinData] = useState([]);
  const [change, setChange] = useState("24h");
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  const [profitEnd, setProfitEnd] = useState(0);
  const [lossEnd, setLossEnd] = useState(0);
  const [modalCentered, setModalCentered] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [isUnits, setIsUnits] = useState(false);
  const [buyAmount, setBuyAmount] = useState({ units: 1, amount: 1000 });
  const [slAmount, setSlAmount] = useState(0);
  const [tpAmount, setTpAmount] = useState(0);
  let usr = localStorage.getItem("user");
  usr = JSON.parse(usr);
  // console.log("user", usr);

  const activePag = useRef(0);
  const chageData = (frist, sec) => {
    for (var i = 0; i < coinData?.length; ++i) {
      if (i >= frist && i < sec) {
        coinData[i]?.classList?.remove("d-none");
      } else {
        coinData[i]?.classList?.add("d-none");
      }
    }
  };

  activePag.current === 0 && chageData(0, sort);
  let paggination = Array(Math.ceil(coinData?.length / sort))
    .fill()
    .map((_, i) => i + 1);

  const onClick = (i) => {
    activePag.current = i;
    setStart(activePag.current * sort);
    setEnd((activePag.current + 1) * sort);
    // chageData(activePag.current * sort, (activePag.current + 1) * sort);
    // settest(i);
  };

  const increaseAmount = () => {
    if (isUnits) {
      setBuyAmount({
        ...buyAmount,
        units: (buyAmount.units += 1),
        amount: buyAmount.units * selectedCoin?.data.quote.USD.price,
      });
    } else {
      setBuyAmount({
        ...buyAmount,
        amount: (buyAmount.amount += 1000),
        units: buyAmount.amount / selectedCoin?.data.quote.USD.price,
      });
    }
  };
  const decreaseAmount = () => {
    if (isUnits) {
      if (buyAmount.units > 0) {
        setBuyAmount({
          ...buyAmount,
          units: (buyAmount.units -= 1),
          amount: buyAmount.units * selectedCoin?.data.quote.USD.price,
        });
      }
    } else {
      if (buyAmount.amount >= 1000) {
        setBuyAmount({
          ...buyAmount,
          amount: (buyAmount.amount -= 1000),
          units: buyAmount.amount / selectedCoin?.data.quote.USD.price,
        });
      }
    }
  };

  const changeAmount = (e) => {
    if (isUnits) {
      setBuyAmount({
        ...buyAmount,
        units: Number(e.target.value),
        amount: buyAmount.units * selectedCoin?.data.quote.USD.price,
      });
    } else {
      setBuyAmount({
        ...buyAmount,
        amount: Number(e.target.value),
        units: buyAmount.amount / selectedCoin?.data.quote.USD.price,
      });
    }
  };

  const createTrade = () => {
    if (buyAmount.amount > 0 || buyAmount.units > 0) {
      // const tradeData = {
      //   crypto_name: selectedCoin?.data.slug,
      //   crypto_purchase_price: selectedCoin?.data.quote.USD.price,
      //   investment: buyAmount.amount,
      //   trade_profit_end: profitEnd,
      //   trade_loss_end: lossEnd,
      //   user_id: 1,
      // };
      // axios.post(`${baseURL}${createTradeAPI}`, tradeData).then((res) => {
      //   console.log(res, "res");
      //   if (res?.data?.status) {
      //     props?.history?.push("/portfolio");
      //   }
      // });
    }
  };

  // const getUSerData = () => {
  //   console.log("Get USer Data");
  //   axios
  //     .get("http://localhost:4000/api/marketList")
  //     .then((res) => {
  //       console.log("Data Res", res.data);
  //       // setFilterCoins(res.data.watchList);
  //     })
  //     .catch((err) => {
  //       console.log("Err", err);
  //     });
  // };

  useEffect(() => {
    const id = setInterval(() => {
      let aa = localStorage.getItem("perData");
      aa = aa && JSON.parse(aa);
      console.log(aa, "aa");
      setPerCoinData(aa);

      fetchData();
    }, 15000);
    return () => clearInterval(id);
  }, []);
  const fetchData = async () => {
    axios
      .get(
        "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=b102e6d8-b50b-4e58-9893-053706a2b065&start=1&limit=25&convert=USD",
        {
          headers: {
            "x-apikey": "b102e6d8-b50b-4e58-9893-053706a2b065",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
        }
      )
      .then((res) => {
        localStorage.setItem("perData", JSON.stringify(res.data.data));
        setCoinData(res.data.data);

        // var filter = res.data.data.filter(function (item) {
        //   return !result.find((i) => item?.name == i?.coin_name);
        // });
        // console.log("Result", result);

        // setCoinData(filter);
        // console.log("Filterrrrrr", filter);

        // }, 500);
      });
  };

  console.log("coinData", coinData);
  const addToWatchList = (name) => {};
  const removeFromWatchList = () => {};

  return (
    <>
      <PageTitle activeMenu="Market" motherMenu="Home" />

      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <div id="job_data" className="dataTables_wrapper">
                <table className="table dataTable display">
                  <thead>
                    <tr role="row">
                      <th
                        className="sorting_asc"
                        tabIndex={0}
                        rowSpan={1}
                        colSpan={1}
                      >
                        Markets
                      </th>
                      <th
                        className="sorting"
                        tabIndex={0}
                        rowSpan={1}
                        colSpan={1}
                      >
                        Price
                      </th>
                      <th
                        className="sorting text-center"
                        tabIndex={0}
                        rowSpan={1}
                        colSpan={1}
                      >
                        <div className="basic-dropdown">
                          <Dropdown>
                            <Dropdown.Toggle
                              style={{ backgroundColor: "transparent" }}
                            >
                              Change {change}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu-right">
                              <a
                                class="dropdown-item cursor-pointer"
                                //   href="#"
                                onClick={() => setChange("1h")}
                              >
                                Change 1h
                              </a>
                              <a
                                class="dropdown-item cursor-pointer"
                                //   href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setChange("24h");
                                }}
                              >
                                Change 24h
                              </a>
                              <a
                                class="dropdown-item cursor-pointer"
                                //   href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setChange("7d");
                                }}
                              >
                                Change 7d
                              </a>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </th>
                      <th
                        className="sorting"
                        tabIndex={0}
                        rowSpan={1}
                        colSpan={1}
                      >
                        Invest
                      </th>
                      {/* <th
                        className="sorting"
                        tabIndex={0}
                        rowSpan={1}
                        colSpan={1}
                      >
                        Status
                      </th> */}
                      <th
                        className="sorting"
                        tabIndex={0}
                        rowSpan={1}
                        colSpan={1}
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...perCoinData].map((data, ind) => {
                      // let coinImg = require(`../../../icons/coins/${data.slug}.png`);
                      let perPrice = perCoinData[ind]?.quote?.USD?.price;
                      return (
                        <tr
                          key={data?.id}
                          role="row"
                          className="even market-trbg"
                        >
                          <td className="sorting_1">
                            <div className="d-flex align-items-center">
                              {/* <img src={coinImg} width="40" height="40" /> */}
                              <div className="mx-2 ">
                                <p className="mb-0">{data.name}</p>
                                <p className="mb-0">{data.symbol}</p>
                              </div>
                            </div>
                          </td>
                          <td
                            style={
                              perPrice - data.quote.USD.price > 0
                                ? { color: "green" }
                                : perPrice - data.quote.USD.price < 0
                                ? { color: "red" }
                                : { color: "black" }
                            }
                          >
                            $ {data.quote.USD.price.toFixed(2)}{" "}
                            {perPrice - data.quote.USD.price > 0 && (
                              <i className="fas fa-arrow-up"></i>
                            )}
                            {perPrice - data.quote.USD.price < 0 && (
                              <i className="fas fa-arrow-down"></i>
                            )}{" "}
                          </td>
                          <td className="text-center">
                            {change === "1h" ? (
                              <p
                                className={`${
                                  data.quote.USD.percent_change_1h < 0
                                    ? "text-danger d-inline"
                                    : "text-success d-inline"
                                }`}
                              >
                                {parseFloat(
                                  data.quote.USD.percent_change_1h
                                ).toFixed(2)}
                                %
                              </p>
                            ) : change === "7d" ? (
                              <p
                                className={`${
                                  data.quote.USD.percent_change_7d < 0
                                    ? "text-danger d-inline"
                                    : "text-success d-inline"
                                }`}
                              >
                                {parseFloat(
                                  data.quote.USD.percent_change_7d
                                ).toFixed(2)}
                                %
                              </p>
                            ) : (
                              <p
                                className={`${
                                  data.quote.USD.percent_change_24h < 0
                                    ? "text-danger d-inline"
                                    : "text-success d-inline"
                                }`}
                              >
                                {parseFloat(
                                  data.quote.USD.percent_change_24h
                                ).toFixed(2)}
                                %
                              </p>
                            )}
                          </td>

                          <td>
                            <button
                              type="button"
                              class="btn"
                              style={{
                                background: "#3eacff",
                                color: "white",
                                padding: "5px 10px",
                                borderRadius: "7px",
                              }}
                              onClick={() => {
                                setModalCentered(true);
                                // setSelectedCoin({ coinImg, data });
                                setSelectedCoin({ data });
                              }}
                            >
                              Buy Now
                            </button>
                          </td>
                          {/* <td>
                            <div className="d-flex align-items-center">
                              <i className="fa fa-circle text-success me-1"></i>
                              Listed
                            </div>
                          </td> */}
                          <td className="">
                            <Dropdown>
                              <Dropdown.Toggle
                                variant="primary"
                                className="light sharp i-false"
                              >
                                {svg1}
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item
                                  // onClick={() =>
                                  //   changeStatus(req?.id, "Approved")
                                  // }
                                  onClick={async () => {
                                    const user = localStorage.getItem("user");
                                    console.log("USer", user);
                                    const parseUSer = JSON.parse(user);
                                    console.log("PArse USer", parseUSer.id);
                                    console.log("Coin", data.name);

                                    await axios
                                      .post(
                                        "http://localhost:4000/api/watchList",
                                        {
                                          user_id: parseUSer.id,
                                          coin_name: data.name,
                                        }
                                      )
                                      .then((res) => {
                                        console.log(
                                          "Successfully Add Coin",
                                          res
                                        );
                                      })
                                      .catch((err) => {
                                        console.log(err);
                                      });
                                  }}
                                >
                                  Add To WatchList
                                </Dropdown.Item>
                                {/* <Dropdown.Item
                                  // onClick={() => {
                                  //   setActiveId(req?.id);
                                  //   setModalCentered(true);
                                  // }}
                                  onClick={removeFromWatchList}
                                >
                                  Remove From WatchList
                                </Dropdown.Item> */}
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="d-sm-flex text-center justify-content-between align-items-center mt-4">
                  <div className="dataTables_info">
                    Showing {activePag.current * sort + 1} to{" "}
                    {coinData?.length > (activePag.current + 1) * sort
                      ? (activePag.current + 1) * sort
                      : coinData?.length}{" "}
                    of {coinData?.length} entries
                  </div>
                  <div
                    className="dataTables_paginate paging_simple_numbers my-2"
                    id="example5_paginate"
                  >
                    <Link
                      className="paginate_button previous disabled"
                      to="/app-profile"
                      onClick={() =>
                        activePag.current > 0 && onClick(activePag.current - 1)
                      }
                    >
                      <i
                        className="fa fa-angle-double-left"
                        aria-hidden="true"
                      ></i>
                    </Link>
                    <span>
                      {paggination.map((number, i) => (
                        <Link
                          key={i}
                          to="/app-profile"
                          className={`paginate_button  ${
                            activePag.current === i ? "current" : ""
                          } `}
                          onClick={() => onClick(i)}
                        >
                          {number}
                        </Link>
                      ))}
                    </span>
                    <Link
                      className="paginate_button next"
                      // to="/app-profile"
                      onClick={() =>
                        activePag.current + 1 < paggination?.length &&
                        onClick(activePag.current + 1)
                      }
                    >
                      <i
                        className="fa fa-angle-double-right"
                        aria-hidden="true"
                      ></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Modal className="fade" show={modalCentered} centered>
            <Modal.Header style={{ backgroundColor: themePrimary }}>
              <Modal.Title className="text-white text-uppercase">
                Buy {selectedCoin?.data.name}
              </Modal.Title>
              <Button
                onClick={() => setModalCentered(false)}
                variant=""
                className="btn-close"
              ></Button>
            </Modal.Header>
            <Modal.Body>
              <div className="d-flex align-items-center">
                <img src={selectedCoin?.coinImg} width="40" height="40" />
                <div className="mx-2">
                  <div className=" d-flex">
                    <p className="mb-0 ">BUY</p>
                    <h5 className="mb-0 px-1">{selectedCoin?.data.symbol}</h5>
                  </div>
                  <div className="d-flex align-items-center">
                    <h3 className="mb-0">
                      $
                      {parseFloat(selectedCoin?.data.quote.USD.price).toFixed(
                        2
                      )}
                    </h3>
                    <small
                      className={
                        selectedCoin?.data.quote.USD.percent_change_24h > 0
                          ? "text-success mb-0 px-1"
                          : "text-danger mb-0 px-1"
                      }
                    >
                      (
                      {parseFloat(
                        selectedCoin?.data.quote.USD.percent_change_24h
                      ).toFixed(2)}
                      % )
                    </small>
                  </div>
                  <small>PRICES BY PRIME CRYPTO EXCHANGE</small>
                </div>
              </div>
              <div
                className="d-flex align-items-center justify-content-between"
                style={{ marginTop: "64px" }}
              >
                <div className="mb-3" style={{ flex: 0.2 }}>
                  <h5 className="d-flex justify-content-center align-items-center">
                    {isUnits ? "UNITS" : "AMOUNT"}
                  </h5>
                </div>

                <div className="input-group mb-3" style={{ flex: 0.5 }}>
                  <Button
                    className="text-primary"
                    variant="dark light"
                    onClick={decreaseAmount}
                  >
                    -
                  </Button>

                  <input
                    value={isUnits ? buyAmount.units : buyAmount.amount}
                    type="number"
                    className="form-control"
                    style={{ fontSize: "20px" }}
                    onChange={(e) => changeAmount(e)}
                  />
                  <Button
                    className="text-primary"
                    variant="dark light"
                    onClick={increaseAmount}
                  >
                    +
                  </Button>
                </div>

                <div style={{ flex: 0.2 }}>
                  <div
                    role="button"
                    className="p-2 mb-3 bg-light rounded d-flex align-items-center justify-content-around"
                    onClick={() => setIsUnits(!isUnits)}
                  >
                    <i class="fas fa-exchange-alt"></i>
                    <h4 className="mb-0">{!isUnits ? "UNITS" : "AMOUNT"}</h4>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center">
                {!isUnits ? (
                  <small>{parseFloat(buyAmount.units).toFixed(2)} UNITS</small>
                ) : (
                  <small>
                    ${parseFloat(buyAmount.amount).toFixed(2)} ESTIMATED MARGIN
                  </small>
                )}
              </div>

              <Col xl={12}>
                <Card>
                  <Card.Body>
                    {/* <!-- Nav tabs --> */}
                    <div className="default-tab">
                      <Tab.Container
                        defaultActiveKey={tabData[0].name.toLowerCase()}
                      >
                        <Nav
                          as="ul"
                          className="nav-tabs justify-content-around"
                        >
                          {tabData.map((data, i) => (
                            <Nav.Item
                              as="li"
                              key={i}
                              className="justify-content-between"
                            >
                              <Nav.Link eventKey={data.name.toLowerCase()}>
                                {/* <i className={`la la-${data.icon} me-2`} /> */}

                                {data.name}
                              </Nav.Link>
                            </Nav.Item>
                          ))}
                        </Nav>
                        <Tab.Content className="pt-4">
                          {tabData.map((data, i) => (
                            <Tab.Pane
                              eventKey={data.name.toLowerCase()}
                              key={i}
                            >
                              <div
                                className="d-flex flex-column align-items-center"
                                style={{ marginTop: "32px" }}
                              >
                                <div className="mb-3" style={{ flex: 0.2 }}>
                                  <h5 className="d-flex justify-content-center align-items-center">
                                    AMOUNT
                                  </h5>
                                </div>

                                <div
                                  className="input-group mb-3"
                                  style={{ flex: 0.5 }}
                                >
                                  <Button
                                    className="text-primary"
                                    variant="dark light"
                                    onClick={() => {
                                      data.name == "STOP LOSS"
                                        ? setLossEnd(lossEnd - 1)
                                        : setProfitEnd(profitEnd - 1);
                                    }}
                                  >
                                    -
                                  </Button>
                                  {data.name == "STOP LOSS" ? (
                                    <input
                                      value={lossEnd}
                                      type="number"
                                      className="form-control"
                                      style={{ fontSize: "20px" }}
                                      onChange={(e) => {
                                        setLossEnd(e.target.value);
                                      }}
                                    />
                                  ) : (
                                    <input
                                      value={profitEnd}
                                      type="number"
                                      className="form-control"
                                      style={{ fontSize: "20px" }}
                                      onChange={(e) => {
                                        setProfitEnd(e.target.value);
                                      }}
                                    />
                                  )}
                                  <Button
                                    className="text-primary"
                                    variant="dark light"
                                    onClick={() => {
                                      data.name == "STOP LOSS"
                                        ? setLossEnd(lossEnd + 1)
                                        : setProfitEnd(profitEnd + 1);
                                    }}
                                  >
                                    +
                                  </Button>
                                </div>
                              </div>
                            </Tab.Pane>
                          ))}
                        </Tab.Content>
                      </Tab.Container>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <div
                className="d-flex justify-content-center"
                style={{ marginTop: "64px" }}
              >
                <h3>YOU ARE BUYING THE UNDERLYING ASSET</h3>
              </div>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
              <Button
                onClick={createTrade}
                // onClick={() => setModalCentered(false)}
                variant="primary"
                style={{ width: "200px" }}
              >
                Open Trade
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default Market;
