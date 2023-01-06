import React, { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import PageTitle from "../../layouts/PageTitle";
import cryptoicons from '../../../icons/cryptoIcons/cryptoImg'
import {
    Button,
    Card,
    Col,
    Dropdown,
    Modal,
    Nav,
    Row,
    Tab,
} from "react-bootstrap";
import {
    baseURL,
    createTradeAPI,
    createTradeHistoryAPI,
    tradeAPI,
} from "../../../Strings/Strings";
import CurrencyFormat from 'react-currency-format'
import { themePrimary } from "../../../css/color";
import ERModal from "../modals/ERModal";
import sortArray from "../../../utils/sort";

const sort = 10;
let perArr = [];
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
function InnerTrade(props) {
    var timer;

    let { coin } = useParams();

    // const { cd, pf } = props.location.state

    // const [newData, setnewData] = useState([])
    // useEffect(() => {
    //     if (pf?.length > 0 && cd.length > 0) {
    //         let filter = pf?.filter(i=>i?.crypto_name === coin)
    //         setnewData([...filter])
    //         console.log(cd, filter, " NEWf;disjha;jkh;ksdahpisdghpdskahlksdah;kjaslkjsdaljksdlksdajhsdajhds");
    //     }
    // }, [cd, pf])


    const [order, setorder] = useState("ASC")
    const [op, setop] = useState(false)
    const [hd, sethd] = useState("")
    const [msg, setmsg] = useState("")
    const [APIData, setAPIData] = useState([]);
    const [portfolio, setportfolio] = useState([])
    const [perCoinData, setPerCoinData] = useState([]);
    const [coinData, setCoinData] = useState([]);
    const [modalTradeClose, setModalTradeClose] = useState(false);
    const [modalTradeEdit, setModalTradeEdit] = useState(false);
    const [start, setStart] = useState(0);
    const [closeId, setCloseId] = useState(0);
    const [end, setEnd] = useState(10);
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [profitEnd, setProfitEnd] = useState(0);
    const [lossEnd, setLossEnd] = useState(0);
    const [sameCoin, setSameCoin] = useState();
    const [isUnits, setIsUnits] = useState(false);
    const [partialTrade, setPartialTrade] = useState(false);
    const [totalInvestment, settotalInvestment] = useState(0)
    const [wallet, setwallet] = useState({})
    const [buyAmount, setBuyAmount] = useState({ units: 1, amount: 1000 });
    const [colorCheck, setColorCheck] = useState(null);
    const [profitloss, setprofitloss] = useState(0)
    const [parClAmount, setparClAmount] = useState(0)
    let usr = localStorage.getItem("user");
    usr = JSON.parse(usr);

    const activePag = useRef(0);
    const chageData = (frist, sec) => {
        for (var i = 0; i < coinData.length; ++i) {
            if (i >= frist && i < sec) {
                coinData[i]?.classList?.remove("d-none");
            } else {
                coinData[i]?.classList?.add("d-none");
            }
        }
    };

    const sortDATA = (arr, elem, type, order) => {
        setportfolio(sortArray(arr, elem, type, order))
        order == "ASC" ? setorder("DESC") : setorder("ASC")
    }

    // activePag.current === 0 && chageData(0, sort);
    let paggination = portfolio.length > 0 ? Array(Math.ceil(portfolio?.length / sort))?.fill()?.map((_, i) => i + 1) : [1, 2, 3, 4];
    // let paggination = [1,2,3,4]


    const onClick = (i) => {
        activePag.current = i;
        setStart(activePag.current * sort);
        setEnd((activePag.current + 1) * sort);
        // chageData(activePag.current * sort, (activePag.current + 1) * sort);
        // settest(i);
    };

    // useEffect(() => {
    //   getTrades();
    // }, []);

    // const getTrades = () => {
    //   axios.get(`${baseURL}${tradeAPI}?user_id=1`).then((res) => {
    //     console.log(res, "res");
    //     // setCoinData(res.data.ActiveTradeRequests);
    //     var filterData = res.data.ActiveTradeRequests.filter(
    //       (trade) => trade.status === "Open"
    //     );
    //     setCoinData(filterData);
    //   });
    // };

    const closeTrade = () => {
        showModal('Loading...', "Closing...")
        const sale = coinData?.find(i => i?.name == selectedCoin?.crypto_name)?.price
        console.log(sale)
        axios.delete(`${baseURL}/api/activetrade/${selectedCoin.id}`, { data: { crypto_sale_price: sale } }).then((res) => {
            console.log(res, "res");
            fetchPortfoliolist()
            setModalTradeClose(false);
            showModal("Success", "Closed successfully!")
            if (res?.data?.status) {
                // getTrades();

            }
        }).catch(e => {
            console.log(e);
            showModal("Error!", `Error Occured while closing : ${e.response.data ? e.response.data : "Unknown Error Occured!"}`)
        });
    };

    const partialcloseTrade = () => {
        showModal('Loading...', "Closing...")
        const user = JSON.parse(localStorage.getItem('user'))
        const token = JSON.parse(localStorage.getItem('token'))
        const sale = coinData?.find(i => i?.name == selectedCoin?.crypto_name)?.price
        const dat = {
            user_id: user?.id,
            trade_id: selectedCoin?.id,
            partial_trade_close_amount: parClAmount,
            crypto_sale_price: sale,
            trade_type: "partial"
        }
        console.log(dat)
        axios.post(`${baseURL}/api/activetrade/partial`, dat, { headers: { "x-auth-token": token } })
            .then((res) => {
                console.log(res, "res");
                fetchPortfoliolist()
                setPartialTrade(false)
                setModalTradeClose(false);
                showModal("Success", "Closed successfully!")
                if (res?.data?.status) {
                    // getTrades();

                }
            }).catch(e => {
                console.log(e);
                setPartialTrade(false)
                showModal("Error!", `Error Occured while closing : ${e.response.data ? e.response.data : "Unknown Error Occured!"}`)
            });
    };

    const increaseAmount = () => {
        if (isUnits) {
            setBuyAmount({
                ...buyAmount,
                units: (buyAmount.units += 1),
                amount: buyAmount.units * sameCoin?.data.quote.USD.price,
            });
        } else {
            setBuyAmount({
                ...buyAmount,
                amount: (buyAmount.amount += 1000),
                units: buyAmount.amount / sameCoin?.data.quote.USD.price,
            });
        }
    };
    const decreaseAmount = () => {
        if (isUnits) {
            if (buyAmount.units > 0) {
                setBuyAmount({
                    ...buyAmount,
                    units: (buyAmount.units -= 1),
                    amount: buyAmount.units * sameCoin?.data.quote.USD.price,
                });
            }
        } else {
            if (buyAmount.amount >= 1000) {
                setBuyAmount({
                    ...buyAmount,
                    amount: (buyAmount.amount -= 1000),
                    units: buyAmount.amount / sameCoin?.data.quote.USD.price,
                });
            }
        }
    };

    const changeAmount = (e) => {
        setparClAmount(e.target.value * 1)
        if (isUnits) {
            setBuyAmount({
                ...buyAmount,
                units: Number(e.target.value),
                amount: Number(e.target.value),
            });
        } else {
            setBuyAmount({
                ...buyAmount,
                amount: Number(e.target.value),
                units: Number(e.target.value),
            });
        }
    };


    // const fetchData = async () => {
    //   const config = {
    //     headers: {
    //       "Access-Control-Allow-Origin": "*",
    //     },
    //   };
    //   axios
    //     .get(
    //       "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=9c9c9f71-a6f2-4584-8067-e45e2615151e&start=1&limit=25&convert=USD",
    //       {
    //         headers: {
    //           "x-apikey": "b102e6d8-b50b-4e58-9893-053706a2b065",
    //           "Access-Control-Allow-Origin": "*",
    //           "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    //         },
    //       }
    //     )
    //     .then((res) => {
    //       let result = res.data.data;
    //       let newArray = [];
    //       // perCoin - data.quote.USD.price,
    //       // setTimeout(() => {
    //       localStorage.setItem("perData", JSON.stringify(res.data.data));
    //       setAPIData(res.data.data);
    //       // }, 500);
    //     });
    // };

    // const filterByReference = (arr1, arr2) => {
    //   let res = [];
    //   res = arr1.filter((el) => {
    //     return arr2.find((element) => {
    //       return element.crypto_name === el.slug;
    //     });
    //   });
    //   return res;
    // };
    // console.log("filterArray", filterByReference(APIData, coinData));

    var cvalue = function calculateProfitOrLoss(name, price) {
        console.log("coinName", name);
        let filter = coinData.filter((item) => item.name == name);
        // console.log("filterArray", filter[0]?.quote.USD.price);
        // if (filter[0]?.quote.USD.price - price < 0) {
        //   setColorCheck(true);
        // }
        // if (filter[0]?.quote.USD.price - price > 0) {
        //   setColorCheck(false);
        // }

        return (filter[0]?.price - price).toFixed(2);
    };

    useEffect(() => {
        // data?.crypto_name,
        //   data?.crypto_purchase_price
        if (coinData.length > 0 && portfolio.length > 0) {
            let profitLoss = 0;
            for (let i = 0; i < portfolio.length; i++) {
                let filter = coinData.filter((item) => item.name == portfolio[i].crypto_name);
                let pr = (filter[0]?.price - portfolio[i].crypto_purchase_price) * (portfolio[i].trade / portfolio[i].crypto_purchase_price);
                profitLoss += pr
                // console.log(filter[0]?.price," ",portfolio[i].crypto_purchase_price ," ",pr , profitLoss, " Now Profit and Loss");
            }
            console.log(profitLoss);
            setprofitloss(profitLoss)
        }
    }, [coinData, portfolio])

    const getCoinData = (name, img, data) => {
        console.log("cName", name);
        let filter = APIData.filter((item) => item.slug == name);
        console.log("cName filter", filter);
        setSameCoin([filter[0]?.price, img, data]);
    };

    const fetchPortfoliolist = async () => {
        try {
            const token = JSON.parse(await localStorage.getItem('token'))
            const user = JSON.parse(await localStorage.getItem('user'))
            console.log(user, token);
            const { data } = await axios.get(`${baseURL}/api/activetrade/${user.id}`, { headers: { "x-auth-token": token } })
            let total = 0;
            for (let i = 0; i < data?.length; i++) {
                total += data[i]?.trade
            }
            settotalInvestment(total)
            console.log(data, total, "watch list data");
            setportfolio(data)
        } catch (error) {
            console.log(error, "watchlist error");
        }
    }

    const fetchWalets = async () => {
        const tokn = JSON.parse(await localStorage.getItem('token'))
        const user = JSON.parse(await localStorage.getItem('user'))
        axios
            .get(`${baseURL}/api/wallet/${user?.id}`, {
                headers: { "x-auth-token": tokn },
            })
            .then((res) => {
                // console.log(res, "res");
                setwallet(res?.data);
            }).catch(e => {
                console.log(e);
            });
    }

    const getDatafromBackend = async () => {
        try {
            const token = await localStorage.getItem('token')
            const { data } = await axios.get(`${baseURL}/coinmarket`, { headers: { "x-auth-token": token } })
            console.log(data);
            setCoinData(data)
            timer = setTimeout(() => { getDatafromBackend() }, 15000)
            // setInterval(getDatafromBackend(),3000)
        } catch (error) {
            console.log(error);
        }
    }

    const showModal = (hd, msg) => {
        setop(true)
        sethd(hd)
        setmsg(msg)
    }
    // useEffect(() => {

    // let filter = APIData.filter(
    //   // (data, i) => data.slug == coinData[i]?.crypto_name
    //   (data, i) => data.slug == coinData.filter((d) => d.crypto_name)
    //   // (data, i) => console.log(i)
    // );

    // let res = [];
    // res = APIData.filter((el) => {
    //   return !coinData.find((element) => {
    //     return element.slug === el.crypto_name;
    //   });
    // });
    // return setSameCoin(res);

    // console.log(filterByReference(arr1, arr2));

    // var filter = APIData.filter(function (item) {
    //   return coinData.find((i) => item.slug === i.crypto_name);
    // });

    // let filter = APIData.filter((item) => {
    //   item.slug == coinData.filter((i) => i.crypto_name);
    // });
    // setSameCoin(filter);
    //   console.log("APIData", APIData);
    //   console.log("sameCoin", sameCoin);
    //   console.log("coinData", coinData);
    //   // setCoinData({...coinData, currentPrice})
    // }, [APIData, coinData]);

    // useEffect(() => {
    //   console.log("sameCoin", sameCoin);
    //   var i = 2;
    //   console.log("Negative check", Math.sign(i));
    // }, [sameCoin]);

    useEffect(() => {

        console.log("useEffect Call");
        fetchWalets()
        getDatafromBackend()
        fetchPortfoliolist()
        return () => { clearTimeout(timer) }

    }, []);

    return (
        <>
            {/* <i className="fas fa-arrow-left" ></i> */}
            <PageTitle activeMenu={coin} motherMenu="Home" />
            <ERModal op={op} setop={setop} head={hd} msg={msg} />


            {/* <div className="d-flex justify-between"> */}
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive">
                            <div id="job_data" className="dataTables_wrapper">
                                <table className="table dataTable display">
                                    <thead>
                                        <tr role="row">
                                            <th
                                                className="sorting_asc"
                                                tabIndex={0}
                                                rowSpan={1}
                                                colSpan={1}
                                                onClick={() => { sortDATA(portfolio, "crypto_name", "string", order) }}
                                            >
                                                Asset
                                            </th>
                                            <th
                                                className="sorting"
                                                tabIndex={0}
                                                rowSpan={1}
                                                colSpan={1}
                                                onClick={() => { sortDATA(portfolio, "trade", "num", order) }}
                                            >
                                                Amount
                                            </th>

                                            <th
                                                className="sorting"
                                                tabIndex={0}
                                                rowSpan={1}
                                                colSpan={1}
                                            >
                                                Units
                                            </th>
                                            <th
                                                className="sorting"
                                                tabIndex={0}
                                                rowSpan={1}
                                                colSpan={1}
                                                onClick={() => { sortDATA(portfolio, "crypto_purchase_price", "num", order) }}
                                            >
                                                Open
                                            </th>
                                            <th
                                                className="sorting"
                                                tabIndex={0}
                                                rowSpan={1}
                                                colSpan={1}
                                            // onClick={() => { sortDATA(portfolio, "crypto_purchase_price", "num", order) }}
                                            >
                                                Current
                                            </th>
                                            <th
                                                className="sorting"
                                                tabIndex={0}
                                                rowSpan={1}
                                                colSpan={1}
                                            >
                                                SL
                                            </th>
                                            <th
                                                className="sorting"
                                                tabIndex={0}
                                                rowSpan={1}
                                                colSpan={1}
                                            >
                                                TP
                                            </th>
                                            <th
                                                className="sorting"
                                                tabIndex={0}
                                                rowSpan={1}
                                                colSpan={1}
                                            >
                                                P/L($)
                                            </th>
                                            <th
                                                className="sorting"
                                                tabIndex={0}
                                                rowSpan={1}
                                                colSpan={1}
                                            ></th>
                                            <th
                                                className="sorting"
                                                tabIndex={0}
                                                rowSpan={1}
                                                colSpan={1}
                                            ></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {portfolio?.length > 0 && [...portfolio]?.filter(i => i.crypto_name == coin)?.slice(start, end)?.map((data, ind) => {
                                            // let coinImg = require(`../../../icons/coins/bzzone.png`);
                                            // let coinImg = require(`../../../icons/coins/${data.crypto_name}.png`);
                                            let coinImg = cryptoicons[data?.crypto_symbol];
                                            //   let perPrice = perCoinData[ind]?.quote?.USD?.price;
                                            return (
                                                <tr
                                                    key={data?.id}
                                                    role="row"
                                                    className="even market-trbg"
                                                >
                                                    <td className="sorting_1">
                                                        <div
                                                            className="d-flex align-items-center"
                                                        //   onClick={() =>
                                                        //     props.history.push(
                                                        //       `/portfolio/breakdown/${data.crypto_name}`
                                                        //     )
                                                        //   }
                                                        >
                                                            <img src={coinImg} width="40" height="40" />
                                                            <div className="mx-2 ">
                                                                <p className="mb-0 inline">
                                                                    Buy {data.crypto_name}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        ${data?.trade}
                                                    </td>
                                                    <td>
                                                        {(data.trade / data.crypto_purchase_price).toFixed(
                                                            4
                                                        )}
                                                    </td>

                                                    <td>
                                                        <CurrencyFormat
                                                            value={data?.crypto_purchase_price}
                                                            displayType={"text"}
                                                            // decimalSeparator={true}
                                                            decimalScale={2}
                                                            thousandSeparator={true}
                                                            prefix={"$"}
                                                            fixedDecimalScale={true}
                                                            renderText={(value) => (
                                                                <span>{value}</span>
                                                            )}
                                                        />
                                                        {/* {data?.crypto_purchase_price} */}
                                                    </td>
                                                    <td>
                                                        <CurrencyFormat
                                                            value={coinData.filter(i => i?.name == data?.crypto_name)[0]?.price}
                                                            displayType={"text"}
                                                            // decimalSeparator={true}
                                                            decimalScale={2}
                                                            thousandSeparator={true}
                                                            prefix={"$"}
                                                            fixedDecimalScale={true}
                                                            renderText={(value) => (
                                                                <span>{value}</span>
                                                            )}
                                                        />
                                                        {/* {coinData.filter(i => i?.name == data?.crypto_name)[0]?.price} */}
                                                    </td>
                                                    <td>
                                                        {!data.stop_loss ? (
                                                            <Button
                                                                //   className="me-4"
                                                                variant="outline-light btn-square"
                                                                onClick={() => {
                                                                    setModalTradeEdit(true);
                                                                    setCloseId(data?.id);
                                                                    setSelectedCoin({ coinImg, data });
                                                                }}
                                                            >
                                                                ...
                                                            </Button>
                                                        ) : (
                                                            <Button
                                                                //   className="me-4"
                                                                variant="outline-light btn-square"
                                                                onClick={() => {
                                                                    setModalTradeEdit(true);
                                                                    setCloseId(data?.id);
                                                                    setSelectedCoin({ coinImg, data });
                                                                }}
                                                            >
                                                                {data?.stop_loss}
                                                            </Button>
                                                        )}
                                                    </td>
                                                    <td>
                                                        {!data.take_profit ? (
                                                            <Button
                                                                //   className="me-4"
                                                                variant="outline-light btn-square"
                                                                onClick={() => {
                                                                    setModalTradeEdit(true);
                                                                    setCloseId(data?.id);
                                                                    setSelectedCoin({ coinImg, data });
                                                                }}
                                                            >
                                                                ...
                                                            </Button>
                                                        ) : (
                                                            <Button
                                                                //   className="me-4"
                                                                variant="outline-light btn-square"
                                                                onClick={() => {
                                                                    setModalTradeEdit(true);
                                                                    setCloseId(data?.id);
                                                                    setSelectedCoin({ coinImg, data });
                                                                }}
                                                            >
                                                                {data.take_profit}
                                                            </Button>
                                                        )}
                                                    </td>

                                                    <td
                                                        className={`${Math.sign(
                                                            cvalue(
                                                                data?.crypto_name,
                                                                data?.crypto_purchase_price
                                                            )
                                                        ) === 1
                                                            ? "text-success"
                                                            : "text-danger"
                                                            }`}

                                                    // className={`${
                                                    //   (sameCoin[ind]?.quote?.USD?.price -
                                                    //     data?.crypto_purchase_price) *
                                                    //     (data?.trade / data?.crypto_purchase_price) >
                                                    //   0
                                                    //     ? "text-success mb-0 "
                                                    //     : "text-danger mb-0"
                                                    // }`}
                                                    >
                                                        ${(cvalue(
                                                            data?.crypto_name,
                                                            data?.crypto_purchase_price
                                                        ) * (data.trade / data.crypto_purchase_price)).toFixed(2)}
                                                        {/* {(
                              (sameCoin[ind]?.quote?.USD?.price -
                                data?.crypto_purchase_price) *
                              (data?.trade / data?.crypto_purchase_price)
                            ).toFixed(2)} */}
                                                    </td>
                                                    <td>

                                                        <Button
                                                            className="me-2"
                                                            variant="outline-danger"
                                                            onClick={() => {
                                                                getCoinData(data?.crypto_name, coinImg, data);
                                                                setModalTradeClose(true);
                                                                setCloseId(data?.id);
                                                                setSelectedCoin(data);
                                                            }}
                                                        >
                                                            Close
                                                        </Button>
                                                    </td>
                                                    {/* <td>
                                                        <Dropdown className="dropdown ms-auto text-right">
                                                            <Dropdown.Toggle
                                                                variant=""
                                                                className="btn-link i-false"
                                                                data-toggle="dropdown"
                                                            >
                                                                <svg
                                                                    width="24px"
                                                                    height="24px"
                                                                    viewBox="0 0 24 24"
                                                                    version="1.1"
                                                                >
                                                                    <g
                                                                        stroke="none"
                                                                        strokeWidth={1}
                                                                        fill="none"
                                                                        fillRule="evenodd"
                                                                    >
                                                                        <rect x={0} y={0} width={24} height={24} />
                                                                        <circle
                                                                            fill="#000000"
                                                                            cx={5}
                                                                            cy={12}
                                                                            r={2}
                                                                        />
                                                                        <circle
                                                                            fill="#000000"
                                                                            cx={12}
                                                                            cy={12}
                                                                            r={2}
                                                                        />
                                                                        <circle
                                                                            fill="#000000"
                                                                            cx={19}
                                                                            cy={12}
                                                                            r={2}
                                                                        />
                                                                    </g>
                                                                </svg>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                                                                <Dropdown.Item>Asset</Dropdown.Item>
                                                                <Dropdown.Item>Close</Dropdown.Item>
                                                                <Dropdown.Item>Open New Trade</Dropdown.Item>
                                                                <Dropdown.Item>Write New Post</Dropdown.Item>
                                                                <Dropdown.Item>View Chart</Dropdown.Item>
                                                                <Dropdown.Item>Set Price Alert</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </td> */}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                                <div className="d-sm-flex text-center justify-content-between align-items-center mt-4">
                                    <div className="dataTables_info">
                                        Showing {activePag.current * sort + 1} to{" "}
                                        {portfolio?.length > (activePag.current + 1) * sort
                                            ? (activePag.current + 1) * sort
                                            : portfolio?.length}{" "}
                                        of {portfolio?.length} entries
                                    </div>
                                    <div
                                        className="dataTables_paginate paging_simple_numbers my-2"
                                        id="example5_paginate"
                                    >
                                        <Link
                                            className="paginate_button previous disabled"
                                            to="/app-profile"
                                            onClick={() =>
                                                activePag.current > 0 && onClick(activePag.current - 1)
                                            }
                                        >
                                            <i
                                                className="fa fa-angle-double-left"
                                                aria-hidden="true"
                                            ></i>
                                        </Link>
                                        <span>
                                            {paggination.map((number, i) => (
                                                <Link
                                                    key={i}
                                                    to="/app-profile"
                                                    className={`paginate_button  ${activePag.current === i ? "current" : ""
                                                        } `}
                                                    onClick={() => onClick(i)}
                                                >
                                                    {number}
                                                </Link>
                                            ))}
                                        </span>
                                        <Link
                                            className="paginate_button next"
                                            // to="/app-profile"
                                            onClick={() =>
                                                activePag.current + 1 < paggination.length &&
                                                onClick(activePag.current + 1)
                                            }
                                        >
                                            <i
                                                className="fa fa-angle-double-right"
                                                aria-hidden="true"
                                            ></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal className="fade" show={modalTradeClose} centered>
                    <Modal.Header style={{ backgroundColor: themePrimary }}>
                        <Modal.Title className="text-white text-uppercase">
                            {sameCoin && sameCoin[2]?.crypto_name}
                        </Modal.Title>
                        <Button
                            onClick={() => setModalTradeClose(false)}
                            variant=""
                            className="btn-close"
                        ></Button>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="d-flex flex-column">
                            <div className="d-flex mb-4">
                                <img src={cryptoicons[selectedCoin?.crypto_symbol]} alt="img" width="40" height="40" />
                                <div className="mx-2">
                                    <div className=" d-flex">
                                        <p className="mb-0 ">BUY </p>
                                        <h5 className="mb-0 px-1 text-uppercase">
                                            {selectedCoin?.crypto_name}
                                        </h5>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <CurrencyFormat
                                            value={coinData?.find(i => i?.name == selectedCoin?.crypto_name)?.price}
                                            displayType={"text"}
                                            decimalScale={2}
                                            thousandSeparator={true}
                                            prefix={"$"}
                                            fixedDecimalScale={true}
                                            renderText={(value) => <h3 className="mb-0">
                                                {value}
                                            </h3>}
                                        />

                                        <small
                                            className={`${sameCoin && sameCoin[3] > 0
                                                ? "text-success mb-0 px-1"
                                                : "text-danger mb-0 px-1"
                                                }`}
                                        >
                                            {sameCoin && sameCoin[3]?.toFixed(2)}%
                                        </small>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="d-flex w-100 justify-content-between">
                                    <div className="d-flex w-100 flex-column">
                                        <div className="d-flex w-100 justify-content-between">
                                            <h4 className="mb-0">AMOUNT</h4>
                                            <div>
                                                <CurrencyFormat
                                                    value={selectedCoin?.trade}
                                                    displayType={"text"}
                                                    decimalScale={2}
                                                    thousandSeparator={true}
                                                    prefix={"$"}
                                                    fixedDecimalScale={true}
                                                    renderText={(value) => <h3 className="mb-0">{value}</h3>}
                                                />
                                                <p className="mb-0 d-flex justify-content-end">
                                                    {selectedCoin &&
                                                        (
                                                            selectedCoin?.trade /
                                                            selectedCoin?.crypto_purchase_price
                                                        ).toFixed(2)}{" "}
                                                    UNITS
                                                </p>
                                            </div>
                                        </div>
                                        <div className="d-flex w-100 justify-content-between">
                                            <h4 className="mb-0">CURRENT P/L</h4>
                                            <CurrencyFormat
                                                value={(cvalue(
                                                    selectedCoin?.crypto_name,
                                                    selectedCoin?.crypto_purchase_price
                                                ) * (selectedCoin?.trade / selectedCoin?.crypto_purchase_price)).toFixed(2)}
                                                displayType={"text"}
                                                decimalScale={2}
                                                thousandSeparator={true}
                                                prefix={"$"}
                                                fixedDecimalScale={true}
                                                renderText={(value) => <h3
                                                    className={`${sameCoin &&
                                                        sameCoin[0] - sameCoin[2]?.crypto_purchase_price > 0
                                                        ? "text-success mb-0"
                                                        : "text-danger mb-0"
                                                        }`}
                                                >{value}
                                                </h3>
                                                }
                                            />

                                        </div>

                                        <hr />
                                        <div className="d-flex w-100 justify-content-between">
                                            <h4 className="mb-0">TOTAL</h4>
                                            <CurrencyFormat
                                                value={(selectedCoin?.trade + (cvalue(
                                                    selectedCoin?.crypto_name,
                                                    selectedCoin?.crypto_purchase_price
                                                ) * (selectedCoin?.trade / selectedCoin?.crypto_purchase_price))).toFixed(2)}
                                                displayType={"text"}
                                                decimalScale={2}
                                                thousandSeparator={true}
                                                prefix={"$"}
                                                fixedDecimalScale={true}
                                                renderText={(value) => <h3
                                                    className="mb-0"
                                                >{value}
                                                </h3>
                                                }
                                            />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex">
                            <input
                                type="checkbox"
                                className="form-check-input me-2"
                                id="val-terms"
                                name="val-terms"
                                // value="1"
                                checked={partialTrade}
                                value={partialTrade}
                                onClick={() => setPartialTrade(!partialTrade)}
                            />
                            <h5 className="mb-0">Close only part of the trade</h5>
                        </div>

                        {partialTrade && (
                            <div
                                className="d-flex align-items-center justify-content-between"
                                style={{ marginTop: "32px" }}
                            >
                                <div className="mb-3" style={{ flex: 0.2 }}>
                                    <h5 className="d-flex justify-content-center align-items-center">
                                        {isUnits ? "CLOSE UNITS" : "CLOSE AMOUNT"}
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
                                        // value={isUnits ? buyAmount.units : buyAmount.amount}
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

                                {/* <div style={{ flex: 0.2 }}>
                  <div
                    role="button"
                    className="p-2 mb-3 bg-light rounded d-flex align-items-center justify-content-around"
                    onClick={() => setIsUnits(!isUnits)}
                  >
                    <i class="fas fa-exchange-alt"></i>
                    <h4 className="mb-0">{!isUnits ? "UNITS" : "AMOUNT"}</h4>
                  </div>
                </div> */}
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer className="justify-content-center">
                        <Button
                            onClick={partialTrade ? partialcloseTrade : closeTrade}
                            variant="danger"
                            style={{ width: "200px" }}
                        >
                            Close Trade
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/* <Modal className="fade" show={modalTradeEdit} centered>
          <Modal.Header>
            <Modal.Title>{selectedCoin?.data.crypto_name}</Modal.Title>
            <Button
              onClick={() => setModalTradeEdit(false)}
              variant=""
              className="btn-close"
            ></Button>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex flex-column">
              <div className="d-flex mb-4">
                <img src={selectedCoin?.coinImg} width="40" height="40" />
                <div className="mx-2">
                  <div className=" d-flex">
                    <p className="mb-0 ">BUY </p>
                    <h5 className="mb-0 px-1">
                      {selectedCoin?.data.crypto_name}
                    </h5>
                  </div>
                  <div className="d-flex align-items-center">
                    <h3 className="mb-0">Coin Price</h3>
                    <small
             
                    >
                      % change
                    </small>
                  </div>
                </div>
              </div>

              <div>
                <div className="d-flex w-100 justify-content-between">
                  <div className="d-flex w-100 flex-column">
                    <div className="d-flex w-100 justify-content-between">
                      <h4 className="mb-0">INVESTED</h4>
                      <div>
                        <h3 className="mb-0">
                          ${selectedCoin?.data.investment}
                        </h3>
                        <p className="mb-0 d-flex justify-content-end">
                          0.10 Units
                        </p>
                      </div>
                    </div>
                    <div className="d-flex w-100 justify-content-between">
                      <h4 className="mb-0">OPEN</h4>
                      <div>
                        <h3 className="mb-0">
                          ${selectedCoin?.data.investment}
                        </h3>
                        <p className="mb-0 d-flex justify-content-end">
                          1/11/22 12:43
                        </p>
                      </div>
                    </div>
                    <div className="d-flex w-100 justify-content-between">
                      <h4 className="mb-0">CURRENT P/L</h4>
                      <h3 className="mb-0">$-313.18</h3>
                    </div>

                    <hr />
                    <div className="d-flex w-100 justify-content-between">
                      <h4 className="mb-0">TOTAL</h4>
                      <h3 className="mb-0">$-3113.18</h3>
                    </div>
                  </div>
                </div>
                <Col xl={12}>
                  <Card>
                    <Card.Body>
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
                                  className="d-flex align-items-center"
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
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="justify-content-center">
            <Button
              onClick={closeTrade}
              variant="danger"
              style={{ width: "200px" }}
            >
              Edit Trade
            </Button>
          </Modal.Footer>
        </Modal> */}
            </div>

            {/* <div className="position-absolute bottom-0"> */}

            <Card>
                <Row className="p-4 ">
                    <Col lg={3} className="">
                        <div className="text-center">
                            <h4 className="mb-0 " style={{ fontSize: "1.4rem" }}>
                                ${wallet?.balance}
                            </h4>
                            <p className="mb-0 " style={{ fontSize: "1.4rem" }}>
                                Cash Available
                            </p>
                            {/* <h5 className=" display-4">+</h5> */}
                        </div>
                    </Col>
                    <Col lg={3} className="">
                        <div className="text-center">
                            <h4 className="mb-0 " style={{ fontSize: "1.4rem" }}>
                                ${totalInvestment}
                            </h4>
                            <p className="mb-0 " style={{ fontSize: "1.4rem" }}>
                                Total Invested
                            </p>
                            {/* <h5 className=" display-4">+</h5> */}
                        </div>
                    </Col>
                    <Col lg={3} className="">
                        <div className="text-center">
                            <h4 className={"mb-0 " + (profitloss > 0 ? "text-success" : "text-danger")} style={{ fontSize: "1.4rem" }}>
                                ${profitloss.toFixed(2)}
                            </h4>
                            <p className="mb-0" style={{ fontSize: "1.4rem" }}>
                                Profit/Loss
                            </p>
                            {/* <h5 className=" display-4">=</h5> */}
                        </div>
                    </Col>
                    <Col lg={3} className="">
                        <div className="text-center">
                            <h4 className="mb-0" style={{ fontSize: "1.4rem" }}>
                                ${(wallet?.balance + totalInvestment)?.toFixed(2)}
                            </h4>
                            <p className="mb-0 " style={{ fontSize: "1.4rem" }}>
                                Portfolio Value
                            </p>
                        </div>
                    </Col>
                </Row>
            </Card>
            {/* </div> */}
            {/* </div> */}
        </>
    );
}

export default InnerTrade;