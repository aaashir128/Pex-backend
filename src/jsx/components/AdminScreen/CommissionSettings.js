import React from "react";
import PageTitle from "../../layouts/PageTitle";

function CommissionSettings() {
  return (
    <div>
      <PageTitle activeMenu="Commission Settings" motherMenu="Admin" />

      <div className="col-xl-12 col-lg-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Commission Settings</h4>
          </div>
          <div className="card-body">
            <div className="basic-form">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="row">
                  <div className="form-group mb-3 col-md-6">
                    <h5>Buy Commission</h5>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="1.5%"
                    />
                  </div>
                  <div className="form-group mb-3 col-md-6">
                    <h5>Sell Commission</h5>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="1.5%"
                    />
                  </div>
                  <div className="form-group mb-3 col-md-6">
                    <h5>Minimum SL</h5>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="1.1"
                    />
                  </div>
                  <div className="form-group mb-3 col-md-6">
                    <h5>Minimum TP</h5>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="1.9"
                    />
                  </div>
                </div>

                <div className="text-center my-4">
                  <button
                    type="submit"
                    className="btn btn-primary text-center w-25"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommissionSettings;
