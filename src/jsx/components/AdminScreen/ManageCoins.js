import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageTitle from "../../layouts/PageTitle";

function ManageCoins() {
  const [coinData, setCoinData] = useState([]);
  const [perCoinData, setPerCoinData] = useState([]);
  const [change, setChange] = useState("24h");
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  const sort = 10;

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
        let result = res.data.data;
        let newArray = [];
        // perCoin - data.quote.USD.price,
        // setTimeout(() => {
        localStorage.setItem("perData", JSON.stringify(res.data.data));
        setCoinData(res.data.data);
        // }, 500);
      });
  };
  const disableHandler = () => {};

  // const createMarketList = async (name) => {
  //   // const user = localStorage.getItem("user");
  //   // console.log("USer", user);
  //   // const parseUSer = JSON.parse(user);
  //   // console.log("PArse USer", parseUSer.id);
  //   // console.log("Coin", data.name);

  //   await axios
  //     .post("http://localhost:4000/api/marketList", {
  //       user_id: 1,
  //       coin_name: name,
  //     })
  //     .then((res) => {
  //       console.log("Successfully Add Coin", res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <div>
      <PageTitle activeMenu="Manage Coins" motherMenu="Admin" />

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
                        className="sorting"
                        tabIndex={0}
                        rowSpan={1}
                        colSpan={1}
                      >
                        <div class="dropdown d-flex justify-content-center">
                          <button
                            class="btn btn-primary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            Change {change}
                          </button>
                          <div
                            class="dropdown-menu"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <a
                              class="dropdown-item"
                              href="#"
                              onClick={() => setChange("1h")}
                            >
                              Change 1h
                            </a>
                            <a
                              class="dropdown-item"
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setChange("24h");
                              }}
                            >
                              Change 24h
                            </a>
                            <a
                              class="dropdown-item"
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setChange("7d");
                              }}
                            >
                              Change 7d
                            </a>
                          </div>
                        </div>
                      </th>
                      <th
                        className="sorting"
                        tabIndex={0}
                        rowSpan={1}
                        colSpan={1}
                      >
                        Status
                      </th>
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
                    {[...coinData].map((data, ind) => {
                      // let coinImg = require(`../../../icons/coins/${data?.slug}.png`);
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
                            {change === "1h"
                              ? parseFloat(
                                  data.quote.USD.percent_change_1h
                                ).toFixed(2)
                              : change === "7d"
                              ? parseFloat(
                                  data.quote.USD.percent_change_7d
                                ).toFixed(2)
                              : parseFloat(
                                  data.quote.USD.percent_change_24h
                                ).toFixed(2)}
                            %
                          </td>

                          <td>
                            <div className="d-flex align-items-center">
                              <i className="fa fa-circle text-success me-1"></i>
                              Successful
                            </div>
                          </td>
                          <td>
                            {/* {req?.request_status === "Pending" && ( */}
                            <Dropdown>
                              <Dropdown.Toggle
                                variant="success"
                                className="light sharp i-false"
                              >
                                {svg1}
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item
                                // onClick={() =>
                                //   changeStatus(req?.id, "Approved")
                                // }
                                // onClick={() => {}}
                                >
                                  Enable
                                </Dropdown.Item>
                                <Dropdown.Item
                                // onClick={() => {
                                //   setActiveId(req?.id);
                                //   setModalCentered(true);
                                // }}
                                >
                                  Disable
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                            {/* )} */}
                            {/* {req?.request_status === "Rejected" &&
                            req?.status_description} */}
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
        </div>
      </div>
    </div>
  );
}

export default ManageCoins;
