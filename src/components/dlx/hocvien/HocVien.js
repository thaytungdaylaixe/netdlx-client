import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Box, Fab } from "@mui/material";

import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";

import { getAllByUser } from "../../../redux/slices/hvSlice";

import CardMui from "../../form/CardMui";

const SortFullName = (fullname) => {
  return [...fullname].sort((a, b) => {
    let a_sp = a.hovaten.split(" ")[a.hovaten.split(" ").length - 1];
    let b_sp = b.hovaten.split(" ")[b.hovaten.split(" ").length - 1];

    return a_sp.localeCompare(b_sp);
  });
};

const HocVien = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => ({ ...state.auth }));
  const { hv } = useSelector((state) => ({ ...state.hv }));

  const idUser = user?.result?._id;

  useEffect(() => {
    async function dispatchAll(idUser) {
      if (idUser) {
        await dispatch(getAllByUser(idUser));
      }
    }
    dispatchAll(idUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idUser]);

  return (
    <>
      {SortFullName(hv).map((infoHv, i) => (
        <CardMui {...infoHv} key={i} style={{ paddingLeft: "15px" }} />
      ))}

      <Box
        sx={{
          "& > :not(style)": { m: 1 },
          position: "fixed",
          bottom: 60,
          right: 10,
        }}
        onClick={() => {
          navigate("/daylaixe/add");
        }}
      >
        <Fab color="primary" aria-label="add">
          <PersonAddAltOutlinedIcon />
        </Fab>
      </Box>
    </>
  );
};

export default HocVien;
