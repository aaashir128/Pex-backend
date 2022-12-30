import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PageTitle from "../../layouts/PageTitle";
// import icon from "../../../icons/coins/";
import { Button, Dropdown } from "react-bootstrap";
import { baseURL, tradeAPI, tradeHistoryAPI } from "../../../Strings/Strings";
import moment from "moment";
import cryptoicons from "../../../icons/cryptoIcons/cryptoImg";

const sort = 10;
let perArr = [];
function TradeHistory(props) {
  const [historyData, setHistoryData] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  let usr = localStorage.getItem("user");
  usr = JSON.parse(usr);

  const activePag = useRef(0);
  const chageData = (frist, sec) => {
    for (var i = 0; i < historyData?.length; ++i) {
      if (i >= frist && i < sec) {
        historyData[i]?.classList?.remove("d-none");
      } else {
        historyData[i]?.classList?.add("d-none");
      }
    }
  };

  activePag.current === 0 && chageData(0, sort);
  // let paggination = Array(Math.ceil(historyData?.length / sort))?.fill()?.map((_, i) => i + 1);
  let paggination = [1, 2, 3, 4];

  const onClick = (i) => {
    activePag.current = i;
    setStart(activePag.current * sort);
    setEnd((activePag.current + 1) * sort);
    // chageData(activePag.current * sort, (activePag.current + 1) * sort);
    // settest(i);
  };

  const getTrades = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const token = JSON.parse(localStorage.getItem('token'))
    axios.get(`${baseURL}/api/tradehistory/${user?.id}`,{ headers: { "x-auth-token": token } }).then((res) => {
      console.log(res?.data, "res");
      let userTradeHistory = res?.data;
      setHistoryData(userTradeHistory);
      console.log(userTradeHistory);
    });
  }

  useEffect(() => {
    getTrades()
  }, []);

  return (
    <>
      <PageTitle activeMenu="Trade History" motherMenu="Home" />

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
                        Crypto Price
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
                      >
                        Date Open
                      </th>
                      <th
                        className="sorting"
                        tabIndex={0}
                        rowSpan={1}
                        colSpan={1}
                      >
                        Date Close
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    { historyData?.length > 0 && [...historyData]?.map((data, ind) => {
                      let coinImg = cryptoicons[data];
                      // let coinImg = require(`../../../icons/coins/${data?.active_trade?.crypto_name}.png`);
                      //   let perPrice = perCoinData[ind]?.quote?.USD?.price;
                      return (
                        <tr
                          key={data?.id}
                          role="row"
                          className="even market-trbg"
                        >
                          <td className="sorting_1">
                            <div className="d-flex align-items-center">
                              <img src={coinImg} width="40" height="40" />
                              <div className="mx-2 ">
                                <p className="mb-0 inline">
                                  {data?.crypto_name}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>${data?.open_trade}</td>

                          <td>${data?.close_trade}</td>

                          <td
                          style={data?.actual_profit > 0 ? {color:'green'} : {color:'red'} }
                          >${data?.actual_profit > 0 ? data?.actual_profit?.toFixed(2) : data?.actual_loss?.toFixed(2)}</td>
                          <td>
                            {moment(data?.active_trade?.invested_date).format(
                              "YYYY-MM-DD hh:mm a"
                            )}
                          </td>
                          <td>
                            {moment(data.created_at).format(
                              "YYYY-MM-DD hh:mm a"
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="d-sm-flex text-center justify-content-between align-items-center mt-4">
                  <div className="dataTables_info">
                    Showing {activePag.current * sort + 1} to{" "}
                    {historyData?.length > (activePag.current + 1) * sort
                      ? (activePag.current + 1) * sort
                      : historyData?.length}{" "}
                    of {historyData?.length} entries
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
      </div>
    </>
  );
}

export default TradeHistory;
