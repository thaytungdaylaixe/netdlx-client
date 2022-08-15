import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import OtoTrangChu from "../../components/nhadat/ndtrangchu";

const OtoHome = () => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  if (user) {
    return <Navigate to="/oto/trangchu" />;
  }

  return <OtoTrangChu />;
};

export default OtoHome;
