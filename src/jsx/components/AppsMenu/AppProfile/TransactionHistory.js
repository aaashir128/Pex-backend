import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Badge, Card, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import { baseURL } from "../../../../Strings/Strings";
import sortArray from "../../../../utils/sort";
import CurrencyFormat from "react-currency-format";
// import icon from "../../../icons/coins/";
import { Button, Dropdown } from "react-bootstrap";

const sort = 5;


function TransactionHistory() {
  const [data, setData] = useState([]);
  const [deposit, setdeposit] = useState([])
  const [fullData, setfullData] = useState([])
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(5);
  const [order, setorder] = useState("ASC")


  const activePag = useRef(0);
  const chageData = (frist, sec) => {
    for (var i = 0; i < fullData?.length; ++i) {
      if (i >= frist && i < sec) {
        fullData[i]?.classList?.remove("d-none");
      } else {
        fullData[i]?.classList?.add("d-none");
      }
    }
  };

  activePag.current === 0 && chageData(0, sort);
  let paggination = fullData.length > 0 ? Array(Math.ceil(fullData?.length / sort))?.fill()?.map((_, i) => i + 1) : [1];

  const onClick = (i) => {
    activePag.current = i;
    setStart(activePag.current * sort);
    setEnd((activePag.current + 1) * sort);
    // chageData(activePag.current * sort, (activePag.current + 1) * sort);
    // settest(i);
  }

  useEffect(() => {

    let usr = localStorage.getItem("user");
    let token = JSON.parse(localStorage.getItem("token"))
    usr = JSON.parse(usr);
    axios
      .get(`${baseURL}/api/withdraw/${usr?.id}`, { headers: { "x-auth-token": token } })
      .then((res) => {
        console.log(res?.data, "res");
        const nn = res?.data?.map(i => {
          return { ...i, type: "Withdraw" }
        })
        setData(nn.reverse());
      }).catch(err => { console.log(err?.response?.data) });



    axios
      .get(`${baseURL}/api/deposit/${usr?.id}`, { headers: { "x-auth-token": token } })
      .then((res) => {
        console.log(res?.data, "res");
        const nn = res?.data?.map(i => {
          return { ...i, type: "Deposit" }
        })
        setdeposit(nn);
      }).catch(err => { console.log(err?.response?.data) });
  }, []);
  useEffect(() => {
    const srtElem = JSON.parse(localStorage.getItem("fullData"))
    srtElem ? setfullData(sortArray([...data,...deposit],srtElem?.elem,srtElem?.type,srtElem?.order)) : setfullData([...data, ...deposit]) 
    // setfullData([...data, ...deposit])
  }, [data, deposit])

  const sortDATA = (arr, elem, type, order) => {
    setfullData(sortArray(arr, elem, type, order,"fullData"))
    order == "ASC" ? setorder("DESC") : setorder("ASC")
  }

  return (
    <div>
      <Col lg={12}>
        <Card>
          <Card.Header>
            <Card.Title>Transaction History</Card.Title>
          </Card.Header>
          <div className="card-body">
            <div className="table-responsive">
              <div id="job_data" className="dataTables_wrapper">
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th onClick={() => { sortDATA(fullData, "requested_at", "date", order) }} >Date Time  <i class="fas fa-sort"></i></th>
                      <th onClick={() => { sortDATA(fullData, "status", "string", order) }} >Status  <i class="fas fa-sort"></i></th>
                      <th onClick={() => { sortDATA(fullData, "type", "string", order) }} >Type  <i class="fas fa-sort"></i></th>
                      <th onClick={() => { sortDATA(fullData, "amount", "num", order) }} >Amount  <i class="fas fa-sort"></i></th>
                    </tr>
                  </thead>
                  <tbody>
                    {fullData?.slice(start, end)?.map((req, ind) => {
                      return (
                        <tr key={ind}>
                          <td>
                            <Link to="/table-bootstrap-basic">{ind + 1}</Link>
                          </td>

                          <td>
                            <span className="text-muted">
                              {req?.status == "Pending"
                                ? moment(req?.requested_at).format(
                                  "YYYY-MM-DD hh:mm a"
                                )
                                : moment(req?.requested_at).format(
                                  "YYYY-MM-DD hh:mm a"
                                )}
                            </span>
                          </td>
                          <td>
                            <Badge
                              variant={`${req?.status === "Rejected"
                                ? "danger light"
                                : req?.status === "Approved"
                                  ? "primary light"
                                  : "warning light"
                                }`}
                              style={{ width: 80 }}
                            >
                              {req?.status}
                            </Badge>
                          </td>
                          <td>{req?.type}</td>
                          <td>
                            <CurrencyFormat
                              value={req?.amount}
                              displayType={"text"}
                              // decimalSeparator={true}
                              decimalScale={2}
                              thousandSeparator={true}
                              prefix={"$"}
                              fixedDecimalScale={true}
                              renderText={(value) => (
                                <span>{value} </span>
                              )}
                            />
                            {/* $ {req?.amount} */}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
                <div className="d-sm-flex text-center justify-content-between align-items-center mt-4">
                  <div className="dataTables_info">
                    Showing {activePag.current * sort + 1} to{" "}
                    {fullData?.length > (activePag.current + 1) * sort
                      ? (activePag.current + 1) * sort
                      : fullData?.length}{" "}
                    of {fullData?.length} entries
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
        </Card>
      </Col>
    </div>
  );
}

export default TransactionHistory;
