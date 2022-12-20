import React, { useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
// import syk from "../../../icons/stocks/syk.svg";
// import pen from "../../../icons/stocks/pen.svg";
// import isrg from "../../../icons/stocks/isrg.svg";
// import dxcm from "../../../icons/stocks/dxcm.svg";
// import abt from "../../../icons/stocks/abt.svg";

import { Link } from "react-router-dom";

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

const sort = 10;
let perArr = [];

function StocksTable() {
  const [modalCentered, setModalCentered] = useState(false);
  const [change, setChange] = useState("24h");
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  const [coinData, setCoinData] = useState([]);

  const activePag = useRef(0);
  //   const chageData = (frist, sec) => {
  //     for (var i = 0; i < coinData?.length; ++i) {
  //       if (i >= frist && i < sec) {
  //         coinData[i]?.classList?.remove("d-none");
  //       } else {
  //         coinData[i]?.classList?.add("d-none");
  //       }
  //     }
  //   };

  //   activePag.current === 0 && chageData(0, sort);
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

  return (
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
                      Market
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
                  {/* {[...commodityData].map((data, ind) => {
                let coinImg = require(`../../../icons/coins/${data.slug}.png`);
                let perPrice = perCoinData[ind]?.quote?.USD?.price;
                return ( */}
                  <tr role="row" className="even market-trbg">
                    <td className="sorting_1">
                      <div className="d-flex align-items-center">
                        {/* <img src={syk} width="40" height="40" /> */}
                        <div className="mx-2 ">
                          <p className="mb-0">SYK</p>
                          <p className="mb-0">Syk Corp</p>
                        </div>
                      </div>
                    </td>
                    <td>$244</td>
                    <td className="text-center">
                      {change === "1h" ? (
                        <p className="">0.7%</p>
                      ) : change === "7d" ? (
                        <p className="">2.2%</p>
                      ) : (
                        <p className="">1.2%</p>
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
                        }}
                      >
                        Buy Now
                      </button>
                    </td>

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
                          // onClick={async () => {
                          //   const user = localStorage.getItem("user");
                          //   console.log("USer", user);
                          //   const parseUSer = JSON.parse(user);
                          //   console.log("PArse USer", parseUSer.id);
                          //   console.log("Coin", data.name);

                          //   await axios
                          //     .post("http://localhost:4000/api/watchList", {
                          //       user_id: parseUSer.id,
                          //       coin_name: data.name,
                          //     })
                          //     .then((res) => {
                          //       console.log("Successfully Add Coin", res);
                          //     })
                          //     .catch((err) => {
                          //       console.log(err);
                          //     });
                          // }}
                          >
                            Add To WatchList
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                  <tr role="row" className="even market-trbg">
                    <td className="sorting_1">
                      <div className="d-flex align-items-center">
                        {/* <img src={pen} width="40" height="40" /> */}
                        <div className="mx-2 ">
                          <p className="mb-0">PEN</p>
                          <p className="mb-0">Penumbra Inc</p>
                        </div>
                      </div>
                    </td>
                    <td>$215</td>
                    <td className="text-center">
                      {change === "1h" ? (
                        <p className="">0.4%</p>
                      ) : change === "7d" ? (
                        <p className="">2.8%</p>
                      ) : (
                        <p className="">1.6%</p>
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
                        }}
                      >
                        Buy Now
                      </button>
                    </td>

                    <td className="">
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="primary"
                          className="light sharp i-false"
                        >
                          {svg1}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>Add To WatchList</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                  <tr role="row" className="even market-trbg">
                    <td className="sorting_1">
                      <div className="d-flex align-items-center">
                        {/* <img src={isrg} width="40" height="40" /> */}
                        <div className="mx-2 ">
                          <p className="mb-0">ISRG</p>
                          <p className="mb-0">ISRG Corp</p>
                        </div>
                      </div>
                    </td>
                    <td>$270</td>
                    <td className="text-center">
                      {change === "1h" ? (
                        <p className="">0.7%</p>
                      ) : change === "7d" ? (
                        <p className="">2.2%</p>
                      ) : (
                        <p className="">1.2%</p>
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
                        }}
                      >
                        Buy Now
                      </button>
                    </td>

                    <td className="">
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="primary"
                          className="light sharp i-false"
                        >
                          {svg1}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>Add To WatchList</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                  <tr role="row" className="even market-trbg">
                    <td className="sorting_1">
                      <div className="d-flex align-items-center">
                        {/* <img src={dxcm} width="40" height="40" /> */}
                        <div className="mx-2 ">
                          <p className="mb-0">DXCM</p>
                          <p className="mb-0">DXCM Inc</p>
                        </div>
                      </div>
                    </td>
                    <td>$116.46</td>
                    <td className="text-center">
                      {change === "1h" ? (
                        <p className="">1.7%</p>
                      ) : change === "7d" ? (
                        <p className="">3.2%</p>
                      ) : (
                        <p className="">4.2%</p>
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
                        }}
                      >
                        Buy Now
                      </button>
                    </td>

                    <td className="">
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="primary"
                          className="light sharp i-false"
                        >
                          {svg1}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>Add To WatchList</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                  <tr role="row" className="even market-trbg">
                    <td className="sorting_1">
                      <div className="d-flex align-items-center">
                        {/* <img src={abt} width="40" height="40" /> */}
                        <div className="mx-2 ">
                          <p className="mb-0">ABT</p>
                          <p className="mb-0">Abbot Lab</p>
                        </div>
                      </div>
                    </td>
                    <td>$107</td>
                    <td className="text-center">
                      {change === "1h" ? (
                        <p className="">0.4%</p>
                      ) : change === "7d" ? (
                        <p className="">2.4%</p>
                      ) : (
                        <p className="">1.3%</p>
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
                        }}
                      >
                        Buy Now
                      </button>
                    </td>

                    <td className="">
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="primary"
                          className="light sharp i-false"
                        >
                          {svg1}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>Add To WatchList</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                  {/* );
              })} */}
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
  );
}

export default StocksTable;
