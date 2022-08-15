import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import NdTrangChu from "../../components/nhadat/ndtrangchu";

const NdHome = () => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  if (user) {
    return <Navigate to="/nhadat/trangchu" />;
  }

  return <NdTrangChu />;
};

export default NdHome;
