import React, { cloneElement, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Loading from "../../loading";
import { Box, Modal, Button, TextField } from "@mui/material";

import {
  createData,
  deleteByUser,
  deleteDataDlx,
} from "../../../redux/slices/dlxSlice";
import { useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

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

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const ChildModal = (props) => {
  const [dense, setDense] = useState(false);
  const [secondary, setSecondary] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => ({ ...state.auth }));
  const { loading } = useSelector((state) => ({ ...state.datadlx }));

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

    const formValue = { idUser, name, label, value: data };

    let o = option.find((o) => o.value === data);

    if (!o) {
      await dispatch(createData({ formValue, navigate, toast }));
      setData("");
    } else toast.error(label + " " + data + " đã tồn tại.");

    setDataInputButton(data);
  };

  const deleteAction = async (data) => {
    const formValue = { ...data, name };

    await dispatch(deleteByUser({ formValue, navigate, toast }));
  };

  const editAction = async (e) => {
    console.log("editAction");
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
          <Loading loading={loading} />

          <h2 style={{ textAlign: "center" }} id="parent-modal-title">
            {label}
          </h2>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <Box style={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                margin="normal"
                size="small"
                required
                fullWidth
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
            </Box>
            <Box style={{ display: "flex", justifyContent: "space-around" }}>
              <Button
                margin="normal"
                size="small"
                variant="contained"
                sx={{ width: 60 }}
                onClick={addButtonAction}
              >
                Thêm
              </Button>
              <Button
                color="error"
                onClick={handleClose}
                style={{
                  color: "red",
                }}
              >
                Đóng
              </Button>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1, width: "100%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Demo>
                  <List dense={dense}>
                    {option &&
                      option
                        .filter(({ value }) =>
                          value.toLowerCase().includes(data.toLowerCase())
                        )
                        .sort((a, b) => {
                          return a.value - b.value;
                        })
                        .map((opt, i) => (
                          <Fragment key={i}>
                            <ListItem
                              secondaryAction={
                                <>
                                  <Button
                                    size="small"
                                    sx={{ minWidth: "0" }}
                                    onClick={editAction}
                                  >
                                    <ModeEditOutlineOutlinedIcon />
                                  </Button>

                                  <Button
                                    sx={{ minWidth: "0" }}
                                    size="small"
                                    color="error"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      deleteAction(opt);
                                    }}
                                  >
                                    <DeleteOutlinedIcon />
                                  </Button>
                                </>
                              }
                            >
                              <ListItemText
                                primary={opt.value}
                                secondary={secondary ? "Secondary text" : null}
                                style={{ cursor: "pointer" }}
                                onClick={async (e) => {
                                  e.preventDefault();
                                  setDataInputButton(opt.value);
                                  setData("");
                                  onInputChange({ name, value: opt._id });
                                  handleClose();
                                }}
                              />
                            </ListItem>
                          </Fragment>
                        ))}
                  </List>
                </Demo>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ChildModal;

// {
//   option &&
//     option
//       .filter(({ value }) => value.toLowerCase().includes(data.toLowerCase()))
//       .sort((a, b) => {
//         return a.value - b.value;
//       })
//       .map((opt, i) => (
//         <div
//           key={i}
//           onClick={async (e) => {
//             e.preventDefault();
//             setDataInputButton(opt.value);
//             setData("");
//             onInputChange({ name, value: opt._id });
//             handleClose();
//           }}
//         >
//           {opt.value}
//         </div>
//       ));
// }
