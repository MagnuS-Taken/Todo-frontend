import React from "react";

import Topbar from "../components/Topbar";
import Feed from "../components/Feed";

export default function Home() {
  return (
    <React.Fragment>
      <Topbar />
      <div className="d-flex" style={{ paddingTop: "70px" }}>
        <Feed />
      </div>
    </React.Fragment>
  );
}
