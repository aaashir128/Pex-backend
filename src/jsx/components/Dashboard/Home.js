import React, { useContext, useEffect, useState } from "react";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import { Button } from "react-bootstrap";
//Images

//Import Components
import { ThemeContext } from "../../../context/ThemeContext";
import ProjectSlider from "./Dashboard/ProjectSlider";
import TransactionHistory from "../AppsMenu/AppProfile/TransactionHistory";
import axios from "axios";
import { baseURL } from "../../../Strings/Strings";
import CurrencyFormat from "react-currency-format";

const ChartBarApex = loadable(() =>
  pMinDelay(import("./Dashboard/ChartBarApex"), 1000)
);

const Home = (props) => {

  var timer;

  const { changeBackground } = useContext(ThemeContext);
  const [data, setData] = useState([]);
  const [historyData, sethistoryData] = useState([])
  const [totalInvested, settotalInvested] = useState(0)
  const [portfolio, setportfolio] = useState([])
  const [profitloss, setprofitloss] = useState(0)

  const tokn = JSON.parse(localStorage.getItem("token"));

  const [coinData, setcoinData] = useState([])

  const getDatafromBackend = async () => {
    try {
      const token = await localStorage.getItem('token')
      const { data } = await axios.get(`${baseURL}/coinmarket`, { headers: { "x-auth-token": token } })
      console.log(data);
      setcoinData(data)
      timer = setTimeout(() => { getDatafromBackend() }, 15000)
      // setInterval(getDatafromBackend(),3000)
    } catch (error) {
      console.log(error);
    }
  }

  const getTrades = async() => {
    const user = JSON.parse(localStorage.getItem('user'))
    const token = JSON.parse(localStorage.getItem('token'))
    let total = 0;
    axios.get(`${baseURL}/api/activetrade/${user?.id}`,{ headers: { "x-auth-token": token } }).then((res) => {
      // console.log(res?.data, "res");
      let userTradeHistory = res?.data;
      for(let i = 0; i<userTradeHistory?.length; i++ ){
        total += res?.data[i]?.trade
      }
      settotalInvested(total)
      // sethistoryData(userTradeHistory);
      setportfolio(res?.data)
      console.log(total,res?.data);
    }).catch(e=>{
      console.log(e);
    });
  }

  useEffect(() => {
    // data?.crypto_name,
    //   data?.crypto_purchase_price
    if (coinData.length > 0 && portfolio.length > 0) {
      let profitLoss = 0;
      for (let i = 0; i < portfolio.length; i++) {
        let filter = coinData.filter((item) => item.name == portfolio[i].crypto_name);
        let pr = ( filter[0]?.price - portfolio[i].crypto_purchase_price )*(portfolio[i].trade / portfolio[i].crypto_purchase_price);
        profitLoss += pr
        // console.log(filter[0]?.price," ",portfolio[i].crypto_purchase_price ," ",pr , profitLoss, " Now Profit and Loss");
      }
      console.log(profitLoss , "Profit and Loss Data");
      setprofitloss(profitLoss)
    }
  }, [coinData, portfolio])

  useEffect(() => {
    getDatafromBackend()
    getTrades()
    changeBackground({ value: "light", label: "Light" });
    let usr = localStorage.getItem("user");
    usr = JSON.parse(usr);
    axios
      .get(`${baseURL}/api/wallet/${usr?.id}`, {
        headers: { "x-auth-token": tokn },
      })
      .then((res) => {
        // console.log(res, "res");
        setData(res?.data);
      }).catch(e=>{
        console.log(e);
      });

      return () => { clearTimeout(timer) }

  }, []);
  return (
    <>
      {/* <div className="row"> */}
      {/* <div className="col-xl-12"> */}
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
                    <span className="mb-3 d-block fs-18">Portfolio Value</span>
                    <CurrencyFormat
                      value={data?.balance > 0 ? data?.balance+totalInvested : 0.00}
                      displayType={"text"}
                      // decimalSeparator={true}
                      decimalScale={2}
                      thousandSeparator={true}
                      prefix={"$"}
                      fixedDecimalScale={true}
                      renderText={(value) => (
                        <h2 className="fs-30 font-w700 mb-3">{value}</h2>
                      )}
                    />
                    {/* <h2 className="fs-30 font-w700 mb-3">$ {data?.balance}</h2> */}
                    <Button className="btn btn-primary mb-0 ms-0 px-4">
                      Portfolio
                    </Button>
                  </div>
                </div>
                <br />
                <div className="col-xl-12">
                  <div className="card-body pt-0">
                    <ProjectSlider data={data} totalInvested={totalInvested} profitLoss={profitloss} />
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
      {/* </div> */}
      {/* </div> */}
    </>
  );
};
export default Home;
