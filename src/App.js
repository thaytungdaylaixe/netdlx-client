import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/slices/authSlice";

import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import NoHeader from "./components/layout/NoHeader";
import HomeLayOut from "./components/layout/HomeLayOut";
import Logged from "./components/layout/Logged";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SignOut from "./pages/SignOut";

import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

import DlxLogged from "./components/dlx/DlxLogged";
import DlxHome from "./pages/dlx/DlxHome";
import Hocvien from "./pages/Hocvien";

import NdLogged from "./components/nhadat/NdLogged";
import NdHome from "./pages/nhadat/NdHome";

import OtoLogged from "./components/oto/OtoLogged";
import OtoHome from "./pages/oto/OtoHome";
import OtoAddEdit from "./pages/oto/OtoAddEdit";

import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    dispatch(setUser(user));
  });

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
        </Route>

        <Route path="/users" element={<NoHeader />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/dashboard" element={<Logged />}>
          <Route path="" element={<Home />} />

          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="logout" element={<SignOut />} />
        </Route>

        <Route path="/daylaixe" element={<DlxLogged />}>
          <Route path="" element={<DlxHome />} />
          <Route path="hocvien" element={<Hocvien />} />
        </Route>

        <Route path="/nhadat" element={<NdLogged />}>
          <Route path="" element={<NdHome />} />
        </Route>

        <Route path="/oto" element={<OtoLogged />}>
          <Route path="" element={<OtoHome />} />
          <Route path="add" element={<OtoAddEdit />} />
          <Route path="edit/:id" element={<OtoAddEdit />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
