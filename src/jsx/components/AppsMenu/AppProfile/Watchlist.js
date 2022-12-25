// import React, { Fragment, useState, useEffect } from "react";
// import PageTitle from "../../../layouts/PageTitle";
// import { ProgressBar } from "react-bootstrap";
// // import { Icon } from "coinmarketcap-cryptocurrency-icons";
// // import coins from "../../../../icons/coins"
// import axios from "axios";
// //cdn.datatables.net/1.13.1/js/jquery.dataTables.min.js

// function Watchlist() {
//   const [change, setChange] = useState("24h");
//   const [coinsData, setCoinsData] = useState([]);

//   useEffect(() => {
//     // getUSerData();
//     fetchData();
//   }, []);
//   const fetchData = async () => {
//     const config = {
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//       },
//     };
//     axios
//       .get(
//         "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=b102e6d8-b50b-4e58-9893-053706a2b065&start=1&limit=25&convert=USD",
//         {
//           headers: {
//             "x-apikey": "b102e6d8-b50b-4e58-9893-053706a2b065",
//             "Access-Control-Allow-Origin": "*",
//             "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
//           },
//         }
//       )
//       .then((res) => {
//         let result = res.data.data;
//         console.log("Res", res.data.data);
//         setCoinsData(res.data.data);
//         // let sorted = result.sort((a, b) => b.name.localeCompare(a.name));
//         // console.log("Sort", sorted);
//         // setCoinsData(sorted);
//       });
//     // console.log("Fetch daat");
//     const res = await axios
//       .get(
//         // "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=b102e6d8-b50b-4e58-9893-053706a2b065"
//         "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
//       )
//       .then((data) => {
//         console.log("Pics", data);
//       });
//   };

//   return (
//     <Fragment>
//       {/* $(coinsData).ready( function () {$("#myTable").DataTable()} ); */}
//       <div className="card-body">
//         <div className="table-responsive">
//           <div className="dataTables_wrapper">
//             <table className="table dataTable display">
//               <thead>
//                 <tr role="row">
//                   <th
//                     className="sorting_asc"
//                     tabIndex={0}
//                     rowSpan={1}
//                     colSpan={1}
//                   >
//                     Markets
//                   </th>
//                   <th className="sorting" tabIndex={0} rowSpan={1} colSpan={1}>
//                     Price
//                   </th>
//                   <th className="sorting" tabIndex={0} rowSpan={1} colSpan={1}>
//                     <div class="dropdown d-flex justify-content-center">
//                       <button
//                         class="btn btn-primary dropdown-toggle"
//                         type="button"
//                         id="dropdownMenuButton"
//                         data-toggle="dropdown"
//                         aria-haspopup="true"
//                         aria-expanded="false"
//                       >
//                         Change {change}
//                       </button>
//                       <div
//                         class="dropdown-menu"
//                         aria-labelledby="dropdownMenuButton"
//                       >
//                         <a
//                           class="dropdown-item"
//                           href="#"
//                           onClick={() => setChange("1h")}
//                         >
//                           Change 1h
//                         </a>
//                         <a
//                           class="dropdown-item"
//                           href="#"
//                           onClick={(e) => {
//                             e.preventDefault();
//                             setChange("24h");
//                           }}
//                         >
//                           Change 24h
//                         </a>
//                         <a
//                           class="dropdown-item"
//                           href="#"
//                           onClick={(e) => {
//                             e.preventDefault();
//                             setChange("7d");
//                           }}
//                         >
//                           Change 7d
//                         </a>
//                       </div>
//                     </div>
//                   </th>
//                   <th className="sorting" tabIndex={0} rowSpan={1} colSpan={1}>
//                     Invest
//                   </th>

//                   {/* <th className="sorting" tabIndex={0} rowSpan={1} colSpan={1}>
//                     Graph
//                   </th> */}
//                   {/* <th
//                     className="bg-none width50 sorting"
//                     tabIndex={0}
//                     aria-controls="example6"
//                     rowSpan={1}
//                     colSpan={1}
//                   /> */}
//                 </tr>
//               </thead>
//               <tbody>
//                 {coinsData.map((data) => {
//                   let coinImg = require(`../../../../icons/coins/${data.slug}.png`);

//                   return (
//                     <>
//                       <tr role="row" className="even market-trbg">
//                         <td className="sorting_1">
//                           <div className="d-flex align-items-center">
//                             <img src={coinImg} width="40" height="40" />
//                             <div className="mx-2 ">
//                               <p className="mb-0">{data.name}</p>
//                               <p className="mb-0">{data.symbol}</p>
//                             </div>
//                           </div>
//                         </td>
//                         <td>${parseFloat(data.quote.USD.price).toFixed(2)}</td>
//                         <td className="d-flex justify-content-center align-items-center p-4">
//                           {/* 16332.32 <br />{" "}
//                 <span className="fs-13 mr-5 text-danger">
//                   <IoMdArrowDropdown /> 241.54(-1.45%)
//                 </span> */}
//                           {/* {data.quote.USD.percent_change_24h} */}
//                           {change === "1h"
//                             ? parseFloat(
//                                 data.quote.USD.percent_change_1h
//                               ).toFixed(2)
//                             : change === "7d"
//                             ? parseFloat(
//                                 data.quote.USD.percent_change_7d
//                               ).toFixed(2)
//                             : parseFloat(
//                                 data.quote.USD.percent_change_24h
//                               ).toFixed(2)}
//                           %
//                         </td>

//                         <td>
//                           {" "}
//                           <button
//                             type="button"
//                             class="btn"
//                             style={{
//                               background: "#3eacff",
//                               color: "white",
//                               padding: "5px 10px",
//                               borderRadius: "7px",
//                             }}
//                           >
//                             Buy Now
//                           </button>
//                         </td>

//                         {/* <td>
//                           <ProgressBar now={70} variant="primary" />
//                         </td> */}
//                       </tr>
//                     </>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </Fragment>
//   );
// }

// export default Watchlist;
