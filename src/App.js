import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import NoHeader from "./components/layout/NoHeader";
import HomeLayOut from "./components/layout/HomeLayOut";
import Logged from "./components/layout/Logged";

import Home from "./pages/Home";
import HomeTrangchu from "./components/home/trangchu";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

import DlxLogged from "./components/dlx/DlxLogged";
import DlxHome from "./pages/dlx/DlxHome";

import DlxTrangChu from "./components/dlx/dlxtrangchu";
import Hocvien from "./components/dlx/hocvien/HocVien";
import HvAddEdit from "./components/dlx/hocvien/HvAddEdit";

import NdLogged from "./components/nhadat/NdLogged";
import NdTrangChu from "./components/nhadat/ndtrangchu";
import NdHome from "./pages/nhadat/NdHome";
import Dangtin from "./pages/nhadat/Dangtin";

import OtoLogged from "./components/oto/OtoLogged";
import OtoTrangChu from "./components/oto/ototrangchu";
import OtoHome from "./pages/oto/OtoHome";
import OtoAddEdit from "./pages/oto/OtoAddEdit";

import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        className="toast-position"
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route element={<HomeLayOut />}>
          <Route path="" element={<Home />} />
          <Route path="daylaixe" element={<DlxHome />} />
          <Route path="oto" element={<OtoHome />} />
          <Route path="nhadat" element={<NdHome />} />
        </Route>
        <Route path="/users" element={<NoHeader />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/dashboard" element={<Logged />}>
          <Route path="" element={<HomeTrangchu />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="/daylaixe" element={<DlxLogged />}>
          <Route path="trangchu" element={<DlxTrangChu />} />
          <Route path="hocvien" element={<Hocvien />} />
          <Route path="add" element={<HvAddEdit />} />
          <Route path="edit/:id" element={<HvAddEdit />} />
        </Route>

        <Route path="/nhadat" element={<NdLogged />}>
          <Route path="trangchu" element={<NdTrangChu />} />
          <Route path="dangtin" element={<Dangtin />} />
        </Route>

        <Route path="/oto" element={<OtoLogged />}>
          <Route path="trangchu" element={<OtoTrangChu />} />
          <Route path="add" element={<OtoAddEdit />} />
          <Route path="edit/:id" element={<OtoAddEdit />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// <Route path="/daylaixe" element={<DlxLogged />}>
//   <Route path="" element={<DlxHome />} />
//   <Route path="hocvien" element={<Hocvien />} />
//   <Route path="add" element={<HvAddEdit />} />
//   <Route path="edit/:id" element={<HvAddEdit />} />
// </Route>;
