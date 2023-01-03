import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";

/// Image
import profile from "../../../images/user.jpg";
import avatar from "../../../images/avatar/1.jpg";
import { themePrimary } from '../../../css/color'
import { Button, Card, Col, Dropdown, Modal, Nav, Tab } from "react-bootstrap";
import LogoutPage from "./Logout";
import axios from "axios";
import { baseURL } from "../../../Strings/Strings";
import cryptoicons from "../../../icons/cryptoIcons/cryptoImg";
import ERModal from "../../components/modals/ERModal";
import CurrencyFormat from "react-currency-format";

const Header = ({ onNote }) => {
  var timer;
  const [searchBut, setSearchBut] = useState(false);
  const [data, setdata] = useState([])
  const [sdata, setsdata] = useState([])
  const [modalCentered, setModalCentered] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [user, setUser] = useState(null);
  const [isUnits, setIsUnits] = useState(false);
  const [buyAmount, setBuyAmount] = useState({ units: 1, amount: 1000 });
  const [profitEnd, setProfitEnd] = useState(0);
  const [lossEnd, setLossEnd] = useState(0);
  const [op, setop] = useState(false)
  const [hd, sethd] = useState("")
  const [msg, setmsg] = useState("")
  var path = window.location.pathname.split("/");
  var name = path[path.length - 1].split("-");
  var filterName = name.length >= 3 ? name.filter((n, i) => i > 0) : name;

  const tabData = [
    {
      name: "STOP LOSS",
      icon: "",
      content:
        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove.",
    },
    {
      name: "TAKE PROFIT",
      icon: "",
      content:
        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove.",
    },
  ];

  const getDatafromBackend = async () => {
    try {
      const token = await localStorage.getItem("token");
      const { data } = await axios.get(`${baseURL}/coinmarket`, { headers: { "x-auth-token": token } });
      console.log(data);
      // if(localStorage.getItem('perviouse')!=localStorage.getItem('perviouse')){}
      localStorage.setItem('perviouse', localStorage.getItem("cur"))
      localStorage.setItem("cur", JSON.stringify(data))
      // setPerCoinData(JSON.parse( await localStorage.getItem('perviouse')))
      setdata(data)
      setsdata(data)
      timer = setTimeout(() => {
        getDatafromBackend();
      }, 15000);
      // setInterval(getDatafromBackend(),3000)
    } catch (error) {
      console.log(error);
    }
  };

  const increaseAmount = () => {
    if (isUnits) {
      setBuyAmount({
        ...buyAmount,
        units: (buyAmount.units += 1),
        amount: buyAmount.units * selectedCoin?.data?.price,
      });
    } else {
      setBuyAmount({
        ...buyAmount,
        amount: (buyAmount.amount += 1000),
        units: buyAmount.amount / selectedCoin?.data?.price,
      });
    }
  };
  const decreaseAmount = () => {
    if (isUnits) {
      if (buyAmount.units > 0) {
        setBuyAmount({
          ...buyAmount,
          units: (buyAmount.units -= 1),
          amount: buyAmount.units * selectedCoin?.data?.price,
        });
      }
    } else {
      if (buyAmount.amount >= 1000) {
        setBuyAmount({
          ...buyAmount,
          amount: (buyAmount.amount -= 1000),
          units: buyAmount.amount / selectedCoin?.data?.price,
        });
      }
    }
  };

  const changeAmount = (e) => {
    if (isUnits) {
      setBuyAmount({
        ...buyAmount,
        units: Number(e.target.value),
        amount: buyAmount.units * selectedCoin?.data?.price,
      });
    } else {
      setBuyAmount({
        ...buyAmount,
        amount: Number(e.target.value),
        units: buyAmount.amount / selectedCoin?.data?.price,
      });
    }
  };

  const showModal = (hd, msg) => {
    setop(true)
    sethd(hd)
    setmsg(msg)
  }

  const createTrade = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const token = JSON.parse(localStorage.getItem('token'))
    showModal("Loading...", "loading...")
    if (buyAmount.amount > 0 || buyAmount.units > 0) {
      const tradeData = {
        crypto_name: selectedCoin?.data?.name,
        crypto_symbol: selectedCoin?.data?.symbol,
        crypto_purchase_price: selectedCoin?.data?.price,
        investment: buyAmount?.amount,
        take_profit: profitEnd,
        stop_loss: lossEnd,
        user_id: user?.id,
      };
      console.log(tradeData);
      axios.post(`${baseURL}/api/activetrade`, tradeData, { headers: { "x-auth-token": token } }).then((res) => {
        console.log(res?.data, "res");
        if (res?.data?.status) {
          // props?.history?.push("/portfolio");
        }
        // alert("Success")
        showModal("Success!", "Congratulation!! Trade was created successfullt!")
        setModalCentered(false)
      }).catch(e => {
        console.log(e);
        showModal("Error Occurd!", e.response.data ? e.response.data : "Unknown Error Occured!")
      });
    } else {
      showModal("Error", "Invalid Amount Entered!")
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const val = e.target.value
    if (val?.length > 0) {
      const nnn = data.filter(i => i?.name?.toLowerCase()?.includes(e.target.value.toLowerCase()))
      setdata(nnn)
    } else {
      setdata(sdata)
    }
  }

  useEffect(() => {
    const usr = localStorage.getItem("user");
    setUser(JSON.parse(usr));
    getDatafromBackend();
    return () => { clearTimeout(timer) };

  }, []);


  return (
    <div className="header border-bottom">
      <ERModal op={op} setop={setop} head={hd} msg={msg} />
      <Modal className="fade" show={modalCentered} centered>
        <Modal.Header style={{ backgroundColor: themePrimary }}>
          <Modal.Title className="text-white text-uppercase">
            Buy {selectedCoin?.data.name}
          </Modal.Title>
          <Button
            onClick={() => setModalCentered(false)}
            variant=""
            className="btn-close"
          ></Button>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex align-items-center">
            <img src={selectedCoin?.coinImg} width="40" height="40" />
            <div className="mx-2">
              <div className=" d-flex">
                <p className="mb-0 ">BUY</p>
                <h5 className="mb-0 px-1">{selectedCoin?.data?.symbol}</h5>
              </div>
              <div className="d-flex align-items-center">
                <h3 className="mb-0">
                  {/* ${parseFloat(selectedCoin?.data?.price).toFixed(2)} */}
                  <CurrencyFormat
                    value={selectedCoin?.data?.price}
                    displayType={"text"}
                    decimalScale={2}
                    thousandSeparator={true}
                    prefix={"$"}
                    fixedDecimalScale={true}
                    renderText={(value) => <p>{value}</p>}
                  />
                </h3>
                <small
                  className={
                    selectedCoin?.data?.percent_change_24h > 0
                      ? "text-success mb-0 px-1"
                      : "text-danger mb-0 px-1"
                  }
                >
                  (
                  {parseFloat(
                    selectedCoin?.data?.percent_change_24h
                  ).toFixed(2)}
                  % )
                </small>
              </div>
              <small>PRICES BY PRIME CRYPTO EXCHANGE</small>
            </div>
          </div>
          <div
            className="d-flex align-items-center justify-content-between"
            style={{ marginTop: "64px" }}
          >
            <div className="mb-3" style={{ flex: 0.2 }}>
              <h5 className="d-flex justify-content-center align-items-center">
                {isUnits ? "UNITS" : "AMOUNT"}
              </h5>
            </div>

            <div className="input-group mb-3" style={{ flex: 0.5 }}>
              <Button
                className="text-primary"
                variant="dark light"
                onClick={decreaseAmount}
              >
                -
              </Button>

              <input
                value={isUnits ? buyAmount.units : buyAmount.amount}
                type="number"
                className="form-control"
                style={{ fontSize: "20px" }}
                onChange={(e) => changeAmount(e)}
              />
              <Button
                className="text-primary"
                variant="dark light"
                onClick={increaseAmount}
              >
                +
              </Button>
            </div>

            <div style={{ flex: 0.2 }}>
              <div
                role="button"
                className="p-2 mb-3 bg-light rounded d-flex align-items-center justify-content-around"
                onClick={() => setIsUnits(!isUnits)}
              >
                <i className="fas fa-exchange-alt"></i>
                <h4 className="mb-0">{!isUnits ? "UNITS" : "AMOUNT"}</h4>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            {!isUnits ? (
              <small>{parseFloat(buyAmount.units).toFixed(2)} UNITS</small>
            ) : (
              <small>
                ${parseFloat(buyAmount.amount).toFixed(2)} ESTIMATED MARGIN
              </small>
            )}
          </div>

          <Col xl={12}>
            <Card>
              <Card.Body>
                {/* <!-- Nav tabs --> */}
                <div className="default-tab">
                  <Tab.Container
                    defaultActiveKey={tabData[0].name.toLowerCase()}
                  >
                    <Nav
                      as="ul"
                      className="nav-tabs justify-content-around"
                    >
                      {tabData.map((data, i) => (
                        <Nav.Item
                          as="li"
                          key={i}
                          className="justify-content-between"
                        >
                          <Nav.Link eventKey={data.name.toLowerCase()}>
                            {/* <i className={`la la-${data.icon} me-2`} /> */}

                            {data.name}
                          </Nav.Link>
                        </Nav.Item>
                      ))}
                    </Nav>
                    <Tab.Content className="pt-4">
                      {tabData.map((data, i) => (
                        <Tab.Pane
                          eventKey={data.name.toLowerCase()}
                          key={i}
                        >
                          <div
                            className="d-flex flex-column align-items-center"
                            style={{ marginTop: "32px" }}
                          >
                            <div className="mb-3" style={{ flex: 0.2 }}>
                              <h5 className="d-flex justify-content-center align-items-center">
                                AMOUNT
                              </h5>
                            </div>

                            <div
                              className="input-group mb-3"
                              style={{ flex: 0.5 }}
                            >
                              <Button
                                className="text-primary"
                                variant="dark light"
                                onClick={() => {
                                  data.name == "STOP LOSS"
                                    ? setLossEnd(lossEnd - 1)
                                    : setProfitEnd(profitEnd - 1);
                                }}
                              >
                                -
                              </Button>
                              {data.name == "STOP LOSS" ? (
                                <input
                                  value={lossEnd}
                                  type="number"
                                  className="form-control"
                                  style={{ fontSize: "20px" }}
                                  onChange={(e) => {
                                    setLossEnd(e.target.value);
                                  }}
                                />
                              ) : (
                                <input
                                  value={profitEnd}
                                  type="number"
                                  className="form-control"
                                  style={{ fontSize: "20px" }}
                                  onChange={(e) => {
                                    setProfitEnd(e.target.value);
                                  }}
                                />
                              )}
                              <Button
                                className="text-primary"
                                variant="dark light"
                                onClick={() => {
                                  data.name == "STOP LOSS"
                                    ? setLossEnd(lossEnd + 1)
                                    : setProfitEnd(profitEnd + 1);
                                }}
                              >
                                +
                              </Button>
                            </div>
                          </div>
                        </Tab.Pane>
                      ))}
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <div
            className="d-flex justify-content-center"
            style={{ marginTop: "64px" }}
          >
            <h3>YOU ARE BUYING THE UNDERLYING ASSET</h3>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            onClick={createTrade}
            // onClick={() => setModalCentered(false)}
            variant="primary"
            style={{ width: "200px" }}
          >
            Open Trade
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="header-content">
        <nav className="navbar navbar-expand">
          <div className="collapse navbar-collapse justify-content-between">
            <div className="header-left">
              {/* <div
					className="dashboard_bar"
					style={{ textTransform: "capitalize" }}
				  >
					{finalName.join(" ").length === 0
					  ? "Dashboard"
					  : finalName.join(" ") === "dashboard dark"
					  ? "Dashboard"
					  : finalName.join(" ")}
				</div> */}
            </div>
            <div className="header-mid">

              <Dropdown
                as="li"
                className="nav-item dropdown notification_dropdown "
              >
                <Dropdown.Toggle
                  className="nav-link i-false c-pointer"
                  variant=""
                  as="a"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div className="w-90 input-group search-area center">
                    <input
                      type="text"
                      className={`form-control ${searchBut ? "active" : ""}`}
                      placeholder="Search here..."
                      onChange={(e) => { handleChange(e) }}
                    />
                    <span
                      className="input-group-text"
                      onClick={() => setSearchBut(!searchBut)}
                    >
                      <Link to={"#"}>
                        <i className="flaticon-381-search-2"></i>
                      </Link>
                    </span>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  align="right"
                  className="mt-2 dropdown-menu dropdown-menu-end"
                >
                  <PerfectScrollbar className="widget-media dlab-scroll p-3 height380">
                    <ul className="timeline">
                      {
                        data?.filter(i => cryptoicons[i.symbol])?.map((i, ind) => {
                          let coinImg = cryptoicons[i?.symbol];
                          return <li>
                            <div className="timeline-panel">
                              <div className="media me-2">
                                <img alt="images" width={50} src={coinImg} />
                              </div>
                              <div className="media-body">
                                <h6 className="mb-1">{i?.name}
                                  <button
                                    type="button"
                                    className="btn"
                                    style={{
                                      marginLeft: "5px",
                                      background: "#3eacff",
                                      color: "white",
                                      padding: "2px 4px",
                                      borderRadius: "7px",
                                    }}
                                    onClick={() => {
                                      setModalCentered(true);
                                      setSelectedCoin({ coinImg, data: i });
                                    }}
                                  >
                                    Buy Now
                                  </button>
                                </h6>
                                <small className="d-block">
                                  {i?.symbol} | unit price : <span style={{ fontWeight: "800" }} >${i?.price}</span>
                                </small>
                              </div>
                            </div>
                          </li>
                        })
                      }
                    </ul>
                    <div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
                      <div
                        className="ps__thumb-x"
                        tabIndex={0}
                        style={{ left: 0, width: 0 }}
                      />
                    </div>
                    <div className="ps__rail-y" style={{ top: 0, right: 0 }}>
                      <div
                        className="ps__thumb-y"
                        tabIndex={0}
                        style={{ top: 0, height: 0 }}
                      />
                    </div>
                  </PerfectScrollbar>
                  <Link className="all-notification" to="#">
                    Available Coins to Invest <i className="ti-arrow-right" />
                  </Link>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <ul className="navbar-nav header-right w-90">
              <li className="nav-item d-flex align-items-center"></li>

              <Dropdown
                as="li"
                className="nav-item dropdown notification_dropdown "
              >
                <Dropdown.Toggle
                  className="nav-link i-false c-pointer"
                  variant=""
                  as="a"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.3333 19.8333H23.1187C23.2568 19.4597 23.3295 19.065 23.3333 18.6666V12.8333C23.3294 10.7663 22.6402 8.75902 21.3735 7.12565C20.1068 5.49228 18.3343 4.32508 16.3333 3.80679V3.49996C16.3333 2.88112 16.0875 2.28763 15.6499 1.85004C15.2123 1.41246 14.6188 1.16663 14 1.16663C13.3812 1.16663 12.7877 1.41246 12.3501 1.85004C11.9125 2.28763 11.6667 2.88112 11.6667 3.49996V3.80679C9.66574 4.32508 7.89317 5.49228 6.6265 7.12565C5.35983 8.75902 4.67058 10.7663 4.66667 12.8333V18.6666C4.67053 19.065 4.74316 19.4597 4.88133 19.8333H4.66667C4.35725 19.8333 4.0605 19.9562 3.84171 20.175C3.62292 20.3938 3.5 20.6905 3.5 21C3.5 21.3094 3.62292 21.6061 3.84171 21.8249C4.0605 22.0437 4.35725 22.1666 4.66667 22.1666H23.3333C23.6428 22.1666 23.9395 22.0437 24.1583 21.8249C24.3771 21.6061 24.5 21.3094 24.5 21C24.5 20.6905 24.3771 20.3938 24.1583 20.175C23.9395 19.9562 23.6428 19.8333 23.3333 19.8333Z"
                      fill="#717579"
                    />
                    <path
                      d="M9.98192 24.5C10.3863 25.2088 10.971 25.7981 11.6766 26.2079C12.3823 26.6178 13.1839 26.8337 13.9999 26.8337C14.816 26.8337 15.6175 26.6178 16.3232 26.2079C17.0288 25.7981 17.6135 25.2088 18.0179 24.5H9.98192Z"
                      fill="#717579"
                    />
                  </svg>
                  <span className="badge light text-white bg-blue rounded-circle">
                    16
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  align="right"
                  className="mt-2 dropdown-menu dropdown-menu-end"
                >
                  <PerfectScrollbar className="widget-media dlab-scroll p-3 height380">
                    <ul className="timeline">
                      <li>
                        <div className="timeline-panel">
                          <div className="media me-2">
                            <img alt="images" width={50} src={avatar} />
                          </div>
                          <div className="media-body">
                            <h6 className="mb-1">Dr sultads Send you Photo</h6>
                            <small className="d-block">
                              29 July 2020 - 02:26 PM
                            </small>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="timeline-panel">
                          <div className="media me-2 media-info">KG</div>
                          <div className="media-body">
                            <h6 className="mb-1">
                              Resport created successfully
                            </h6>
                            <small className="d-block">
                              29 July 2020 - 02:26 PM
                            </small>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="timeline-panel">
                          <div className="media me-2 media-success">
                            <i className="fa fa-home" />
                          </div>
                          <div className="media-body">
                            <h6 className="mb-1">Reminder : Treatment Time!</h6>
                            <small className="d-block">
                              29 July 2020 - 02:26 PM
                            </small>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="timeline-panel">
                          <div className="media me-2">
                            <img alt="" width={50} src={avatar} />
                          </div>
                          <div className="media-body">
                            <h6 className="mb-1">Dr sultads Send you Photo</h6>
                            <small className="d-block">
                              29 July 2020 - 02:26 PM
                            </small>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="timeline-panel">
                          <div className="media me-2 media-danger">KG</div>
                          <div className="media-body">
                            <h6 className="mb-1">
                              Resport created successfully
                            </h6>
                            <small className="d-block">
                              29 July 2020 - 02:26 PM
                            </small>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="timeline-panel">
                          <div className="media me-2 media-primary">
                            <i className="fa fa-home" />
                          </div>
                          <div className="media-body">
                            <h6 className="mb-1">Reminder : Treatment Time!</h6>
                            <small className="d-block">
                              29 July 2020 - 02:26 PM
                            </small>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
                      <div
                        className="ps__thumb-x"
                        tabIndex={0}
                        style={{ left: 0, width: 0 }}
                      />
                    </div>
                    <div className="ps__rail-y" style={{ top: 0, right: 0 }}>
                      <div
                        className="ps__thumb-y"
                        tabIndex={0}
                        style={{ top: 0, height: 0 }}
                      />
                    </div>
                  </PerfectScrollbar>
                  <Link className="all-notification" to="#">
                    See all notifications <i className="ti-arrow-right" />
                  </Link>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown as="li" className="nav-item dropdown header-profile">
                <Dropdown.Toggle
                  variant=""
                  as="a"
                  className="nav-link i-false c-pointer"
                  role="button"
                  data-toggle="dropdown"
                >
                  <img src={profile} width={20} alt="" />
                  <div className="header-info ms-3">
                    <span className="fs-18 font-w500 mb-2">
                      {/* {user?.firstName + " " + user?.lastName} */}
                      {user?.username}
                    </span>
                    <small className="fs-12 font-w400">{user?.email}</small>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  align="right"
                  className="mt-3  mt-lg-0 dropdown-menu dropdown-menu-end"
                >
                  <Link to="/app-profile" className="dropdown-item ai-icon">
                    <svg
                      id="icon-user1"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-primary me-1"
                      width={18}
                      height={18}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx={12} cy={7} r={4} />
                    </svg>
                    <span className="ms-2">Profile </span>
                  </Link>
                  <Link to="/email-inbox" className="dropdown-item ai-icon">
                    <svg
                      id="icon-inbox"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-success me-1"
                      width={18}
                      height={18}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <span className="ms-2">Inbox </span>
                  </Link>
                  <LogoutPage />
                </Dropdown.Menu>
              </Dropdown>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
