import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Box, Fab } from "@mui/material";

import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";

import { dlx } from "../../../redux/slices/dlxSlice";

const HocVien = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => ({ ...state.auth }));

  // dispatch(dlx({ idUser: user.result._id }));

  // const { dtdlx } = useSelector((state) => ({ ...state.datadlx }));

  // console.log(dtdlx);

  useEffect(() => {}, []);

  return (
    <>
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
