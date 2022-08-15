import { useOutlet } from "react-router-dom";

import styles from "../css/Layout.module.css";
import Footer from "../footer";
import Header from "../header";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";

import LoginIcon from "@mui/icons-material/Login";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

const HomeLayOut = () => {
  const outlet = useOutlet();

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
      {
        text: "Mua bán Ôtô",
        link: "/oto",
        icon: <DirectionsCarFilledOutlinedIcon />,
      },

      {
        divider: true,
      },
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
      <Header MenuItems={MenuItems} />
      <div className={styles.main}>{outlet}</div> <Footer />
    </>
  );
};

export default HomeLayOut;
