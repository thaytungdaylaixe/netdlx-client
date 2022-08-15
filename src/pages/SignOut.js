import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setLogout } from "../redux/slices/authSlice";

const SignOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setLogout());

    navigate("/");
  });

  return (
    <>
      Bạn đã đăng xuất, vui lòng đăng nhập lại:{" "}
      <Link to="/login"> Đăng nhập.</Link>
    </>
  );
};

export default SignOut;
