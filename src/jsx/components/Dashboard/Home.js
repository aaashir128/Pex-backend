import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import { Dropdown } from "react-bootstrap";
import DonutChart from "./Dashboard/DonutChart";
import { Button } from "react-bootstrap";
//Images
import pic3 from "./../../../images/profile/small/pic3.jpg";
import pic4 from "./../../../images/profile/small/pic4.jpg";
import pic5 from "./../../../images/profile/small/pic5.jpg";
import pic6 from "./../../../images/profile/small/pic6.jpg";
import pic7 from "./../../../images/profile/small/pic7.jpg";

//Import Components
import { ThemeContext } from "../../../context/ThemeContext";
import CurrentBalance from "./Dashboard/CurrentBalance";
import ProjectSlider from "./Dashboard/ProjectSlider";
import AppProfile from "../AppsMenu/AppProfile/AppProfile";
import Watchlist from "../AppsMenu/AppProfile/Watchlist";
import TransactionHistory from "../AppsMenu/AppProfile/TransactionHistory";
import axios from "axios";
import { baseURL } from "../../../Strings/Strings";

const ChartBarApex = loadable(() =>
  pMinDelay(import("./Dashboard/ChartBarApex"), 1000)
);
const ReservationChart = loadable(() =>
  pMinDelay(import("./Dashboard/ReservationChart"), 1000)
);
const RedialApex = loadable(() =>
  pMinDelay(import("./Dashboard/RedialApex"), 1000)
);
const NewCustomers = loadable(() =>
  pMinDelay(import("./Dashboard/NewCustomers"), 1000)
);
const NewProject = loadable(() =>
  pMinDelay(import("./Dashboard/NewProject"), 1000)
);
const Emailchart = loadable(() =>
  pMinDelay(import("./Dashboard/Emailchart"), 1000)
);

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
      <Dropdown.Menu className="dropdown-menu dropdown-menu-right" alignRight>
        <Dropdown.Item>Delete</Dropdown.Item>
        <Dropdown.Item>Edit</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

const MessageBlog = [
  { image: pic6, title: "Maren Rosser" },
  { image: pic4, title: "Kaiya Bergson" },
  { image: pic3, title: "Ruben Press" },
  { image: pic7, title: "Cristofer Torff" },
  { image: pic5, title: "Ann Rosser" },
];

const Home = (props) => {
  const { changeBackground } = useContext(ThemeContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    changeBackground({ value: "light", label: "Light" });
    let usr = localStorage.getItem("user");
    usr = JSON.parse(usr);
    axios.get(`${baseURL}api/wallet/${usr?.id}`).then((res) => {
      console.log(res, "res");
      setData(res.data.wallet);
    });
  }, [props.history]);
  return (
    <>
      <div className="row">
        <div className="col-xl-12">
          <div className="row">
            <div className="col-xl-12">
              <div className="row">
                <div className="col-xl-6 col-md-12 col-xxl-12">
                  <div className="card" id="user-activity">
                    <div className="card-header border-0 pb-0 flex-wrap">
                      <div>
                        <span className="mb-0 d-block fs-22">
                          <strong>Welcome Back!</strong>
                        </span>
                        <span className="mb-3 d-block fs-18">
                          Portfolio Value
                        </span>
                        <h2 className="fs-30 font-w700 mb-3">
                          $ {data?.balance?.toFixed(2)}
                        </h2>
                        <Button className="btn btn-primary mb-0 ms-0 px-4">
                          Portfolio
                        </Button>
                      </div>
                    </div>
                    <br />
                    <div className="col-xl-12">
                      <div className="card-body pt-0">
                        <ProjectSlider />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-12 col-md-12">
                <div className="row">
                  <div className="col-xl-8 col-lg-8 col-md-8 ">
                    <TransactionHistory />
                  </div>
                  <div className="card col-xl-4 col-lg-4 col-md-4 ">
                    <ChartBarApex />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
