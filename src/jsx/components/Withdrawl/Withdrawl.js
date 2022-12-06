import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import PageTitle from "../../layouts/PageTitle";
import axios from "axios";

function Withdrawl(props) {
  const [amount, setAmount] = useState(0);

  const notifyTopRight = async (e) => {
    e.preventDefault();

    if (amount > 0) {
      let usr = await localStorage.getItem("user");
      usr = JSON.parse(usr);

      //   const postData = {
      //     user_id: usr?.id,
      //     amount: parseFloat(amount),
      //   };
      //   axios
      //     .post(`http://localhost:4000/api/deposit_request`, postData)
      //     .then((res) => {
      //       console.log(res, "res");
      //       toast.success("✔️ Deposit Request Initiated!", {
      //         position: "top-right",
      //         autoClose: 5000,
      //         hideProgressBar: false,
      //         closeOnClick: true,
      //         pauseOnHover: true,
      //         draggable: true,
      //       });
      //       props.history.push("/dashboard");
      //     });
    } else {
      toast.error("❌ Invalid Amount", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <>
      <PageTitle motherMenu="Home" activeMenu="Withdrawl" />
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
