import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import PageTitle from "../../layouts/PageTitle";
import axios from "axios";
import { baseURL, withdrawRequest } from "../../../Strings/Strings";
import ERModal from "../modals/ERModal";


function Withdrawl(props) {
  const [op, setop] = useState(false)
  const [hd, sethd] = useState("")
  const [msg, setmsg] = useState("")
  const [amount, setAmount] = useState(0);

  const notifyTopRight = async (e) => {
    
    e.preventDefault();

    showModal("Loading...","Loading...")

    if (amount > 0) {
      let usr = await localStorage.getItem("user");
      usr = JSON.parse(usr);

      let token = await localStorage.getItem("token");
      token = JSON.parse(token);
      // console.log(token, "token");

      const postData = {
        user_id: usr?.id,
        amount: parseFloat(amount),
      };
      axios
        .post(`${baseURL}${withdrawRequest}`, postData, {
          headers: { "x-auth-token": token },
        })
        .then((res) => {
          console.log(res, "res");
          // toast.success("✔️ Withdraw Request Initiated!", {
          //   position: "top-right",
          //   autoClose: 5000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          // });
          // props.history.push("/dashboard");
          showModal("Request Sent!","✔️ Withdraw Request Initiated!");

        })
        .catch((err) => {
          console.log("err", err.response.data);
          showModal("Error!",`Error occured while requesting : ${e.response.data ? e.response.data : "Unknown Error!"}`)
        });
    } else {
      showModal("Error!","❌ Invalid Amount Entered")

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

  const showModal = (hd,msg) => {
    setop(true)
    sethd(hd)
    setmsg(msg)
  }

  return (
    <>
      <PageTitle motherMenu="Home" activeMenu="Withdrawl" />
      <ERModal op={op} setop={setop} head={hd} msg={msg} />

      <div className="d-flex align-items-center justify-content-center">
        <div className="col-xl-8 col-lg-8" style={{ marginTop: "10%" }}>
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Withdraw Amount</h4>
            </div>
            <div className="card-body">
              <form onSubmit={(e) => notifyTopRight(e)}>
                <div className="row d-flex justify-content-center">
                  <label>Enter Amount</label>

                  <div className="input-group mb-3">
                    <span className="input-group-text">$</span>
                    <input
                      value={amount}
                      type="number"
                      className="form-control"
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>

                  <div className="form-group"></div>
                  <button
                    type="submit"
                    className="btn btn-primary mt-4"
                    style={{ width: "120px" }}
                  >
                    Withdrawl
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
    </>
  );
}

export default Withdrawl;
