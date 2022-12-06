import React, { Fragment, useContext, useState } from "react";
/// React router dom
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../context/ThemeContext";
import logo from "../../../images/logo-full.png";

const NavHader = () => {
  const [toggle, setToggle] = useState(false);
  const { navigationHader, openMenuToggle, background } =
    useContext(ThemeContext);
  return (
    <div className="nav-header">
      <Link to="/dashboard" className="brand-logo">
        {/* {background.value === "dark" || navigationHader !== "color_1" ? (
          <Fragment>
            <img src={logo} className="logo-abbr"width="350"></img>
            <div className="brand-title">
              <h2 className="">Prime</h2>
              <span className="brand-sub-title">Crypto Exchange</span>
            </div>
          </Fragment>
        ) : ( */}
          <Fragment>
            <img src={logo} className="logo-abbr center"></img>
            {/* <div className="brand-title">
              <h2 className="">Prime</h2>
              <span className="brand-sub-title">Crypto Exchange</span>
            </div> */}
          </Fragment>
        {/* )} */}
      </Link>

      <div
        className="nav-control"
        onClick={() => {
          setToggle(!toggle);
          openMenuToggle();
        }}
      >
        <div className={`hamburger ${toggle ? "is-active" : ""}`}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </div>
    </div>
  );
};

export default NavHader;
