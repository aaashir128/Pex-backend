import React, { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { connect, useDispatch } from "react-redux";
import {
  loadingToggleAction,
  loginConfirmedAction,
  signupAction,
} from "../../store/actions/AuthActions";
// image
import logo from "../../images/logo-full.png";
import axios from "axios";
import { baseURL } from "../../Strings/Strings";
import ERModal from "../components/modals/ERModal";

function Register(props) {
  const [email, setEmail] = useState("");
  let errorsObj = { email: "", password: "" };
  const [errors, setErrors] = useState(errorsObj);
  const [password, setPassword] = useState("");
  const [op, setop] = useState(false)
  const [hd, sethd] = useState("")
  const [msg, setmsg] = useState("")

  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    emailCheck: true,
    passwordCheck: true,
    confirmPasswordCheck: true,
  });

  const showModal = (hd,msg) => {
    setop(true)
    sethd(hd)
    setmsg(msg)
  }

  const onSignUp = (e) => {
    e.preventDefault();
    if (user.firstName.length < 2) {
      swal("First name not valid");
      // alert.show("First name not valid");
    } else if (user.lastName.length < 2) {
      swal("Last name not valid");
      // alert.show("Last name not valid");
    } else if (!user.emailCheck) {
      swal("Email not valid");
      // alert.show("Email not valid");
    } else if (!user.password) {
      swal("Password not valid");
      // alert.show("Password invalid");
      swal("Confirm Password not valid");
    } else if (!(user.password === user.confirmPassword)) {
      // alert.show("Confirm Password invalid");
    }
    // else if (emailExist) {
    //   alert.show("Cannot Signup using existing Email");
    // }
    else {
      callSignUpApi();
    }
  };
  const callSignUpApi = () => {
    showModal("Loading...","loading...")
    const params = {
      email: user.email,
      first_name: user.firstName,
      last_name: user.lastName,
      password: user.password,
      user_name: user.firstName + user.lastName,
    };
    console.log("params", params);
    axios.post(`${baseURL}/api/user/register`, params).then((res) => {
      console.log(res, "res");
      dispatch(loginConfirmedAction(res.data.user));
      localStorage.setItem("user", JSON.stringify(res.data.user));
      props.history.push("/login");
    //   window.location.replace("/dashboard");
    }).catch(e=>{
      showModal("Error Occurd!",e.response.data ? e.response.data : "Unknown Error Occured!" )
    });
  };

  const updatePassword = (e) => {
    const result = validatePassword(e);
    if (result) {
      console.log("Password is Valid ");
    } else {
      console.log("Password is invalid ");
    }

    setUser({
      ...user,
      password: e,
    });
  };

  const validateEmail = (text) => {
    // console.log(text);
    let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      // console.log("Email is Not Correct");
      return false;
    } else {
      // console.log("Email is Correct");
      return true;
    }
  };

  const validatePassword = (text) => {
    // console.log(text);
    let reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (reg.test(text) === false) {
      // console.log("Email is Not Correct");
      return false;
    } else {
      // console.log("Email is Correct");
      return true;
    }
  };
  const validateConfirmPassword = () => {
    if (!(user.password === user.confirmPassword)) {
      return false;
    } else {
      return true;
    }
  };

  const focusChangePassword = () => {
    console.log("Focus Changed", user.password);

    const result = validatePassword(user.password);

    setUser({
      ...user,
      passwordCheck: result,
    });
  };

  const focusChangeConfirmPassword = () => {
    console.log("Focus Changed Confirm");

    const result = validateConfirmPassword();
    console.log(result);
    setUser({
      ...user,
      confirmPasswordCheck: result,
    });
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const toggleConfirmPassword = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  const dispatch = useDispatch();

  // function onSignUp(e) {
  //   e.preventDefault();
  //   let error = false;
  //   const errorObj = { ...errorsObj };
  //   if (email === "") {
  //     errorObj.email = "Email is Required";
  //     error = true;
  //     swal("Oops", errorObj.email, "error");
  //   }
  //   if (password === "") {
  //     errorObj.password = "Password is Required";
  //     error = true;
  //     swal("Oops", errorObj.password, "error");
  //   }
  //   setErrors(errorObj);
  //   if (error) return;
  //   dispatch(loadingToggleAction(true));
  //   dispatch(signupAction(email, password, props.history));
  // }

  return (
    <div className="authincation h-100 p-meddle">
      <ERModal op={op} setop={setop} head={hd} msg={msg} />
      <div className="container h-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <div className="text-center mb-3">
                      <Link to="/login">
                        <img style={{ width: "150px" }} src={logo} alt="" />
                      </Link>
                    </div>
                    <h4 className="text-center mb-4 ">Sign up your account</h4>
                    {props.errorMessage && (
                      <div className="">{props.errorMessage}</div>
                    )}
                    {props.successMessage && (
                      <div className="">{props.successMessage}</div>
                    )}
                    <form onSubmit={onSignUp}>
                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>First Name</strong>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="First Name"
                          value={user.firstName}
                          onChange={(e) =>
                            setUser({ ...user, firstName: e.target.value })
                          }
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Last Name</strong>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Last Name"
                          value={user.lastName}
                          onChange={(e) =>
                            setUser({
                              ...user,
                              lastName: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Email</strong>
                        </label>
                        <input
                          value={user.email}
                          onChange={(e) =>
                            setUser({
                              ...user,
                              email: e.target.value,
                            })
                          }
                          className="form-control"
                          placeholder="Email"
                        />
                      </div>
                      {errors.email && <div>{errors.email}</div>}
                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Password</strong>
                        </label>
                        <input
                          value={user.password}
                          onChange={(e) => updatePassword(e.target.value)}
                          onBlur={() => focusChangePassword()}
                          className="form-control"
                          placeholder="***"
                          type={passwordShown ? "text" : "password"}
                        />

                        {/* <Visibility onClick={togglePassword} />
                        {!user.passwordCheck && (
                          <Error style={{ color: "red" }} />
                        )} */}
                      </div>

                      {!user.passwordCheck && (
                        <h5 className="emailError" style={{ color: "red" }}>
                          Password needs atleast 8 characters, 1 number, 1
                          symbol, 1 uppercase and 1 lowercase
                        </h5>
                      )}

                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Confirm Password</strong>
                        </label>
                        <input
                          value={user.confirmPassword}
                          onBlur={focusChangeConfirmPassword}
                          onChange={(e) =>
                            setUser({
                              ...user,
                              confirmPassword: e.target.value,
                            })
                          }
                          className="form-control"
                          placeholder="***"
                          type={confirmPasswordShown ? "text" : "password"}
                        />
                        {/* <Visibility onClick={toggleConfirmPassword} />
                        {!user.confirmPasswordCheck && (
                          <Error style={{ color: "red" }} />
                        )} */}
                      </div>
                      {!user.confirmPasswordCheck && (
                        <h5 className="emailError" style={{ color: "red" }}>
                          Password does not match
                        </h5>
                      )}
                      {errors.password && <div>{errors.password}</div>}
                      <div className="text-center mt-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                        >
                          Sign me up
                        </button>
                      </div>
                    </form>
                    <div className="new-account mt-3">
                      <p className="">
                        Already have an account?{" "}
                        <Link className="text-primary" to="/login">
                          Sign in
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

export default connect(mapStateToProps)(Register);
