import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import {
  loadingToggleAction,
  loginAction,
  loginConfirmedAction,
} from "../../store/actions/AuthActions";

// image
import logo from "../../images/logo-full.png";
import loginbg from "../../images/pic1.png";
import tradingPic from "../../images/trading.webp";
import axios from "axios";
import { baseURL } from "../../Strings/Strings";
import { auth, provider } from "../../services/Firebase";

function Login(props) {
  const [email, setEmail] = useState("johnsmith@gmail.com");
  // const [email, setEmail] = useState("demo@example.com");
  let errorsObj = { email: "", password: "" };
  const [errors, setErrors] = useState(errorsObj);
  const [password, setPassword] = useState("example123");
  // const [password, setPassword] = useState("123456");

  const dispatch = useDispatch();

  function onLogin(e) {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (email === "") {
      errorObj.email = "Email is Required";
      error = true;
    }
    if (password === "") {
      errorObj.password = "Password is Required";
      error = true;
    }
    setErrors(errorObj);
    if (error) {
      return;
    }
    dispatch(loadingToggleAction(true));
    // dispatch(loginAction(email, password, props.history));

    const postData = {
      email,
      password,
    };
    axios.post(`${baseURL}/api/user/login`, postData).then((res) => {
      //   console.log(res, "res");
      const user = jwt_decode(res?.data?.access);
      const token = res?.data?.access
      console.log(user, "user");
      console.log(token, "token");
      dispatch(loginConfirmedAction(user));
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(token));
      if (user?.is_admin == 1) {
        props.history.push("/admin-dashboard");
        window.location.replace("/admin-dashboard");

      } else {
        props.history.push("/dashboard");
        window.location.replace("/dashboard");

      }

    });
  }

  //   const signInGoogle = () => {
  //     auth
  //       .signInWithPopup(provider)
  //       .then((result) => {
  //         var fullName = result.user.displayName.split(" ");
  //         let userData = {
  //           email: result.user.email,
  //           id: result.user.uid,
  //           displayName: result.user.displayName,
  //           firstName: fullName[0],
  //           lastName: fullName[1],
  //         };

  //         dispatch(loginConfirmedAction(userData));
  //         localStorage.setItem("user", JSON.stringify(userData));
  //         props.history.push("/dashboard");
  //         console.log("userData", userData);
  //         console.log(result.user);
  //       })
  //       .catch((error) => {
  //         alert(error.message);
  //       });
  //     // Google sign in
  //   };

  return (
    <div className="authincation d-flex flex-column flex-lg-row flex-column-fluid">
      <div className="login-aside text-center  d-flex flex-column flex-row-auto">
        <div className="d-flex flex-column-auto flex-column pt-lg-40 pt-15">
          <div className="text-center mb-4 pt-5">
            <img src={logo} width="100" alt="" />
          </div>
          <h3 className="mb-2">Welcome back!</h3>
          <p>
            User Experience & Interface Design <br />
            Strategy SaaS Solutions
          </p>
        </div>
        <div
          className="aside-image"
          style={{ backgroundImage: "url(" + tradingPic + ")" }}
        ></div>
      </div>
      <div className="container flex-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden p-7 mx-auto">
        <div className="d-flex justify-content-center h-100 align-items-center">
          <div className="authincation-content style-2">
            <div className="row no-gutters">
              <div className="col-xl-12 tab-content">
                <div id="sign-in" className="auth-form   form-validation">
                  {props.errorMessage && (
                    <div className="bg-red-300 text-red-900 border border-red-900 p-1 my-2">
                      {props.errorMessage}
                    </div>
                  )}
                  {props.successMessage && (
                    <div className="bg-green-300 text-green-900 border border-green-900 p-1 my-2">
                      {props.successMessage}
                    </div>
                  )}
                  <form onSubmit={onLogin} className="form-validate">
                    <h3 className="text-center mb-4 text-black">
                      Sign in your account
                    </h3>
                    <div className="form-group mb-3">
                      <label className="mb-1" htmlFor="val-email">
                        <strong>Email</strong>
                      </label>
                      <div>
                        <input
                          type="email"
                          className="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Type Your Email Address"
                        />
                      </div>
                      {errors.email && (
                        <div className="text-danger fs-12">{errors.email}</div>
                      )}
                    </div>
                    <div className="form-group mb-3">
                      <label className="mb-1">
                        <strong>Password</strong>
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        value={password}
                        placeholder="Type Your Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {errors.password && (
                        <div className="text-danger fs-12">
                          {errors.password}
                        </div>
                      )}
                    </div>
                    <div className="form-row d-flex justify-content-between mt-4 mb-2">
                      <div className="form-group mb-3">
                        <div className="custom-control custom-checkbox ml-1">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="basic_checkbox_1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                          >
                            Remember my preference
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="text-center form-group mb-3">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                        Sign In
                      </button>
                    </div>
                  </form>

                  {/* <div className="text-center form-group mb-3">
                    <button
                      onClick={signInGoogle}
                      className="btn btn-secondary btn-block"
                    >
                      Sign In With GOOGLE
                    </button>
                  </div> */}
                  <div className="new-account mt-3">
                    <p>
                      Don't have an account?{" "}
                      <Link className="text-primary" to="./page-register">
                        Sign up
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};
export default connect(mapStateToProps)(Login);
