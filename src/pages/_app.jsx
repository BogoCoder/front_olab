import React from "react";

import Routes from "./_routes";
import NavSidebar from "../components/NavSidebar/NavSidebar"

const App = () => {
  return (
    <React.Fragment>

    <NavSidebar />
    <Routes />

    </React.Fragment>

  );
};

export default App;
