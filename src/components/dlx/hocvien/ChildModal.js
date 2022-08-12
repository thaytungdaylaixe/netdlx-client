import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { Box, Modal, Button, TextField } from "@mui/material";

import { createSanhoc } from "../../../redux/slices/dlxSlice";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  bgcolor: "background.paper",
  border: "1px solid secondary",
  boxShadow: 24,
  px: 2,
  overflow: "scroll",
  height: "100%",
};

const ChildModal = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => ({ ...state.auth }));

  const idUser = user?.result?._id;

  const [open, setOpen] = useState(false);

  const [data, setData] = useState("");
  const [dataInputButton, setDataInputButton] = useState("");

  const { name, label, option, onInputChange } = props;

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const addButtonAction = async (e) => {
    e.preventDefault();

    const formValue = { idUser, name, value: data };

    await dispatch(createSanhoc({ formValue, navigate, toast }));

    setDataInputButton(data);
    setData("");
  };

  return (
    <>
      <TextField
        size="small"
        margin="normal"
        fullWidth
        label={label}
        onClick={handleOpen}
        value={dataInputButton || ""}
        disabled={true}
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, maxWidth: 600 }}>
          <Button
            variant="outlined"
            color="error"
            sx={{ m: 4 }}
            onClick={handleClose}
            style={{
              color: "red",
              position: "fixed",
              bottom: "0",
              right: "0px",
            }}
          >
            Đóng
          </Button>

          <h2 style={{ textAlign: "center" }} id="parent-modal-title">
            {label}
          </h2>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <Box style={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                margin="normal"
                size="small"
                required
                sx={{ width: 250 }}
                id={name}
                label={label}
                name={name}
                autoComplete={name}
                value={data || ""}
                autoFocus
                onChange={(e) => {
                  e.preventDefault();
                  const { value } = e.target;

                  setData(value);
                }}
              />

              <Button
                margin="normal"
                size="small"
                variant="contained"
                sx={{ mt: 2, mb: 2, width: 60 }}
                onClick={addButtonAction}
              >
                Thêm
              </Button>
            </Box>
          </Box>

          {option &&
            option
              .filter(({ value }) =>
                value.toLowerCase().includes(data.toLowerCase())
              )
              .sort((a, b) => {
                return a.value - b.value;
              })
              .map((opt, i) => (
                <div
                  key={i}
                  onClick={async (e) => {
                    e.preventDefault();
                    setDataInputButton(opt.value);
                    setData("");
                    onInputChange({ name, value: opt._id });
                    handleClose();
                  }}
                >
                  {opt.value}
                </div>
              ))}
        </Box>
      </Modal>
    </>
  );
};

export default ChildModal;
