import axios from "axios";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Dropdown,
  Modal,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  baseURL,
  depositRequest,
  depositRequests,
} from "../../../Strings/Strings";
import PageTitle from "../../layouts/PageTitle";

function DepositRequest() {
  const [modalCentered, setModalCentered] = useState(false);
  const [data, setData] = useState([]);
  const [activeId, setActiveId] = useState(0);
  const [reason, setReason] = useState("");
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  const sort = 10;

  const activePag = useRef(0);
  const chageData = (frist, sec) => {
    for (var i = 0; i < data.length; ++i) {
      if (i >= frist && i < sec) {
        data[i]?.classList?.remove("d-none");
      } else {
        data[i]?.classList?.add("d-none");
      }
    }
  };

  activePag.current === 0 && chageData(0, sort);
  let paggination = Array(Math.ceil(data?.length / sort))
    .fill()
    .map((_, i) => i + 1);

  const onClick = (i) => {
    activePag.current = i;
    setStart(activePag.current * sort);
    setEnd((activePag.current + 1) * sort);
    // chageData(activePag.current * sort, (activePag.current + 1) * sort);
    // settest(i);
  };

  useEffect(() => {
    axios.get(`${baseURL}${depositRequests}`).then((res) => {
      console.log(res, "res");
      setData(res.data.DepositRequests);
    });
  }, []);

  const getDepositRequests = () => {
    axios.get(`${baseURL}${depositRequests}`).then((res) => {
      console.log(res, "res");
      setData(res.data.DepositRequests);
    });
  };

  const changeStatus = (id, status) => {
    let usr = localStorage.getItem("user");
    usr = JSON.parse(usr);
    const postData = {
      id: id ? id : activeId,
      request_status: status,
      updated_by: usr?.id,
      status_description: reason,
    };
    axios.put(`${baseURL}${depositRequest}`, postData).then((res) => {
      console.log(res, "res");
      setModalCentered(false);
      getDepositRequests();
    });
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

  return (
    <div>
      <PageTitle motherMenu="Admin" activeMenu="Deposit Request" />
      <Col lg={12}>
        <Card>
          <Card.Header>
            <Card.Title>Deposit Request</Card.Title>
          </Card.Header>
          <Card.Body>
            <div id="job_data" className="dataTables_wrapper">
              <Table responsive>
                <thead>
                  <tr>
                    <th className="width80">
                      <strong>#</strong>
                    </th>
                    <th>
                      <strong>USERNAME</strong>
                    </th>
                    <th>
                      <strong>DEPOSIT AMOUNT</strong>
                    </th>
                    <th>
                      <strong>DATE</strong>
                    </th>
                    <th>
                      <strong>STATUS</strong>
                    </th>

                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {[...data].slice(start, end).map((req, ind) => {
                    return (
                      <tr>
                        <td>
                          <strong>{ind + 1}</strong>
                        </td>
                        <td>
                          {req?.user?.firstName + " " + req?.user?.lastName}
                        </td>
                        <td>$ {req?.amount?.toFixed(2)}</td>
                        <td>
                          {req?.request_status == "Pending"
                            ? moment(req?.requested_at).format(
                                "YYYY-MM-DD hh:mm a"
                              )
                            : moment(req?.updated_at).format(
                                "YYYY-MM-DD hh:mm a"
                              )}
                        </td>
                        <td>
                          <Badge
                            variant={`${
                              req?.request_status === "Rejected"
                                ? "danger light"
                                : req?.request_status === "Approved"
                                ? "success light"
                                : "warning light"
                            }`}
                          >
                            {" "}
                            {req?.request_status}
                          </Badge>
                        </td>
                        <td>
                          {req?.request_status === "Pending" && (
                            <Dropdown>
                              <Dropdown.Toggle
                                variant="success"
                                className="light sharp i-false"
                              >
                                {svg1}
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item
                                  onClick={() =>
                                    changeStatus(req?.id, "Approved")
                                  }
                                >
                                  Approve
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => {
                                    setActiveId(req?.id);
                                    setModalCentered(true);
                                  }}
                                >
                                  Reject
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          )}
                          {req?.request_status === "Rejected" &&
                            req?.status_description}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
            <div className="d-sm-flex text-center justify-content-between align-items-center mt-4">
              <div className="dataTables_info">
                Showing {activePag.current * sort + 1} to{" "}
                {data?.length > (activePag.current + 1) * sort
                  ? (activePag.current + 1) * sort
                  : data.length}{" "}
                of {data.length} entries
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
                  <i className="fa fa-angle-double-left" aria-hidden="true"></i>
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
          </Card.Body>
        </Card>
      </Col>
      <Modal className="fade" show={modalCentered} centered>
        <Modal.Header>
          <Modal.Title>Reason</Modal.Title>
          <Button
            onClick={() => setModalCentered(false)}
            variant=""
            className="btn-close"
          ></Button>
        </Modal.Header>
        <Modal.Body>
          <div class="form-group">
            <label for="exampleFormControlTextarea1">Reject Reason</label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              onChange={(e) => {
                setReason(e.target.value);
              }}
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => setModalCentered(false)}
            variant="danger light"
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => changeStatus(null, "Rejected")}
          >
            Reject Request
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DepositRequest;
