import { Navigate, useOutlet } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "../css/Layout.module.css";
import Footer from "../footer";
import Header from "../header";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import LoginIcon from "@mui/icons-material/Login";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

const HomeLayOut = () => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const outlet = useOutlet();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const MenuItems = {
    left: [
      { text: "Trang chủ", icon: <HomeOutlinedIcon />, link: "/" },
      { text: "Trang chủ", icon: <HomeOutlinedIcon />, link: "/" },

      {
        divider: true,
      },
      { text: "Trang chủ", icon: <HomeOutlinedIcon />, link: "/" },
      { text: "Trang chủ", icon: <HomeOutlinedIcon />, link: "/" },
    ],
    right: [
      { text: "Đăng nhập", icon: <LoginIcon />, link: "/users/login" },
      {
        text: "Đăng ký",
        icon: <AddCircleOutlineOutlinedIcon />,
        link: "/users/register",
      },
    ],
  };

  return (
    <>
      <Header MenuItems={MenuItems} user={user} />
      <div className={styles.main}>{outlet}</div> <Footer />
    </>
  );
};

export default HomeLayOut;
