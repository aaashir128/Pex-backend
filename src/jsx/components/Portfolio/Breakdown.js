import React, { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import PageTitle from "../../layouts/PageTitle";
import { Button, Card, Col, Dropdown, Row } from "react-bootstrap";
import { baseURL, tradeAPI } from "../../../Strings/Strings";

const sort = 10;
let perArr = [];
function Breakdown() {
  let { coin } = useParams();

  const [coinData, setCoinData] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  let usr = localStorage.getItem("user");
  usr = JSON.parse(usr);

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
  };

  // useEffect(() => {
  //   axios.get(`${baseURL}${tradeAPI}?user_id=1`).then((res) => {
  //     console.log(res, "res");
  //     setCoinData(res.data.ActiveTradeRequests);
  //   });
  // }, []);

  return (
    <>
      <PageTitle activeMenu={coin} motherMenu="Portfolio" />

      {/* //Total Section */}
      <Card className="p-4">
        <div>
          <Row>
            <Col md="12" lg="7">
              <div className="d-flex justify-content-between ">
                <div className="d-flex align-items-center">
                  <img src="" width="40" height="40" />
                  <div className="mx-2 ">
                    <div className="d-flex">
                      <p className="mb-0 fw-bold">{coin}</p>
                      <p className="mb-0 text-gray">· Coin Name</p>
                    </div>
                    <div className="d-flex align-items-center">
                      <h4 className="mr-2">$12345.60</h4>
                      <small>(-1.26)%</small>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="mb-0 fw-bold">
                    0.92<span className="fw-normal"> Units</span> @ 16325.65
                  </p>
                  <p className="fw-bold">$15,000.00</p>
                  <h5 className="mb-0 fw-light">Invested</h5>
                </div>
              </div>
            </Col>

            <Col md="12" lg="5">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h4 className="mb-0">$14352.22</h4>
                  <p className="text-red fw-bold">-$12.22 (-0.29)%</p>
                  <h5 className="mb-0 fw-light">Value</h5>
                </div>
                <div>
                  <button
                    className="btn btn-primary "
                    style={{ width: "120px" }}
                  >
                    Trade
                  </button>
                </div>
                <Dropdown className="dropdown text-right">
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
                        <circle fill="#000000" cx={5} cy={12} r={2} />
                        <circle fill="#000000" cx={12} cy={12} r={2} />
                        <circle fill="#000000" cx={19} cy={12} r={2} />
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
              </div>
            </Col>
          </Row>
        </div>
      </Card>

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
                        Position
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
                      >
                        <Button className="me-2" variant="outline-info">
                          Close All
                        </Button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...coinData].map((data, ind) => {
                      //   let coinImg = require(`../../../icons/coins/${data.crypto_name}.png`);
                      //   let perPrice = perCoinData[ind]?.quote?.USD?.price;
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
                                <p className="mb-0 inline">Buy</p>
                              </div>
                            </div>
                          </td>
                          <td>${data.investment}</td>
                          <td>0.61</td>

                          <td>{data.crypto_purchase_price}</td>
                          <td>
                            <Button
                              //   className="me-4"
                              variant="outline-light btn-square"
                            >
                              ...
                            </Button>
                          </td>
                          <td>
                            <Button
                              //   className="me-4"
                              variant="outline-light btn-square"
                            >
                              ...
                            </Button>
                          </td>
                          <td>$25</td>
                          <td>
                            <Button className="me-2" variant="outline-danger">
                              Close
                            </Button>
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
      </div>
    </>
  );
}

export default Breakdown;
