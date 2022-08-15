import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import HomeTrangchu from "../components/home/trangchu";

const Home = () => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return <HomeTrangchu />;
};

export default Home;
