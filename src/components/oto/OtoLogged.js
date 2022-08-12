import { Navigate, useOutlet } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "../css/Layout.module.css";

import Footer from "../footer";
import Header from "../header";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";

import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

const OtoLogged = () => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const outlet = useOutlet();

  if (!user) {
    return <Navigate to="/users/login" replace />;
  }

  const MenuItems = {
    left: [
      {
        text: "Trang chủ",
        link: "/",
        icon: <HomeOutlinedIcon />,
      },
      {
        text: "Dạy lái xe",
        link: "/daylaixe",
        icon: <AutoStoriesOutlinedIcon />,
      },
      {
        text: "Nhà đất",
        link: "/nhadat",
        icon: <HomeWorkOutlinedIcon />,
      },

      { divider: true },
      {
        text: "Đăng tin",
        link: "/oto/add",
        icon: <AddCircleOutlineOutlinedIcon />,
      },
      {
        text: "Đăng tin",
        link: "/oto/edit/abc",
        icon: <AddCircleOutlineOutlinedIcon />,
      },
    ],
    right: [
      {
        text: "Thoát",
        link: "/dashboard/logout",
        icon: <LogoutOutlinedIcon />,
      },
      { divider: true },
      {
        text: "Profile",
        link: "/dashboard/profile",
        icon: <AccountCircleOutlinedIcon />,
      },
      {
        text: "Settings",
        link: "/dashboard/settings",
        icon: <SettingsOutlinedIcon />,
      },
    ],
  };

  return (
    <>
      <Header MenuItems={MenuItems} user={user} />
      <div className={styles.main}>{outlet}</div>

      <Footer />
    </>
  );
};

export default OtoLogged;
