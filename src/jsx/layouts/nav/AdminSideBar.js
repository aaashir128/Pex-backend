/// Menu
import Metismenu from "metismenujs";
import React, { Component, useContext, useEffect, useState } from "react";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
/// Link
import { Link } from "react-router-dom";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { ThemeContext } from "../../../context/ThemeContext";
// import watchListIcon from "../../../icons/sidebar/watchlist.png";

class MM extends Component {
  componentDidMount() {
    this.$el = this.el;
    this.mm = new Metismenu(this.$el);
  }
  componentWillUnmount() {}
  render() {
    return (
      <div className="mm-wrapper">
        <ul className="metismenu" ref={(el) => (this.el = el)}>
          {this.props.children}
        </ul>
      </div>
    );
  }
}

const AdminSideBar = () => {
  const { iconHover, sidebarposition, headerposition, sidebarLayout } =
    useContext(ThemeContext);
  useEffect(() => {
    var btn = document.querySelector(".nav-control");
    var aaa = document.querySelector("#main-wrapper");
    function toggleFunc() {
      return aaa.classList.toggle("menu-toggle");
    }
    btn.addEventListener("click", toggleFunc);

    //sidebar icon Heart blast
    var handleheartBlast = document.querySelector(".heart");
    function heartBlast() {
      return handleheartBlast.classList.toggle("heart-blast");
    }
    handleheartBlast.addEventListener("click", heartBlast);
  }, []);

  // For scroll
  const [hideOnScroll, setHideOnScroll] = useState(true);
  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y > prevPos.y;
      if (isShow !== hideOnScroll) setHideOnScroll(isShow);
    },
    [hideOnScroll]
  );

  //let scrollPosition = useScrollPosition();

  /// Path
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];
  /// Active menu
  let deshBoard = ["dashboard"],
    withdrawalRequests = ["withdrawal-requests"],
    depositRequests = ["deposit-requests"],
    deposit = ["deposit"],
    userManagement = ["user-management"],
    commissionSettings = ["commission-settings"],
    plManagement = ["pl-management"],
    manageCoins = ["manage-coins"],
    portfolio = ["portfolio"],
    shop = ["ecom-product-detail"],
    pages = ["page-register"];

  return (
    <div
      className={`dlabnav ${iconHover} ${
        sidebarposition.value === "fixed" &&
        sidebarLayout.value === "horizontal" &&
        headerposition.value === "static"
          ? hideOnScroll > 120
            ? "fixed"
            : ""
          : ""
      }`}
    >
      <PerfectScrollbar className="dlabnav-scroll">
        <MM className="metismenu" id="menu">
          <li className={`${deshBoard.includes(path) ? "mm-active" : ""}`}>
            <Link className="ai-icon " to="admin-dashboard">
              <i className="fas fa-home"></i>

              <span className="nav-text">Dashboard </span>
            </Link>
          </li>
          <ul>
            {/* <li>
              <Link
                className={`${path === "dashboard" ? "mm-active" : ""}`}
                to="/admin-dashboard"
              >
                {" "}
                Admin Dashboard
              </Link>
            </li>
            <li>
              <Link
                className={`${path === "dashboard-dark" ? "mm-active" : ""}`}
                to="/dashboard-dark"
              >
                {" "}
                Dashboard Dark
              </Link>
            </li> */}
            {/* <li><Link className={`${path === "kanban" ? "mm-active" : ""}`} to="/kanban">Kanban</Link></li>
              <li><Link className={`${path === "clients" ? "mm-active" : ""}`} to="/clients">Clients</Link></li>
              <li><Link className={`${path === "project-details" ? "mm-active" : ""}`} to="/project-details">Project Details</Link></li>
              <li><Link className={`${path === "messages" ? "mm-active" : ""}`} to="/messages">Messages</Link></li>
              <li><Link className={`${path === "latest-activity" ? "mm-active" : ""}`} to="/latest-activity">Latest Activity</Link></li>
              <li><Link className={`${path === "task" ? "mm-active" : ""}`} to="/task">Task</Link></li>  */}
          </ul>
          <li className={`${userManagement.includes(path) ? "mm-active" : ""}`}>
            <Link className="ai-icon " to="/user-management">
              <i className="fas fa-users"></i>
              <span className="nav-text">User Managment</span>
            </Link>
          </li>
          <ul>
            {/* <li>
                <Link
                  className={`${path === "dashboard" ? "mm-active" : ""}`}
                  to="/dashboard"
                >
                  {" "}
                  Dashboard Light
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "dashboard-dark" ? "mm-active" : ""}`}
                  to="/dashboard-dark"
                >
                  {" "}
                  Dashboard Dark
                </Link>
              </li> */}
            {/* <li><Link className={`${path === "kanban" ? "mm-active" : ""}`} to="/kanban">Kanban</Link></li>
              <li><Link className={`${path === "clients" ? "mm-active" : ""}`} to="/clients">Clients</Link></li>
              <li><Link className={`${path === "project-details" ? "mm-active" : ""}`} to="/project-details">Project Details</Link></li>
              <li><Link className={`${path === "messages" ? "mm-active" : ""}`} to="/messages">Messages</Link></li>
              <li><Link className={`${path === "latest-activity" ? "mm-active" : ""}`} to="/latest-activity">Latest Activity</Link></li>
              <li><Link className={`${path === "task" ? "mm-active" : ""}`} to="/task">Task</Link></li>  */}
          </ul>

          <li className={`${manageCoins.includes(path) ? "mm-active" : ""}`}>
            <Link className="ai-icon " to="/manage-coins">
              <i class="fas fa-coins"></i>
              <span className="nav-text">Manage Coins</span>
            </Link>
          </li>
          <ul>
            {/* <li>
                <Link
                  className={`${path === "app-profile" ? "mm-active" : ""}`}
                  to="/app-profile"
                >
                  Profile
                </Link>
              </li> */}
            {/* <li>
                <Link
                  className={`${path === "post-details" ? "mm-active" : ""}`}
                  to="/post-details"
                >
                  Post Details
                </Link>
              </li> */}
            {/* <li className={`${email.includes(path) ? "mm-active" : ""}`}>
                <Link className="has-arrow" to="#">
                  Email
                </Link>
                <ul className={`${email.includes(path) ? "mm-show" : ""}`}>
                  <li>
                    <Link
                      className={`${
                        path === "email-compose" ? "mm-active" : ""
                      }`}
                      to="/email-compose"
                    >
                      Compose
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${path === "email-inbox" ? "mm-active" : ""}`}
                      to="/email-inbox"
                    >
                      Inbox
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${path === "email-read" ? "mm-active" : ""}`}
                      to="/email-read"
                    >
                      Read
                    </Link>
                  </li>
                </ul>
              </li> */}
            {/* <li>
                <Link
                  className={`${path === "app-calender" ? "mm-active" : ""}`}
                  to="/app-calender"
                >
                  Calendar
                </Link>
              </li> */}
            <li className={`${shop.includes(path) ? "mm-active" : ""}`}>
              {/* <Link className="has-arrow" to="#">
                  Shop
                </Link> */}
              <ul className={`${shop.includes(path) ? "mm-show" : ""}`}>
                <li>
                  <Link
                    className={`${
                      path === "ecom-product-grid" ? "mm-active" : ""
                    }`}
                    to="/ecom-product-grid"
                  >
                    Product Grid
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${
                      path === "ecom-product-list" ? "mm-active" : ""
                    }`}
                    to="/ecom-product-list"
                  >
                    Product List
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${
                      path === "ecom-product-detail" ? "mm-active" : ""
                    }`}
                    to="/ecom-product-detail"
                  >
                    Product Details
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${
                      path === "ecom-product-order" ? "mm-active" : ""
                    }`}
                    to="/ecom-product-order"
                  >
                    Order
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${path === "ecom-checkout" ? "mm-active" : ""}`}
                    to="/ecom-checkout"
                  >
                    Checkout
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${path === "ecom-invoice" ? "mm-active" : ""}`}
                    to="/ecom-invoice"
                  >
                    Invoice
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${
                      path === "ecom-customers" ? "mm-active" : ""
                    }`}
                    to="/ecom-customers"
                  >
                    Customers
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

          <li
            className={`${depositRequests.includes(path) ? "mm-active" : ""}`}
          >
            <Link className="ai-icon " to="/deposit-requests">
              {/* <i className="fas fa-coins"></i> */}
              <i class="fas fa-file-invoice-dollar"></i>
              <span className="nav-text">Deposit Requests</span>
            </Link>
          </li>
          <ul>
            {/* <li>
                <Link
                  className={`${path === "app-profile" ? "mm-active" : ""}`}
                  to="/app-profile"
                >
                  Profile
                </Link>
              </li> */}
            {/* <li>
                <Link
                  className={`${path === "post-details" ? "mm-active" : ""}`}
                  to="/post-details"
                >
                  Post Details
                </Link>
              </li> */}
            {/* <li className={`${email.includes(path) ? "mm-active" : ""}`}>
                <Link className="has-arrow" to="#">
                  Email
                </Link>
                <ul className={`${email.includes(path) ? "mm-show" : ""}`}>
                  <li>
                    <Link
                      className={`${
                        path === "email-compose" ? "mm-active" : ""
                      }`}
                      to="/email-compose"
                    >
                      Compose
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${path === "email-inbox" ? "mm-active" : ""}`}
                      to="/email-inbox"
                    >
                      Inbox
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${path === "email-read" ? "mm-active" : ""}`}
                      to="/email-read"
                    >
                      Read
                    </Link>
                  </li>
                </ul>
              </li> */}
            {/* <li>
                <Link
                  className={`${path === "app-calender" ? "mm-active" : ""}`}
                  to="/app-calender"
                >
                  Calendar
                </Link>
              </li> */}
            <li className={`${shop.includes(path) ? "mm-active" : ""}`}>
              {/* <Link className="has-arrow" to="#">
                  Shop
                </Link> */}
              <ul className={`${shop.includes(path) ? "mm-show" : ""}`}>
                <li>
                  <Link
                    className={`${
                      path === "ecom-product-grid" ? "mm-active" : ""
                    }`}
                    to="/ecom-product-grid"
                  >
                    Product Grid
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${
                      path === "ecom-product-list" ? "mm-active" : ""
                    }`}
                    to="/ecom-product-list"
                  >
                    Product List
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${
                      path === "ecom-product-detail" ? "mm-active" : ""
                    }`}
                    to="/ecom-product-detail"
                  >
                    Product Details
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${
                      path === "ecom-product-order" ? "mm-active" : ""
                    }`}
                    to="/ecom-product-order"
                  >
                    Order
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${path === "ecom-checkout" ? "mm-active" : ""}`}
                    to="/ecom-checkout"
                  >
                    Checkout
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${path === "ecom-invoice" ? "mm-active" : ""}`}
                    to="/ecom-invoice"
                  >
                    Invoice
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${
                      path === "ecom-customers" ? "mm-active" : ""
                    }`}
                    to="/ecom-customers"
                  >
                    Customers
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          {/* </li> */}

          {/* li for Watchlist */}
          <li
            className={`${
              withdrawalRequests.includes(path) ? "mm-active" : ""
            }`}
          >
            <Link className="ai-icon" to="/withdrawal-requests">
              <i className="fas fa-dollar-sign"></i>
              <span className="nav-text">Withdrawal Requests</span>
            </Link>
          </li>
          <li className={`${plManagement.includes(path) ? "mm-active" : ""}`}>
            <Link to="pl-management" className="ai-icon ">
              <i class="fas fa-chart-pie"></i>
              <span className="nav-text">P/L Management</span>
            </Link>
          </li>
          <li
            className={`${
              commissionSettings.includes(path) ? "mm-active" : ""
            }`}
          >
            <Link className="ai-icon " to="/commission-settings">
              {/* <i class="fas fa-percentage"></i> */}
              <i class="fas fa-cogs"></i>
              <span className="nav-text">Settings</span>
            </Link>
          </li>
        </MM>
        <div className="plus-box">
          <div className="text-center">
            {/* <h4 className="fs-18 font-w600 mb-3">
              Enable Workload Automation System
            </h4> */}
          </div>
        </div>
        <div className="copyright">
          <p>
            <strong>Prime Crypto Exchange</strong> © 2022 All Rights Reserved
          </p>
          <p className="fs-12">
            <span className="heart" style={{ display: "none" }}></span>
          </p>
        </div>
      </PerfectScrollbar>
    </div>
  );
};

export default AdminSideBar;
