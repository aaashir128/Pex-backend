// import { Edit } from "@mui/icons-material";
import axios from "axios";
import React, { Fragment, useRef, useState } from "react";
// import { Button, Dropdown, Modal } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { SRLWrapper } from "simple-react-lightbox";
import { ToastContainer, toast } from "react-toastify";
// import LogoutPage from "../../layouts/nav/Logout";

//** Import Image */

import profile from "../../../images/profile/profile.png";
import { baseURL } from "../../../Strings/Strings";
import PageTitle from "../../layouts/PageTitle";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/actions/AuthActions";

const Profile = (props) => {
  const dispatch = useDispatch();

  function onLogout() {
    dispatch(logout(props.history));
    // window.location.reload();
  }
  const inputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(null);
  const [profilePassword, setProfilePassword] = useState({
    oldPassword: "",
    newPassword: "",
    passwordCheck: true,
  });
  const [profileInfo, setProfileInfo] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    contact: "",
    email: "",
  });

  console.log("props", props);

  let usr = localStorage.getItem("user");
  usr = JSON.parse(usr);
  console.log("usr", usr);

  const validatePassword = (text) => {
    // console.log(text);
    let reg =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[,./#?!@$%^&*-]).{8,}$/;
    if (reg.test(text) === false) {
      // console.log("Email is Not Correct");
      return false;
    } else {
      // console.log("Email is Correct");
      return true;
    }
  };

  const updatePasswordField = (e) => {
    const result = validatePassword(e);
    if (result) {
      console.log("Password is Valid ");
    } else {
      console.log("Password is invalid ");
    }

    setProfilePassword({
      ...profilePassword,
      newPassword: e,
    });
  };

  const focusChangePassword = () => {
    const result = validatePassword(profilePassword.newPassword);

    setProfilePassword({
      ...profilePassword,
      passwordCheck: result,
    });
  };

  const updateInfo = async (e) => {
    e.preventDefault();
    let token = await localStorage.getItem("token");
    token = JSON.parse(token);
    console.log("token", token);

    const postData = {
      user_name: profileInfo.userName,
      first_name: profileInfo.firstName,
      last_name: profileInfo.lastName,
      contact: profileInfo.contact,
      email: profileInfo.email,
    };
    console.log("postData", postData);
    axios
      .put(`${baseURL}/api/profile/${usr.id}`, postData, {
        headers: { "x-auth-token": token },
      })
      .then((res) => {
        console.log(res, "res");
        toast.success("✔️ Profile Updated! Logging out", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          onClose: () => onLogout(),
        });
      })
      .catch((err) => {
        console.log("err", err.response.data);
        toast.error(`❌ ${err.response.data}!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          //   onClose: () => props.history.push("/dashboard"),
        });
      });
  };
  const updatePassword = async (e) => {
    e.preventDefault();
    let token = await localStorage.getItem("token");
    token = JSON.parse(token);
    console.log("token", token);

    let usr = await localStorage.getItem("user");
    usr = JSON.parse(usr);
    console.log("usr", usr);

    const postData = {
      password: profilePassword.oldPassword,
      new_password: profilePassword.newPassword,
    };
    console.log("postData", postData);
    axios
      .put(`${baseURL}/api/profile/passwordchange/${usr.id}`, postData, {
        headers: { "x-auth-token": token },
      })
      .then((res) => {
        console.log(res, "res");
        toast.success("✔️ Password Updated! Logging out", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          onClose: () => onLogout(),
        });
      })
      .catch((err) => {
        console.log("err", err.response.data);
        toast.error(`❌ ${err.response.data}!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          //   onClose: () => props.history.push("/dashboard"),
        });
      });
  };

  return (
    <Fragment>
      <PageTitle activeMenu="Profile" motherMenu="App" />

      <div className="row">
        <div className="col-lg-12">
          <div className="profile card card-body px-3 pt-3 pb-0">
            <div className="profile-head">
              <div className="photo-content ">
                <div className="cover-photo rounded"></div>
              </div>
              <div className="profile-info">
                <div className="profile-photo">
                  <img
                    src={profile}
                    className="img-fluid rounded-circle"
                    alt="profile"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-12 col-lg-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Update Profile</h4>
          </div>
          <div className="card-body">
            <div className="basic-form">
              <form onSubmit={updateInfo}>
                <div className="row">
                  <div className="form-group mb-3 col-md-6">
                    <h5>First Name</h5>
                    <input
                      value={profileInfo.firstName}
                      onChange={(e) =>
                        setProfileInfo({
                          ...profileInfo,
                          firstName: e.target.value,
                        })
                      }
                      type="text"
                      className="form-control"
                      placeholder="John"
                    />
                  </div>
                  <div className="form-group mb-3 col-md-6">
                    <h5>Last Name</h5>
                    <input
                      value={profileInfo.lastName}
                      onChange={(e) =>
                        setProfileInfo({
                          ...profileInfo,
                          lastName: e.target.value,
                        })
                      }
                      type="text"
                      className="form-control"
                      placeholder="Doe"
                    />
                  </div>
                  <div className="form-group mb-3 col-md-6">
                    <h5>Username</h5>
                    <input
                      value={profileInfo.userName}
                      onChange={(e) =>
                        setProfileInfo({
                          ...profileInfo,
                          userName: e.target.value,
                        })
                      }
                      type="text"
                      className="form-control"
                      placeholder="Jodoe"
                    />
                  </div>
                  <div className="form-group mb-3 col-md-6">
                    <h5>Contact</h5>
                    <input
                      value={profileInfo.contact}
                      onChange={(e) =>
                        setProfileInfo({
                          ...profileInfo,
                          contact: e.target.value,
                        })
                      }
                      type="number"
                      className="form-control"
                      placeholder="+1 234 468"
                    />
                  </div>
                  <div className="form-group mb-3 col-md-6">
                    <h5>Email</h5>
                    <input
                      value={profileInfo.email}
                      onChange={(e) =>
                        setProfileInfo({
                          ...profileInfo,
                          email: e.target.value,
                        })
                      }
                      type="email"
                      className="form-control"
                      placeholder="jodoe@gsc.com"
                    />
                  </div>
                </div>

                <div className="text-center my-4">
                  <button
                    type="submit"
                    className="btn btn-primary text-center w-25"
                  >
                    Update
                  </button>
                </div>
              </form>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-12 col-lg-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Update Password</h4>
          </div>
          <div className="card-body">
            <div className="basic-form">
              <form onSubmit={updatePassword}>
                <div className="row">
                  <div className="form-group mb-3 col-md-6">
                    <h5>Old Password</h5>
                    <input
                      value={profilePassword.oldPassword}
                      onChange={(e) =>
                        setProfilePassword({
                          ...profileInfo,
                          oldPassword: e.target.value,
                        })
                      }
                      type="password"
                      className="form-control"
                      placeholder="***"
                    />
                  </div>
                  <div className="form-group mb-3 col-md-6">
                    <h5>New Password</h5>
                    <input
                      onChange={(e) => updatePasswordField(e.target.value)}
                      onBlur={() => focusChangePassword()}
                      value={profilePassword.newPassword}
                      type="password"
                      className="form-control"
                      placeholder="***"
                    />
                  </div>
                  {!profilePassword.passwordCheck && (
                    <h5 className="emailError" style={{ color: "red" }}>
                      Password needs atleast 8 characters, 1 number, 1 symbol, 1
                      uppercase and 1 lowercase
                    </h5>
                  )}
                </div>

                <div className="text-center my-4">
                  <button
                    type="submit"
                    className="btn btn-primary text-center w-25"
                  >
                    Update Password
                  </button>
                </div>
              </form>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;