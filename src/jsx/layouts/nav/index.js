import React, { Fragment, useState } from "react";
import SideBar from "./SideBar";
import NavHader from "./NavHader";
import Header from "./Header";
// import ChatBox from "../ChatBox";
import AdminSideBar from "./AdminSideBar";

const JobieNav = ({ title, onClick: ClickToAddEvent, onClick2, onClick3 }) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const [toggle, setToggle] = useState("");
  const onClick = (name) => setToggle(toggle === name ? "" : name);
  return (
    <Fragment>
      <NavHader />
      {/* <ChatBox onClick={() => onClick("chatbox")} toggle={toggle} /> */}
      <Header
        onNote={() => onClick("chatbox")}
        onNotification={() => onClick("notification")}
        onProfile={() => onClick("profile")}
        toggle={toggle}
        title={title}
        onBox={() => onClick("box")}
        onClick={() => ClickToAddEvent()}
      />
      {
        user?.is_admin == 1 ? <AdminSideBar /> : <SideBar />
      }
      
      
    </Fragment>
  );
};

export default JobieNav;
