import { Navigate, useOutlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setLogout } from "../../redux/slices/authSlice";

import styles from "../css/Layout.module.css";

import Header from "../header";
import Footer from "../footer";
import BottomApp from "../bottomapp";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";

const BottomAppData = [
  {
    label: "Trang chủ",
    value: "/daylaixe/trangchu",
    icon: <DirectionsCarFilledOutlinedIcon />,
  },
  {
    label: "Học viên",
    value: "/daylaixe/hocvien",
    icon: <PeopleOutlinedIcon />,
  },
  {
    label: "Lịch thi",
    value: "/daylaixe/lichthi",
    icon: <CalendarMonthIcon />,
  },
  {
    label: "TKB",
    value: "/daylaixe/thoikhoabieu",
    icon: <ScheduleOutlinedIcon />,
  },
];

const DlxLogged = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({
    ...state.auth,
  }));

  const Logout = () => {
    dispatch(setLogout());
    <Navigate to="/" replace />;
  };

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
      {
        text: "Mua bán Ôtô",
        link: "/oto",
        icon: <DirectionsCarFilledOutlinedIcon />,
      },
      { divider: true },
    ],
    right: [
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
      <Header MenuItems={MenuItems} user={user} Logout={Logout} />
      <div className={styles.main}>{outlet}</div>

      <Footer />
      <BottomApp BottomAppData={BottomAppData} />
    </>
  );
};

export default DlxLogged;
