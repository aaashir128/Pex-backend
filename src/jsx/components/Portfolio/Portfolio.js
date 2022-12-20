import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PageTitle from "../../layouts/PageTitle";
import {
  Button,
  Card,
  Col,
  Dropdown,
  Modal,
  Nav,
  Row,
  Tab,
} from "react-bootstrap";
import {
  baseURL,
  createTradeAPI,
  createTradeHistoryAPI,
  tradeAPI,
} from "../../../Strings/Strings";
import { themePrimary } from "../../../css/color";

const sort = 10;
let perArr = [];
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
function Portfolio(props) {
  const [APIData, setAPIData] = useState([]);
  const [perCoinData, setPerCoinData] = useState([]);
  const [coinData, setCoinData] = useState([]);
  const [modalTradeClose, setModalTradeClose] = useState(false);
  const [modalTradeEdit, setModalTradeEdit] = useState(false);
  const [start, setStart] = useState(0);
  const [closeId, setCloseId] = useState(0);
  const [end, setEnd] = useState(10);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [profitEnd, setProfitEnd] = useState(0);
  const [lossEnd, setLossEnd] = useState(0);
  const [sameCoin, setSameCoin] = useState();
  const [isUnits, setIsUnits] = useState(false);
  const [partialTrade, setPartialTrade] = useState(false);
  const [buyAmount, setBuyAmount] = useState({ units: 1, amount: 1000 });
  const [colorCheck, setColorCheck] = useState(null);

  let usr = localStorage.getItem("user");
  usr = JSON.parse(usr);

  const activePag = useRef(0);
  const chageData = (frist, sec) => {
    for (var i = 0; i < coinData.length; ++i) {
      if (i >= frist && i < sec) {
        coinData[i]?.classList?.remove("d-none");
      } else {
        coinData[i]?.classList?.add("d-none");
      }
    }
  };

  // activePag.current === 0 && chageData(0, sort);
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

  // useEffect(() => {
  //   getTrades();
  // }, []);

  // const getTrades = () => {
  //   axios.get(`${baseURL}${tradeAPI}?user_id=1`).then((res) => {
  //     console.log(res, "res");
  //     // setCoinData(res.data.ActiveTradeRequests);
  //     var filterData = res.data.ActiveTradeRequests.filter(
  //       (trade) => trade.status === "Open"
  //     );
  //     setCoinData(filterData);
  //   });
  // };

  const closeTrade = () => {
    let profitLoss = sameCoin
      ? (sameCoin[0] - sameCoin[2]?.crypto_purchase_price).toFixed(2)
      : 0;

    let amount = 0;
    if (partialTrade) {
      amount = buyAmount.amount;
      profitLoss = (buyAmount.amount / sameCoin[2]?.trade) * profitLoss;
    } else {
      amount = sameCoin ? sameCoin[2]?.trade : 0;
    }
    const tradeData = {
      trade_id: closeId,
      status: partialTrade ? "Close" : "Open",
      amount: amount,
      profit: profitLoss > 0 ? profitLoss : 0,
      loss: profitLoss < 0 ? profitLoss : 0,
      closed_price: sameCoin[0],
    };
    axios.post(`${baseURL}${createTradeHistoryAPI}`, tradeData).then((res) => {
      console.log(res, "res");
      if (res?.data?.status) {
        // getTrades();
        setModalTradeClose(false);
      }
    });
  };

  const increaseAmount = () => {
    if (isUnits) {
      setBuyAmount({
        ...buyAmount,
        units: (buyAmount.units += 1),
        amount: buyAmount.units * sameCoin?.data.quote.USD.price,
      });
    } else {
      setBuyAmount({
        ...buyAmount,
        amount: (buyAmount.amount += 1000),
        units: buyAmount.amount / sameCoin?.data.quote.USD.price,
      });
    }
  };
  const decreaseAmount = () => {
    if (isUnits) {
      if (buyAmount.units > 0) {
        setBuyAmount({
          ...buyAmount,
          units: (buyAmount.units -= 1),
          amount: buyAmount.units * sameCoin?.data.quote.USD.price,
        });
      }
    } else {
      if (buyAmount.amount >= 1000) {
        setBuyAmount({
          ...buyAmount,
          amount: (buyAmount.amount -= 1000),
          units: buyAmount.amount / sameCoin?.data.quote.USD.price,
        });
      }
    }
  };

  const changeAmount = (e) => {
    if (isUnits) {
      setBuyAmount({
        ...buyAmount,
        units: Number(e.target.value),
        amount: Number(e.target.value),
      });
    } else {
      setBuyAmount({
        ...buyAmount,
        amount: Number(e.target.value),
        units: Number(e.target.value),
      });
    }
  };

  useEffect(() => {
    fetchData();
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
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    axios
      .get(
        "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=9c9c9f71-a6f2-4584-8067-e45e2615151e&start=1&limit=25&convert=USD",
        {
          headers: {
            "x-apikey": "b102e6d8-b50b-4e58-9893-053706a2b065",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
        }
      )
      .then((res) => {
        let result = res.data.data;
        let newArray = [];
        // perCoin - data.quote.USD.price,
        // setTimeout(() => {
        localStorage.setItem("perData", JSON.stringify(res.data.data));
        setAPIData(res.data.data);
        // }, 500);
      });
  };

  // const filterByReference = (arr1, arr2) => {
  //   let res = [];
  //   res = arr1.filter((el) => {
  //     return arr2.find((element) => {
  //       return element.crypto_name === el.slug;
  //     });
  //   });
  //   return res;
  // };
  // console.log("filterArray", filterByReference(APIData, coinData));

  var cvalue = function calculateProfitOrLoss(name, price) {
    console.log("coinName", name);
    let filter = APIData.filter((item) => item.slug == name);
    // console.log("filterArray", filter[0]?.quote.USD.price);
    // if (filter[0]?.quote.USD.price - price < 0) {
    //   setColorCheck(true);
    // }
    // if (filter[0]?.quote.USD.price - price > 0) {
    //   setColorCheck(false);
    // }

    return (filter[0]?.quote.USD.price - price).toFixed(2);
  };

  const getCoinData = (name, img, data) => {
    console.log("cName", name);
    let filter = APIData.filter((item) => item.slug == name);
    console.log("cName filter", filter);
    setSameCoin([filter[0]?.quote.USD.price, img, data]);
  };

  useEffect(() => {
    // let filter = APIData.filter(
    //   // (data, i) => data.slug == coinData[i]?.crypto_name
    //   (data, i) => data.slug == coinData.filter((d) => d.crypto_name)
    //   // (data, i) => console.log(i)
    // );

    // let res = [];
    // res = APIData.filter((el) => {
    //   return !coinData.find((element) => {
    //     return element.slug === el.crypto_name;
    //   });
    // });
    // return setSameCoin(res);

    // console.log(filterByReference(arr1, arr2));

    // var filter = APIData.filter(function (item) {
    //   return coinData.find((i) => item.slug === i.crypto_name);
    // });

    // let filter = APIData.filter((item) => {
    //   item.slug == coinData.filter((i) => i.crypto_name);
    // });
    // setSameCoin(filter);
    console.log("APIData", APIData);
    console.log("sameCoin", sameCoin);
    console.log("coinData", coinData);
    // setCoinData({...coinData, currentPrice})
  }, [APIData, coinData]);

  useEffect(() => {
    console.log("sameCoin", sameCoin);
    var i = 2;
    console.log("Negative check", Math.sign(i));
  }, [sameCoin]);

  return (
    <>
      <PageTitle activeMenu="Portfolio" motherMenu="Home" />

      {/* <div className="d-flex justify-between"> */}
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
                        Asset
                      </th>
                      <th
                        className="sorting"
                        tabIndex={0}
                        rowSpan={1}
                        colSpan={1}
                      >
                        Amount
                      </th>

                      <th
                        className="sorting"
                        tabIndex={0}
                        rowSpan={1}
                        colSpan={1}
                      >
                        Units
                      </th>
                      <th
                        className="sorting"
                        tabIndex={0}
                        rowSpan={1}
                        colSpan={1}
                      >
                        Open
                      </th>
                      <th
                        className="sorting"
                        tabIndex={0}
                        rowSpan={1}
                        colSpan={1}
                      >
                        SL
                      </th>
                      <th
                        className="sorting"
                        tabIndex={0}
                        rowSpan={1}
                        colSpan={1}
                      >
                        TP
                      </th>
                      <th
                        className="sorting"
                        tabIndex={0}
                        rowSpan={1}
                        colSpan={1}
                      >
                        P/L($)
                      </th>
                      <th
                        className="sorting"
                        tabIndex={0}
                        rowSpan={1}
                        colSpan={1}
                      ></th>
                      <th
                        className="sorting"
                        tabIndex={0}
                        rowSpan={1}
                        colSpan={1}
                      ></th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...coinData].map((data, ind) => {
                      // let coinImg = require(`../../../icons/coins/${data.crypto_name}.png`);
                      //   let perPrice = perCoinData[ind]?.quote?.USD?.price;
                      return (
                        <tr
                          key={data?.id}
                          role="row"
                          className="even market-trbg"
                        >
                          <td className="sorting_1">
                            <div
                              className="d-flex align-items-center"
                              onClick={() =>
                                props.history.push(
                                  `/portfolio/breakdown/${data.crypto_name}`
                                )
                              }
                            >
                              {/* <img src={coinImg} width="40" height="40" /> */}
                              <div className="mx-2 ">
                                <p className="mb-0 inline">
                                  Buy {data.crypto_name}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>${data?.trade}</td>
                          <td>
                            {(data.trade / data.crypto_purchase_price).toFixed(
                              2
                            )}
                          </td>

                          <td>{data.crypto_purchase_price}</td>
                          <td>
                            {!data.trade_loss_end ? (
                              <Button
                                //   className="me-4"
                                variant="outline-light btn-square"
                                onClick={() => {
                                  setModalTradeEdit(true);
                                  setCloseId(data?.id);
                                  // setSelectedCoin({ coinImg, data });
                                  setSelectedCoin({ data });
                                }}
                              >
                                ...
                              </Button>
                            ) : (
                              <Button
                                //   className="me-4"
                                variant="outline-light btn-square"
                                onClick={() => {
                                  setModalTradeEdit(true);
                                  setCloseId(data?.id);
                                  // setSelectedCoin({ coinImg, data });
                                  setSelectedCoin({ data });
                                }}
                              >
                                {data.trade_loss_end}
                              </Button>
                            )}
                          </td>
                          <td>
                            {!data.trade_profit_end ? (
                              <Button
                                //   className="me-4"
                                variant="outline-light btn-square"
                                onClick={() => {
                                  setModalTradeEdit(true);
                                  setCloseId(data?.id);
                                  // setSelectedCoin({ coinImg, data });
                                  setSelectedCoin({ data });
                                }}
                              >
                                ...
                              </Button>
                            ) : (
                              <Button
                                //   className="me-4"
                                variant="outline-light btn-square"
                                onClick={() => {
                                  setModalTradeEdit(true);
                                  setCloseId(data?.id);
                                  // setSelectedCoin({ coinImg, data });
                                  setSelectedCoin({ data });
                                }}
                              >
                                {data.trade_profit_end}
                              </Button>
                            )}
                          </td>

                          <td
                            className={`${
                              Math.sign(
                                cvalue(
                                  data?.crypto_name,
                                  data?.crypto_purchase_price
                                )
                              ) === 1
                                ? "text-success"
                                : "text-danger"
                            }`}

                            // className={`${
                            //   (sameCoin[ind]?.quote?.USD?.price -
                            //     data?.crypto_purchase_price) *
                            //     (data?.trade / data?.crypto_purchase_price) >
                            //   0
                            //     ? "text-success mb-0 "
                            //     : "text-danger mb-0"
                            // }`}
                          >
                            {cvalue(
                              data?.crypto_name,
                              data?.crypto_purchase_price
                            )}
                            {/* {(
                              (sameCoin[ind]?.quote?.USD?.price -
                                data?.crypto_purchase_price) *
                              (data?.trade / data?.crypto_purchase_price)
                            ).toFixed(2)} */}
                          </td>
                          <td>
                            {data?.status === "Open" ? (
                              <Button
                                className="me-2"
                                variant="outline-danger"
                                onClick={() => {
                                  // getCoinData(data?.crypto_name, coinImg, data);
                                  getCoinData(data?.crypto_name, data);
                                  setModalTradeClose(true);
                                  setCloseId(data?.id);
                                  setSelectedCoin([
                                    sameCoin[ind]?.quote?.USD?.price,
                                    // coinImg,
                                    data,
                                    sameCoin[ind]?.quote?.USD
                                      ?.percent_change_24h,
                                  ]);
                                }}
                              >
                                Close
                              </Button>
                            ) : (
                              "Closed"
                            )}
                          </td>
                          <td>
                            <Dropdown className="dropdown ms-auto text-right">
                              <Dropdown.Toggle
                                variant=""
                                className="btn-link i-false"
                                data-toggle="dropdown"
                              >
                                <svg
                                  width="24px"
                                  height="24px"
                                  viewBox="0 0 24 24"
                                  version="1.1"
                                >
                                  <g
                                    stroke="none"
                                    strokeWidth={1}
                                    fill="none"
                                    fillRule="evenodd"
                                  >
                                    <rect x={0} y={0} width={24} height={24} />
                                    <circle
                                      fill="#000000"
                                      cx={5}
                                      cy={12}
                                      r={2}
                                    />
                                    <circle
                                      fill="#000000"
                                      cx={12}
                                      cy={12}
                                      r={2}
                                    />
                                    <circle
                                      fill="#000000"
                                      cx={19}
                                      cy={12}
                                      r={2}
                                    />
                                  </g>
                                </svg>
                              </Dropdown.Toggle>
                              <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                                <Dropdown.Item>Asset</Dropdown.Item>
                                <Dropdown.Item>Close</Dropdown.Item>
                                <Dropdown.Item>Open New Trade</Dropdown.Item>
                                <Dropdown.Item>Write New Post</Dropdown.Item>
                                <Dropdown.Item>View Chart</Dropdown.Item>
                                <Dropdown.Item>Set Price Alert</Dropdown.Item>
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
                        activePag.current + 1 < paggination.length &&
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
        </div>

        <Modal className="fade" show={modalTradeClose} centered>
          <Modal.Header style={{ backgroundColor: themePrimary }}>
            <Modal.Title className="text-white text-uppercase">
              {sameCoin && sameCoin[2]?.crypto_name}
            </Modal.Title>
            <Button
              onClick={() => setModalTradeClose(false)}
              variant=""
              className="btn-close"
            ></Button>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex flex-column">
              <div className="d-flex mb-4">
                <img src={sameCoin && sameCoin[1]} width="40" height="40" />
                <div className="mx-2">
                  <div className=" d-flex">
                    <p className="mb-0 ">BUY </p>
                    <h5 className="mb-0 px-1 text-uppercase">
                      {sameCoin && sameCoin[2]?.crypto_name}
                    </h5>
                  </div>
                  <div className="d-flex align-items-center">
                    <h3 className="mb-0">
                      ${sameCoin && sameCoin[0]?.toFixed(2)}
                    </h3>
                    <small
                      className={`${
                        sameCoin && sameCoin[3] > 0
                          ? "text-success mb-0 px-1"
                          : "text-danger mb-0 px-1"
                      }`}
                    >
                      {sameCoin && sameCoin[3]?.toFixed(2)}%
                    </small>
                  </div>
                </div>
              </div>

              <div>
                <div className="d-flex w-100 justify-content-between">
                  <div className="d-flex w-100 flex-column">
                    <div className="d-flex w-100 justify-content-between">
                      <h4 className="mb-0">AMOUNT</h4>
                      <div>
                        <h3 className="mb-0">
                          ${sameCoin && sameCoin[2]?.trade}
                        </h3>
                        <p className="mb-0 d-flex justify-content-end">
                          {sameCoin &&
                            (
                              sameCoin[2]?.trade /
                              sameCoin[2]?.crypto_purchase_price
                            ).toFixed(2)}{" "}
                          UNITS
                        </p>
                      </div>
                    </div>
                    <div className="d-flex w-100 justify-content-between">
                      <h4 className="mb-0">CURRENT P/L</h4>
                      <h3
                        className={`${
                          sameCoin &&
                          sameCoin[0] - sameCoin[2]?.crypto_purchase_price > 0
                            ? "text-success mb-0"
                            : "text-danger mb-0"
                        }`}
                      >
                        $
                        {sameCoin &&
                          (
                            sameCoin[0] - sameCoin[2]?.crypto_purchase_price
                          ).toFixed(2)}
                        {/* {sameCoin &&
                          (
                            ((sameCoin[0] -
                              sameCoin[2]?.crypto_purchase_price) *
                              sameCoin[2]?.trade) /
                            sameCoin[2]?.crypto_purchase_price
                          ).toFixed(2)} */}
                      </h3>
                    </div>

                    <hr />
                    <div className="d-flex w-100 justify-content-between">
                      <h4 className="mb-0">TOTAL</h4>
                      <h3 className="mb-0">
                        $
                        {sameCoin &&
                          (
                            Number(sameCoin[2]?.trade) +
                            Number(
                              sameCoin[0] - sameCoin[2]?.crypto_purchase_price
                            )
                          ).toFixed(2)}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex">
              <input
                type="checkbox"
                className="form-check-input me-2"
                id="val-terms"
                name="val-terms"
                // value="1"
                value={partialTrade}
                onClick={() => setPartialTrade(!partialTrade)}
              />
              <h5 className="mb-0">Close only part of the trade</h5>
            </div>

            {partialTrade && (
              <div
                className="d-flex align-items-center justify-content-between"
                style={{ marginTop: "32px" }}
              >
                <div className="mb-3" style={{ flex: 0.2 }}>
                  <h5 className="d-flex justify-content-center align-items-center">
                    {isUnits ? "CLOSE UNITS" : "CLOSE AMOUNT"}
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

                {/* <div style={{ flex: 0.2 }}>
                  <div
                    role="button"
                    className="p-2 mb-3 bg-light rounded d-flex align-items-center justify-content-around"
                    onClick={() => setIsUnits(!isUnits)}
                  >
                    <i class="fas fa-exchange-alt"></i>
                    <h4 className="mb-0">{!isUnits ? "UNITS" : "AMOUNT"}</h4>
                  </div>
                </div> */}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer className="justify-content-center">
            <Button
              onClick={closeTrade}
              variant="danger"
              style={{ width: "200px" }}
            >
              Close Trade
            </Button>
          </Modal.Footer>
        </Modal>
        {/* <Modal className="fade" show={modalTradeEdit} centered>
          <Modal.Header>
            <Modal.Title>{selectedCoin?.data.crypto_name}</Modal.Title>
            <Button
              onClick={() => setModalTradeEdit(false)}
              variant=""
              className="btn-close"
            ></Button>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex flex-column">
              <div className="d-flex mb-4">
                <img src={selectedCoin?.coinImg} width="40" height="40" />
                <div className="mx-2">
                  <div className=" d-flex">
                    <p className="mb-0 ">BUY </p>
                    <h5 className="mb-0 px-1">
                      {selectedCoin?.data.crypto_name}
                    </h5>
                  </div>
                  <div className="d-flex align-items-center">
                    <h3 className="mb-0">Coin Price</h3>
                    <small
             
                    >
                      % change
                    </small>
                  </div>
                </div>
              </div>

              <div>
                <div className="d-flex w-100 justify-content-between">
                  <div className="d-flex w-100 flex-column">
                    <div className="d-flex w-100 justify-content-between">
                      <h4 className="mb-0">INVESTED</h4>
                      <div>
                        <h3 className="mb-0">
                          ${selectedCoin?.data.investment}
                        </h3>
                        <p className="mb-0 d-flex justify-content-end">
                          0.10 Units
                        </p>
                      </div>
                    </div>
                    <div className="d-flex w-100 justify-content-between">
                      <h4 className="mb-0">OPEN</h4>
                      <div>
                        <h3 className="mb-0">
                          ${selectedCoin?.data.investment}
                        </h3>
                        <p className="mb-0 d-flex justify-content-end">
                          1/11/22 12:43
                        </p>
                      </div>
                    </div>
                    <div className="d-flex w-100 justify-content-between">
                      <h4 className="mb-0">CURRENT P/L</h4>
                      <h3 className="mb-0">$-313.18</h3>
                    </div>

                    <hr />
                    <div className="d-flex w-100 justify-content-between">
                      <h4 className="mb-0">TOTAL</h4>
                      <h3 className="mb-0">$-3113.18</h3>
                    </div>
                  </div>
                </div>
                <Col xl={12}>
                  <Card>
                    <Card.Body>
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
                                  className="d-flex align-items-center"
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
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="justify-content-center">
            <Button
              onClick={closeTrade}
              variant="danger"
              style={{ width: "200px" }}
            >
              Edit Trade
            </Button>
          </Modal.Footer>
        </Modal> */}
      </div>

      {/* <div className="position-absolute bottom-0"> */}

      <Card>
        <Row className="p-4 ">
          <Col lg={3} className="">
            <div className="text-center">
              <h4 className="mb-0 " style={{ fontSize: "1.4rem" }}>
                $16,000
              </h4>
              <p className="mb-0 " style={{ fontSize: "1.4rem" }}>
                Cash Available
              </p>
              {/* <h5 className=" display-4">+</h5> */}
            </div>
          </Col>
          <Col lg={3} className="">
            <div className="text-center">
              <h4 className="mb-0 " style={{ fontSize: "1.4rem" }}>
                $46,000
              </h4>
              <p className="mb-0 " style={{ fontSize: "1.4rem" }}>
                Total Invested
              </p>
              {/* <h5 className=" display-4">+</h5> */}
            </div>
          </Col>
          <Col lg={3} className="">
            <div className="text-center">
              <h4 className="mb-0 " style={{ fontSize: "1.4rem" }}>
                -$1600
              </h4>
              <p className="mb-0 " style={{ fontSize: "1.4rem" }}>
                Profit/Loss
              </p>
              {/* <h5 className=" display-4">=</h5> */}
            </div>
          </Col>
          <Col lg={3} className="">
            <div className="text-center">
              <h4 className="mb-0 " style={{ fontSize: "1.4rem" }}>
                $100,000
              </h4>
              <p className="mb-0 " style={{ fontSize: "1.4rem" }}>
                Portfolio Value
              </p>
            </div>
          </Col>
        </Row>
      </Card>
      {/* </div> */}
      {/* </div> */}
    </>
  );
}

export default Portfolio;
