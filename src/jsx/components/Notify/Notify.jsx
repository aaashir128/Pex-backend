import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import ProjectSlider from "../Dashboard/Dashboard/ProjectSlider";
import { ToastContainer, toast } from "react-toastify";
import PageTitle from "../../layouts/PageTitle";
import axios from "axios";
import { baseURL } from "../../../Strings/Strings";
import ERModal from "../modals/ERModal";

function Notify(props) {
    const [op, setop] = useState(false)
    const [hd, sethd] = useState("")
    const [msg, setmsg] = useState("")
    const [amount, setAmount] = useState("");

    const notifyTopRight = async (e) => {
        e.preventDefault();

        showModal("Loading...", "Loading...")

        if (amount.length > 0) {
            let usr = await localStorage.getItem("user");
            usr = JSON.parse(usr);
            let token = await localStorage.getItem("token");
            token = JSON.parse(token);
            console.log(token, "token");

            const postData = {
                content: amount
            };
            axios
                .post(`${baseURL}/api/admin/notification/`, postData, {
                    headers: { "x-auth-token": token },
                })
                .then((res) => {
                    console.log(res, "res");
                    // toast.success("✔️ Deposit Request Initiated!", {
                    //     position: "top-right",
                    //     autoClose: 5000,
                    //     hideProgressBar: false,
                    //     closeOnClick: true,
                    //     pauseOnHover: true,
                    //     draggable: true,
                    // });
                    showModal("Notification Sent!", "✔️ Notification Initiated Successfully!")
                    setAmount("")
                    // props.history.push("/dashboard");
                }).catch(e => {
                    console.log(e);
                    showModal("Error!", `Error occured while requesting : ${e.response.data ? e.response.data : "Unknown Error!"}`)
                })

        } else {
            showModal("Error!", "❌ Empty Notification not Allowed!")
            // toast.error("❌ Invalid Amount", {
            //   position: "top-right",
            //   autoClose: 5000,
            //   hideProgressBar: false,
            //   closeOnClick: true,
            //   pauseOnHover: true,
            //   draggable: true,
            //   progress: undefined,
            // });
        }
    };
    const showModal = (hd, msg) => {
        setop(true)
        sethd(hd)
        setmsg(msg)
    }
    return (
        <>
            <ERModal op={op} setop={setop} head={hd} msg={msg} />

            <PageTitle motherMenu="Home" activeMenu="Notifications" />
            <div className="d-flex align-items-center justify-content-center">
                <div className="col-xl-8 col-lg-8" style={{ marginTop: "10%" }}>
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Manage Notifications</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={(e) => notifyTopRight(e)}>
                                <div className="row d-flex justify-content-center">
                                    <label>Write A Notification</label>

                                    <div className="input-group mb-3">
                                        {/* <span className="input-group-text">
                                            <i className="fa fa-exclamation-circle" ></i>
                                        </span> */}
                                        <textarea
                                            rows="8" cols="7" name="blog"
                                            placeholder="Write notifications here..."
                                            value={amount}
                                            className="form-control"
                                            onChange={(e) => setAmount(e.target.value)}
                                        />
                                    </div>

                                    {/* <div className="input-group mb-3  input-primary">
                <span className="input-group-text">$</span>

                <input
                  value={amount}
                  type="text"
                  className="form-control"
                  onChange={(e) => setAmount(e.target.value)}
                />

                <span className="input-group-text">.00</span>
              </div> */}

                                    <div className="form-group"></div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary mt-4"
                                        style={{ width: "120px" }}
                                    >
                                        Send
                                    </button>
                                </div>
                            </form>

                            {/* <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              /> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Notify;
