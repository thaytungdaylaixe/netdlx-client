import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Box, Fab } from "@mui/material";

import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";

import { getAllByUser } from "../../../redux/slices/hvSlice";

import CardMui from "../../form/CardMui";

const HocVien = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => ({ ...state.auth }));
  const { hv } = useSelector((state) => ({ ...state.hv }));

  const idUser = user?.result?._id;

  console.log(hv);

  // dispatch(dlx({ idUser: user.result._id }));

  // const { dtdlx } = useSelector((state) => ({ ...state.datadlx }));

  // console.log(dtdlx);

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
      {hv.map((infoHv, i) => (
        <CardMui {...infoHv} key={i} style={{ paddingLeft: "15px" }} />
      ))}

      <Box
        sx={{
          "& > :not(style)": { m: 1 },
          position: "fixed",
          bottom: 20,
          right: 20,
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
