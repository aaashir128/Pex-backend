import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, Dropdown, Modal, Nav, Tab } from "react-bootstrap";

import axios from "axios";
import { baseURL, createTradeAPI, tradeAPI } from "../../../Strings/Strings";
import PageTitle from "../../layouts/PageTitle";
import { themePrimary } from "../../../css/color";
import cryptoicons from "../../../icons/cryptoIcons/cryptoImg";
import CurrencyFormat from "react-currency-format";
import ERModal from "../modals/ERModal";
import sortArray from "../../../utils/sort";

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
  var timer;
  const token = JSON.parse(localStorage.getItem("token"));

  const user = localStorage.getItem("user");
  // console.log("USer", user);
  const parseUSer = JSON.parse(user);

  const [coinData, setCoinData] = useState([]);
  const [perCoinData, setPerCoinData] = useState([]);
  const [op, setop] = useState(false)
  const [hd, sethd] = useState("")
  const [msg, setmsg] = useState("")
  const pre = useRef([])
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
  const [order, setorder] = useState("ASC")
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
  let paggination = coinData.length>0 ? Array(Math.ceil(coinData?.length / sort)).fill().map((_, i) => i + 1) : [1];

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
        amount: buyAmount.units * selectedCoin?.data?.price,
      });
    } else {
      setBuyAmount({
        ...buyAmount,
        amount: (buyAmount.amount += 1000),
        units: buyAmount.amount / selectedCoin?.data?.price,
      });
    }
  };
  const decreaseAmount = () => {
    if (isUnits) {
      if (buyAmount.units > 0) {
        setBuyAmount({
          ...buyAmount,
          units: (buyAmount.units -= 1),
          amount: buyAmount.units * selectedCoin?.data?.price,
        });
      }
    } else {
      if (buyAmount.amount >= 1000) {
        setBuyAmount({
          ...buyAmount,
          amount: (buyAmount.amount -= 1000),
          units: buyAmount.amount / selectedCoin?.data?.price,
        });
      }
    }
  };

  const changeAmount = (e) => {
    if (isUnits) {
      setBuyAmount({
        ...buyAmount,
        units: Number(e.target.value),
        amount: buyAmount.units * selectedCoin?.data?.price,
      });
    } else {
      setBuyAmount({
        ...buyAmount,
        amount: Number(e.target.value),
        units: buyAmount.amount / selectedCoin?.data?.price,
      });
    }
  };

  const createTrade = () => {
    showModal("Loading...","loading...")
    if (buyAmount.amount > 0 || buyAmount.units > 0) {
      const tradeData = {
        crypto_name: selectedCoin?.data?.name,
        crypto_symbol: selectedCoin?.data?.symbol,
        crypto_purchase_price: selectedCoin?.data?.price,
        investment: buyAmount?.amount,
        take_profit: profitEnd,
        stop_loss: lossEnd,
        user_id: parseUSer?.id,
      };
      console.log(tradeData);
      axios.post(`${baseURL}/api/activetrade`, tradeData, { headers: { "x-auth-token": token } }).then((res) => {
        console.log(res?.data, "res");
        if (res?.data?.status) {
          props?.history?.push("/portfolio");
        }
        // alert("Success")
        showModal("Success!", "Congratulation!! Trade was created successfullt!")
        setModalCentered(false)        
      }).catch(e => {
        console.log(e);
        showModal("Error Occurd!",e.response.data ? e.response.data : "Unknown Error Occured!" )
      });
    }else{
      showModal("Error","Invalid Amount Entered!")
    }
  };

  const showModal = (hd,msg) => {
    setop(true)
    sethd(hd)
    setmsg(msg)
  }

  const sortDATA = (arr,elem,type,order) => {
    setCoinData(sortArray(arr,elem,type,order,"coinData"))
    order == "ASC" ? setorder("DESC") : setorder("ASC")
  }

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


  // const fetchData = async () => {
  //   // axios
  //   //   .get(
  //   //     "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=b102e6d8-b50b-4e58-9893-053706a2b065&start=1&limit=25&convert=USD",
  //   //     {
  //   //       headers: {
  //   //         "x-apikey": "b102e6d8-b50b-4e58-9893-053706a2b065",
  //   //         "Access-Control-Allow-Origin": "*",
  //   //         "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  //   //       },
  //   //     }
  //   //   )
  //   //   .then((res) => {
  //   //     localStorage.setItem("perData", JSON.stringify(res.data.data));
  //   //     setCoinData(res.data.data);


  //   //     // var filter = res.data.data.filter(function (item) {
  //   //     //   return !result.find((i) => item?.name == i?.coin_name);
  //   //     // });
  //   //     // console.log("Result", result);

  //   //     // setCoinData(filter);
  //   //     // console.log("Filterrrrrr", filter);

  //   //     // }, 500);
  //   //   });

  //   try {
  //     let config = {
  //       url: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=7fb31f57-04f3-4cf2-844c-7352c2e67aec&start=1&limit=25&convert=USD",
  //       method: "get",
  //       headers: {
  //         'Access-Control-Allow-Origin': '*',
  //         'Access-Control-Allow-Headers': '*',
  //         'Access-Control-Allow-Credentials': 'true'
  //       }
  //     };
  //     const { data } = await axios.request(config)
  //     localStorage.setItem("perData", JSON.stringify(data?.data));
  //     setCoinData(data?.data)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getDatafromBackend = async () => {
    try {
      const token = await localStorage.getItem("token");
      const { data } = await axios.get(`${baseURL}/coinmarket`, { headers: { "x-auth-token": token } });
      console.log(data);
      // if(localStorage.getItem('perviouse')!=localStorage.getItem('perviouse')){}
      localStorage.setItem('perviouse', localStorage.getItem("cur"))
      localStorage.setItem("cur", JSON.stringify(data))
      pre.current = coinData;
      // setPerCoinData(JSON.parse( await localStorage.getItem('perviouse')))
      const srtElem = JSON.parse(localStorage.getItem("coinData"))
      srtElem ? setCoinData(sortArray(data,srtElem?.elem,srtElem?.type,srtElem?.order)) : setCoinData(data)   
      // setCoinData(data)
      timer = setTimeout(() => {
        getDatafromBackend();
      }, 30000);
      // setInterval(getDatafromBackend(),3000)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDatafromBackend();
    return () => {clearTimeout(timer)};
    // const id = window.setInterval(() => {
    //   let aa = localStorage.getItem("perData");
    //   aa = aa && JSON.parse(aa);
    //   console.log(aa, "aa");
    //   setPerCoinData(aa);

    //   fetchData();
    // }, 15000);
    // return () => clearInterval(id);
  }, []);

  // console.log("coinData", coinData);
  // const addToWatchList = (name) => { };
  // const removeFromWatchList = () => { };

  return (
    <>
      <ERModal op={op} setop={setop} head={hd} msg={msg} />
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
                        onClick={()=>{sortDATA(coinData,"name","string",order)}}
                      >
                        Markets  <i class="fas fa-sort"></i>
                      </th>
                      <th
                        className="sorting"
                        tabIndex={0}
                        rowSpan={1}
                        colSpan={1}
                        onClick={()=>{sortDATA(coinData,"price","num",order)}}
                      >
                        Price  <i class="fas fa-sort"></i>
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
                              id="dropdown-basic"
                              style={{ backgroundColor: "transparent" }}
                            >
                              Change {change}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                              <Dropdown.Item
                                className="dropdown-item cursor-pointer"
                                //   href="#"
                                onClick={() => setChange("1h")}
                              >
                                Change 1h
                              </Dropdown.Item>
                              <Dropdown.Item
                                className="dropdown-item cursor-pointer"
                                //   href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setChange("24h");
                                }}
                              >
                                Change 24h
                              </Dropdown.Item>
                              <Dropdown.Item
                                className="dropdown-item cursor-pointer"
                                //   href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setChange("7d");
                                }}
                              >
                                Change 7d
                              </Dropdown.Item>
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
                    {[...coinData]?.filter(i => cryptoicons[i.symbol])?.slice(start,end)?.map((data, ind) => {
                      // let coinImg = require(`../../../icons/coins/bzzone.png`);
                      let coinImg = cryptoicons[data?.symbol];
                      const perdata = JSON.parse(localStorage?.getItem("perviouse"))
                      // let coinImg = require(`../../../icons/coins/${data.slug}.png`);
                      let perPrice = perdata && perdata[ind]?.price;
                      return (
                        <tr
                          key={data?.id}
                          role="row"
                          className="even market-trbg"
                        >
                          <td className="sorting_1">
                            <div className="d-flex align-items-center">
                              <img
                                src={coinImg}
                                width="40"
                                height="40"
                                alt="icon"
                              />
                              <div className="mx-2 ">
                                <p className="mb-0">{data.name}</p>
                                <p className="mb-0">{data.symbol}</p>
                              </div>
                            </div>
                          </td>
                          <td
                            style={
                              perPrice - data?.price > 0
                                ? { color: "green", display: 'flex' }
                                : perPrice - data?.price < 0
                                  ? { color: "red", display: 'flex' }
                                  : { color: "black", display: 'flex' }
                            }
                          >
                            <CurrencyFormat
                              value={data?.price}
                              displayType={"text"}
                              decimalScale={2}
                              thousandSeparator={true}
                              prefix={"$"}
                              fixedDecimalScale={true}
                              renderText={(value) => <p>{value}</p>}
                            />
                            {/* $ {data?.price.toFixed(2)}{" "} */}
                            {perPrice - data?.price > 0 && (
                              <i style={{ paddingLeft: "5px", paddingTop: '5px' }} className="fas fa-arrow-up"></i>
                            )}
                            {perPrice - data?.price < 0 && (
                              <i style={{ paddingLeft: "5px", paddingTop: '5px' }} className="fas fa-arrow-down"></i>
                            )}{" "}
                          </td>
                          <td className="text-center">
                            {change === "1h" ? (
                              <p
                                className={`${data?.percent_change_1h < 0
                                    ? "text-danger d-inline"
                                    : "text-success d-inline"
                                  }`}
                              >
                                {parseFloat(data?.percent_change_1h).toFixed(2)}
                                %
                              </p>
                            ) : change === "7d" ? (
                              <p
                                className={`${data?.percent_change_7d < 0
                                    ? "text-danger d-inline"
                                    : "text-success d-inline"
                                  }`}
                              >
                                {parseFloat(data?.percent_change_7d).toFixed(2)}
                                %
                              </p>
                            ) : (
                              <p
                                className={`${data?.percent_change_24h < 0
                                    ? "text-danger d-inline"
                                    : "text-success d-inline"
                                  }`}
                              >
                                {parseFloat(data?.percent_change_24h).toFixed(
                                  2
                                )}
                                %
                              </p>
                            )}
                          </td>

                          <td>
                            <button
                              type="button"
                              className="btn"
                              style={{
                                background: "#3eacff",
                                color: "white",
                                padding: "5px 10px",
                                borderRadius: "7px",
                              }}
                              onClick={() => {
                                setModalCentered(true);
                                setSelectedCoin({ coinImg, data });
                              }}
                            >
                              Buy Now
                            </button>
                          </td>

                          <td>
                            <button
                              type="button"
                              className="btn"
                              style={{
                                background: "black",
                                color: "white",
                                padding: "5px 10px",
                                borderRadius: "7px",
                              }}
                              onClick={async () => {
                                console.log(
                                  "PArse USer",
                                  parseUSer.id,
                                  token
                                );
                                console.log("Coin", data.name);

                                await axios
                                  .post(
                                    `${baseURL}/api/userwatchlist`,
                                    {
                                      user_id: parseUSer.id,
                                      coin_name: data.name,
                                    },
                                    { headers: { "x-auth-token": token } }
                                  )
                                  .then((res) => {
                                    console.log(
                                      "Successfully Add Coin",
                                      res
                                    );
                                    showModal("Success!","Added to watch list successfully!")
                                  })
                                  .catch((err) => {
                                    console.log(err);
                                    showModal("Error!","Error occured while adding to watchlist : "+(err.response.data ? err.response.data : "Unknow Error Occured"))
                                  });
                              }}
                            >
                              Add To Watchlist
                            </button>
                          </td>
                          {/* <td className="">
                            <Dropdown>
                              <Dropdown.Toggle
                                variant="primary"
                                className="light sharp i-false"
                              >
                                {svg1}
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item
                                
                                  onClick={async () => {
                                    console.log(
                                      "PArse USer",
                                      parseUSer.id,
                                      token
                                    );
                                    console.log("Coin", data.name);

                                    await axios
                                      .post(
                                        `${baseURL}/api/userwatchlist`,
                                        {
                                          user_id: parseUSer.id,
                                          coin_name: data.name,
                                        },
                                        { headers: { "x-auth-token": token } }
                                      )
                                      .then((res) => {
                                        console.log(
                                          "Successfully Add Coin",
                                          res
                                        );
                                        showModal("Success!","Added to watch list successfully!")
                                      })
                                      .catch((err) => {
                                        console.log(err);
                                        showModal("Error!","Error occured while adding to watchlist : "+(err.response.data ? err.response.data : "Unknow Error Occured"))
                                      });
                                  }}
                                >
                                  Add To WatchList
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td> */}
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
                      // to="/app-profile"
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
                          // to="/app-profile"
                          className={`paginate_button  ${activePag.current === i ? "current" : ""
                            } `}
                          onClick={() => onClick(i)}
                        >
                          {number}
                        </Link>
                      ))}
                    </span>
                    <Link
                      className="paginate_button next"
                      // to="#"
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
                Buy {selectedCoin?.data?.name}
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
                    <h5 className="mb-0 px-1">{selectedCoin?.data?.symbol}</h5>
                  </div>
                  <div className="d-flex align-items-center">
                    <h3 className="mb-0">
                      {/* ${parseFloat(selectedCoin?.data?.price).toFixed(2)} */}
                      <CurrencyFormat
                        value={selectedCoin?.data?.price}
                        displayType={"text"}
                        decimalScale={2}
                        thousandSeparator={true}
                        prefix={"$"}
                        fixedDecimalScale={true}
                        renderText={(value) => <p>{value}</p>}
                      />
                    </h3>
                    <small
                      className={
                        selectedCoin?.data?.percent_change_24h > 0
                          ? "text-success mb-0 px-1"
                          : "text-danger mb-0 px-1"
                      }
                    >
                      (
                      {parseFloat(
                        selectedCoin?.data?.percent_change_24h
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
                    <i className="fas fa-exchange-alt"></i>
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
