import React from "react";
import { Card, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageTitle from "../../layouts/PageTitle";
import avatar1 from "../../../images/avatar/1.jpg";
import avatar2 from "../../../images/avatar/2.jpg";
import avatar3 from "../../../images/avatar/3.jpg";

function UserManagement() {
  return (
    <div>
      <PageTitle activeMenu="User Management" motherMenu="Admin" />

      <Col lg={12}>
        <Card>
          <Card.Header>
            <Card.Title>Users</Card.Title>
          </Card.Header>
          <Card.Body>
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <strong>User</strong>
                  </th>
                  <th>
                    <strong>Email</strong>
                  </th>
                  <th>
                    <strong>Profit / Loss</strong>
                  </th>
                  <th>
                    <strong>Available Balance</strong>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={avatar1}
                        className="rounded-lg me-2"
                        width="24"
                        alt=""
                      />{" "}
                      <span className="w-space-no">Dr. Jackson</span>
                    </div>
                  </td>
                  <td>example@example.com </td>
                  <td>$120</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <i className="fa fa-circle text-success me-1"></i>{" "}
                      Successful
                    </div>
                  </td>
                  <td>
                    <div className="d-flex">
                      <Link
                        href="#"
                        className="btn btn-primary shadow btn-xs sharp me-1"
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </Link>
                      <Link
                        href="#"
                        className="btn btn-danger shadow btn-xs sharp"
                      >
                        <i className="fa fa-trash"></i>
                      </Link>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={avatar2}
                        className="rounded-lg me-2"
                        width="24"
                        alt=""
                      />{" "}
                      <span className="w-space-no">Dr. Jackson</span>
                    </div>
                  </td>
                  <td>example@example.com </td>
                  <td>$2120</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <i className="fa fa-circle text-danger me-1"></i> Canceled
                    </div>
                  </td>
                  <td>
                    <div className="d-flex">
                      <Link
                        href="#"
                        className="btn btn-primary shadow btn-xs sharp me-1"
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </Link>
                      <Link
                        href="#"
                        className="btn btn-danger shadow btn-xs sharp"
                      >
                        <i className="fa fa-trash"></i>
                      </Link>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={avatar3}
                        className="rounded-lg me-2"
                        width="24"
                        alt=""
                      />{" "}
                      <span className="w-space-no">Dr. Jackson</span>
                    </div>
                  </td>
                  <td>example@example.com </td>
                  <td>$-120</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <i className="fa fa-circle text-warning me-1"></i> Pending
                    </div>
                  </td>
                  <td>
                    <div className="d-flex">
                      <Link
                        href="#"
                        className="btn btn-primary shadow btn-xs sharp me-1"
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </Link>
                      <Link
                        href="#"
                        className="btn btn-danger shadow btn-xs sharp"
                      >
                        <i className="fa fa-trash"></i>
                      </Link>
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
}

export default UserManagement;
