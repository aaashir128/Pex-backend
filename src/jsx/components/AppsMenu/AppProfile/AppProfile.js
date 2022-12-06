import React, { Fragment, useState } from "react";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SRLWrapper } from "simple-react-lightbox";
//** Import Image */
import profile01 from "../../../../images/profile/1.jpg";
import profile02 from "../../../../images/profile/2.jpg";
import profile03 from "../../../../images/profile/3.jpg";
import profile04 from "../../../../images/profile/4.jpg";
import profile05 from "../../../../images/profile/5.jpg";
import profile06 from "../../../../images/profile/6.jpg";
import profile07 from "../../../../images/profile/7.jpg";
import profile08 from "../../../../images/profile/8.jpg";
import profile09 from "../../../../images/profile/9.jpg";
import profile from "../../../../images/profile/profile.png";
import PageTitle from "../../../layouts/PageTitle";
import SortingTable from "../../table/SortingTable/SortingTable";
// import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { ProgressBar } from "react-bootstrap";
import { useEffect } from "react";
// import { Icon } from "coinmarketcap-cryptocurrency-icons";
import Watchlist from "./Watchlist";
import WatchlistDataTable from "./WatchlistDataTable";

// import bitcoin from "../../../../icons/flaticon/bitcoin.jpg";
const AppProfile = () => {
  const [activeToggle, setActiveToggle] = useState("posts");
  const [sendMessage, setSendMessage] = useState(false);
  const [postModal, setPostModal] = useState(false);
  const [cameraModal, setCameraModal] = useState(false);
  const [linkModal, setLinkModal] = useState(false);
  const [replayModal, setReplayModal] = useState(false);
  const [coinsData, setCoinsData] = useState([]);
  const [order, setOrder] = useState("ASC");
  const [change, setChange] = useState("24h");
  const options = {
    settings: {
      overlayColor: "#000000",
    },
  };

  // const sorting = (col) => {
  //   if (order === "ASC") {
  //     const sorted = [...coinsData].sort((a, b) => {
  //       a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1;
  //     });
  //     setCoinsData(sorted);
  //     setOrder("DSC");
  //   }
  //   if (order === "DSC") {
  //     const sorted = [...coinsData].sort((a, b) => {
  //       a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1;
  //     });
  //     setCoinsData(sorted);
  //     setOrder("ASC");
  //   }
  // };
  return (
    <Fragment>
      <PageTitle activeMenu="Coins" motherMenu="Watchlist" />

      <div className="row">
        <div className="col-12">
          {/* <SortingTable /> */}
          {/* <SortingTable /> */}
          <div className="card">
            {/* <div className="card-header">
              <h4 className="card-title">Watchlist</h4>
            </div> */}
            {/* <Watchlist /> */}
            <WatchlistDataTable />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AppProfile;
