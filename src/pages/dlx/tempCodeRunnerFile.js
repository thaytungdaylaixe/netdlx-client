import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import DlxTrangChu from "../../components/dlx/dlxtrangchu";

const DlxHome = () => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  if (user) {
    return <Navigate to="/daylaixe/trangchu" />;
  }

  return <DlxTrangChu />;
};

export default DlxHome;
