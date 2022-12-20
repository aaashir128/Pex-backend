import React, { Fragment, useState } from "react";

import PageTitle from "../../../layouts/PageTitle";
import WatchlistDataTable from "./WatchlistDataTable";

const AppProfile = () => {


  return (
    <Fragment>
      <PageTitle activeMenu="Coins" motherMenu="Watchlist" />

      <div className="row">
        <div className="col-12">
        
          <div className="card">
        
            <WatchlistDataTable />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AppProfile;
