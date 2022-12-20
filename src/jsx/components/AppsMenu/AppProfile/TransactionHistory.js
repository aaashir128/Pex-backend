import axios from "axios";
import React, { useEffect, useState } from "react";
import { Badge, Card, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import { baseURL } from "../../../../Strings/Strings";

function TransactionHistory() {
  const [data, setData] = useState([]);
  // useEffect(() => {

  //   let usr = localStorage.getItem("user");
  //   usr = JSON.parse(usr);
  //   axios
  //     .get(`${baseURL}api/deposit_requests?user_id=${usr?.id}`)
  //     .then((res) => {
  //       console.log(res, "res");
  //       setData(res.data.DepositRequests.reverse());
  //     });
  // }, []);
  return (
    <div>
      <Col lg={12}>
        <Card>
          <Card.Header>
            <Card.Title>Transaction History</Card.Title>
          </Card.Header>
          <Card.Body>
            <Table responsive striped>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Date Time</th>
                  <th>Status</th>
                  <th>Type</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {data.map((req, ind) => {
                  return (
                    <tr>
                      <td>
                        <Link to="/table-bootstrap-basic">{ind + 1}</Link>
                      </td>

                      <td>
                        <span className="text-muted">
                          {req?.request_status == "Pending"
                            ? moment(req?.created_at).format(
                                "YYYY-MM-DD hh:mm a"
                              )
                            : moment(req?.updated_at).format(
                                "YYYY-MM-DD hh:mm a"
                              )}
                        </span>
                      </td>
                      <td>
                        <Badge
                          variant={`${
                            req?.request_status === "Rejected"
                              ? "danger light"
                              : req?.request_status === "Approved"
                              ? "primary light"
                              : "warning light"
                          }`}
                          style={{ width: 80 }}
                        >
                          {req?.request_status}
                        </Badge>
                      </td>
                      <td>{req?.type}</td>
                      <td>$ {req?.amount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
}

export default TransactionHistory;
