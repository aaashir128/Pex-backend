import React, { useContext, useEffect, useState } from "react";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import { Button } from "react-bootstrap";
//Images

//Import Components
import { ThemeContext } from "../../../context/ThemeContext";
import ProjectSlider from "./Dashboard/ProjectSlider";
import TransactionHistory from "../AppsMenu/AppProfile/TransactionHistory";

const ChartBarApex = loadable(() =>
  pMinDelay(import("./Dashboard/ChartBarApex"), 1000)
);

const Home = (props) => {
  const { changeBackground } = useContext(ThemeContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    changeBackground({ value: "light", label: "Light" });
    let usr = localStorage.getItem("user");
    usr = JSON.parse(usr);
    // axios.get(`${baseURL}api/wallet/${usr?.id}`).then((res) => {
    //   console.log(res, "res");
    //   setData(res.data.wallet);
    // });
  }, [props.history]);
  return (
    <>
      <div className="row">
        <div className="col-xl-12">
          <div className="row">
            <div className="col-xl-12">
              <div className="row">
                <div className="col-xl-12 col-md-12 col-xxl-12">
                  <div className="card" id="user-activity">
                    <div className="card-header border-0 pb-0 flex-wrap">
                      <div>
                        <span className="mb-0 d-block fs-22">
                          <strong>Welcome Back!</strong>
                        </span>
                        <span className="mb-3 d-block fs-18">
                          Portfolio Value
                        </span>
                        <h2 className="fs-30 font-w700 mb-3">
                          $ {data?.balance}
                        </h2>
                        <Button className="btn btn-primary mb-0 ms-0 px-4">
                          Portfolio
                        </Button>
                      </div>
                    </div>
                    <br />
                    <div className="col-xl-12">
                      <div className="card-body pt-0">
                        <ProjectSlider {...data} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-12 col-md-12">
                <div className="row">
                  <div className="col-xl-8 col-lg-8 col-md-8 ">
                    <TransactionHistory />
                  </div>
                  <div className="card col-xl-4 col-lg-4 col-md-4 ">
                    <ChartBarApex />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
