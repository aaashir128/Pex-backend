import React from "react";
import { Card, Col, Dropdown, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageTitle from "../../layouts/PageTitle";
import avatar1 from "../../../images/avatar/1.jpg";
import avatar2 from "../../../images/avatar/2.jpg";
import avatar3 from "../../../images/avatar/3.jpg";
// import DonutChart from "./donut";
import DonutChart from "../Dashboard/Dashboard/DonutChart";
import PolarChart from "../charts/Chartjs/polar";
import LineChart1 from "../charts/Chartjs/line1";
import BasicArea from "../charts/Chartjs/basicArea";
import { Doughnut } from "react-chartjs-2";
import ApexRedialBar2 from "../charts/apexcharts/Pie5";
import ApexPie4 from "../charts/apexcharts/Pie4";
import ApexRedialBar from "../charts/apexcharts/RadialBar";
import NagetivePositive from "../charts/rechart/PositiveNagative2";
import { Sparklines, SparklinesBars } from "react-sparklines";
import Emailchart from "../Dashboard/Dashboard/Emailchart";

function Dropdownblog() {
  return (
    <Dropdown>
      <Dropdown.Toggle
        as="div"
        className="btn-link i-false"
        data-bs-toggle="dropdown"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12.4999" cy="3.5" r="2.5" fill="#A5A5A5" />
          <circle cx="12.4999" cy="11.5" r="2.5" fill="#A5A5A5" />
          <circle cx="12.4999" cy="19.5" r="2.5" fill="#A5A5A5" />
        </svg>
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
        <Dropdown.Item>Delete</Dropdown.Item>
        <Dropdown.Item>Edit</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
function UserManagement() {
  return (
    <div>
      <PageTitle activeMenu="User Management" motherMenu="Admin" />

      <Row>
        {/* <Col xl={3} lg={6}>
          <Card>
            <Card.Header>
              <h4 className="card-title">Bi Polar</h4>
            </Card.Header>
            <Card.Body>
              <Sparklines
                data={[
                  20, 30, 30, 42, 43, 20, 21, 32, 30, 43, 23, 30, 65, 43, 30,
                  24, 54,
                ]}
              >
                <SparklinesBars style={{ fill: "#00a15d" }} />
              </Sparklines>
            </Card.Body>
          </Card>
        </Col> */}

        <div className="col-xl-6 col-sm-12">
          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-header border-0">
                  <div>
                    <h4 className="fs-20 font-w700">Project Categories</h4>
                    <span className="fs-14 font-w400 d-block">
                      Lorem ipsum dolor sit amet
                    </span>
                  </div>
                  <Dropdownblog />
                </div>
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-xl-6">
                      <div>
                        <span className="fs-18 font-w600 mb-3 d-block">
                          Legend
                        </span>
                      </div>
                      <div>
                        <div className="d-flex align-items-center justify-content-between mb-4">
                          <span className="fs-18 font-w500">
                            <svg
                              className="me-3"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                width="20"
                                height="20"
                                rx="6"
                                fill="#886CC0"
                              />
                            </svg>
                            Primary (27%)
                          </span>
                          <span className="fs-18 font-w600">763</span>
                        </div>
                        <div className="d-flex align-items-center justify-content-between  mb-4">
                          <span className="fs-18 font-w500">
                            <svg
                              className="me-3"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                width="20"
                                height="20"
                                rx="6"
                                fill="#26E023"
                              />
                            </svg>
                            Promotion (11%)
                          </span>
                          <span className="fs-18 font-w600">321</span>
                        </div>
                        <div className="d-flex align-items-center justify-content-between  mb-4">
                          <span className="fs-18 font-w500">
                            <svg
                              className="me-3"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                width="20"
                                height="20"
                                rx="6"
                                fill="#61CFF1"
                              />
                            </svg>
                            Forum (22%)
                          </span>
                          <span className="fs-18 font-w600">69</span>
                        </div>
                        <div className="d-flex align-items-center justify-content-between  mb-4">
                          <span className="fs-18 font-w500">
                            <svg
                              className="me-3"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                width="20"
                                height="20"
                                rx="6"
                                fill="#FFDA7C"
                              />
                            </svg>
                            Socials (15%)
                          </span>
                          <span className="fs-18 font-w600">154</span>
                        </div>
                        <div className="d-flex align-items-center justify-content-between  mb-4">
                          <span className="fs-18 font-w500">
                            <svg
                              className="me-3"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                width="20"
                                height="20"
                                rx="6"
                                fill="#FF86B1"
                              />
                            </svg>
                            Spam (25%)
                          </span>
                          <span className="fs-18 font-w600">696</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6 text-center">
                      <div id="emailchart" className="mb-3">
                        <Emailchart />
                      </div>
                      <Link
                        to={"#"}
                        className="btn btn-outline-primary btn-rounded"
                      >
                        Update Progress
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Col xl={3} lg={6}>
          <Card>
            <Card.Header>
              <h4 className="card-title">Bi Polar</h4>
            </Card.Header>
            <Card.Body>
              <NagetivePositive />
            </Card.Body>
          </Card>
        </Col>

        <Col xl={3} lg={6}>
          <Card>
            <Card.Header>
              <h4 className="card-title">Bi Polar</h4>
            </Card.Header>
            <Card.Body>
              <PolarChart />
            </Card.Body>
          </Card>
        </Col>

        <Col xl={3} lg={6}>
          <Card>
            <Card.Header>
              <h4 className="card-title">Donut</h4>
            </Card.Header>
            <Card.Body>
              <ApexRedialBar />
            </Card.Body>
          </Card>
        </Col>

        <Col xl={6} lg={6}>
          <Card>
            <Card.Header>
              {/* <h4 className="card-title">Line</h4> */}
            </Card.Header>
            <Card.Body>
              <ApexRedialBar2 />
            </Card.Body>
          </Card>
        </Col>

        <Col xl={6} lg={6}>
          <Card>
            <Card.Header>
              {/* <h4 className="card-title">Area</h4> */}
            </Card.Header>
            <Card.Body>
              <ApexPie4 />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* <Row>
        <Col lg={6}>
          <DonutChart
            value="70"
            backgroundColor="#00a15d"
            backgroundColor2="rgba(238, 238, 237, 1)"
          />
        </Col>

        <Col lg={6}>
          <DonutChart
            value="70"
            backgroundColor="#00a15d"
            backgroundColor2="rgba(238, 238, 237, 1)"
          />
        </Col>
      </Row> */}

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
                    <strong>Profit</strong>
                  </th>
                  <th>
                    <strong>Loss</strong>
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
                  <td>$1220</td>
                  <td>$-20</td>
                  <td>$210</td>

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
                  <td>-$120</td>
                  <td>$1200</td>

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
                  <td>$120</td>
                  <td>-$120</td>
                  <td>$2000</td>

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
