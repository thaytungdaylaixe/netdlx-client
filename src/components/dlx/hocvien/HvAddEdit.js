import React, { useState, Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { CssBaseline, Button, Box, Typography, Container } from "@mui/material";

import Loading from "../../loading/index";
import Input from "../../form/Input";
import Select from "../../form/Select";
import { trimText, Valid } from "../../../utils/valid";
import DateTimeMui from "../../form/DateTimeMui";

import ChildModal from "./ChildModal";

import { getAllByUser } from "../../../redux/slices/dlxSlice";

const theme = createTheme();

const Register = () => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { sanhoc, nguon, truongthi, khoathi, loading } = useSelector(
    (state) => ({ ...state.datadlx })
  );
  const { datadlx } = useSelector((state) => ({ ...state }));

  // console.log(datadlx);

  const idUser = user?.result?._id;

  const testDisPatch = async () => {
    if (idUser) {
      await dispatch(getAllByUser(idUser));
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    iduser: user?.result?._id,
    sdt: "",
    hovaten: "",
    ngaysinh: new Date(),
    sogiohoc: "",
    ngayvaokhoa: new Date(),

    sanhoc: "",
    nguon: "",
    truongthi: "",
    khoathi: "",
    thietbi: [],
    thitn: [],
    thish: [],
    ghichu: [],

    hinhanh: [],
    tags: [],
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    // const ValidDK = await ValidDangky(formValue);

    // if (ValidDK.countErrors > 0) {
    //   return setErrors(ValidDK.errors);
    // }

    // console.log(formValue);

    // await dispatch(register({ formValue, navigate, toast }));
  };

  const [errors, setErrors] = useState({});

  const inputChange = (data) => {
    const name = trimText(data.name.toString());

    const value = trimText(data.value.toString());

    if (Valid(name, value) === null) {
      if (errors) {
        const newErrors = { ...errors };
        delete newErrors[name]; // or whichever key you want
        setErrors(newErrors);
      }
    } else setErrors({ ...errors, [name]: Valid(name, value) });

    if (name === "cf_password") {
      if (formValue.password !== value) {
        setErrors({ ...errors, [name]: "Mật khẩu không khớp." });
      }
    }

    setFormValue({ ...formValue, [name]: value });
  };

  const inputDateChange = ({ name, value }) => {
    setFormValue({ ...formValue, [name]: value });
  };

  useEffect(() => {
    async function dispatchAll(idUser) {
      if (idUser) {
        await dispatch(getAllByUser(idUser));
      }
    }
    dispatchAll(idUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idUser]);

  const inputForm = [
    {
      id: "sdt",
      label: "Số điện thoại",
      type: "text",
      size: "small",
      autoFocus: true,
    },
    {
      id: "hovaten",
      label: "Họ và tên",
      type: "text",
      size: "small",
    },
    {
      id: "ngaysinh",
      size: "small",
      label: "Ngày sinh",
      type: "DateTime",
      required: true,
    },
    {
      id: "sogiohoc",
      label: "Số giờ học",
      type: "text",
      size: "small",
    },
    {
      id: "ngayvaokhoa",
      size: "small",
      label: "Ngày vào khóa",
      type: "DateTime",
    },

    {
      id: "sanhoc",
      label: "Sân học",
      option: sanhoc,
      type: "modal",
    },

    { id: "nguon", label: "Nguồn", option: nguon, type: "modal" },
    {
      id: "truongthi",
      label: "Trường thi",
      option: truongthi,
      type: "modal",
    },
    { id: "khoathi", label: "Khóa thi", option: khoathi, type: "modal" },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Loading loading={loading} />
        <button onClick={testDisPatch}> Tesst</button>

        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Thêm học viên
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            {inputForm.map((ip, i) => (
              <Fragment key={i}>
                {ip.type === "select" && (
                  <Select
                    name={ip.id}
                    options={ip.options}
                    label="Bạn là ..."
                    error={errors[ip.id] && errors[ip.id]}
                    inputChange={inputChange}
                  />
                )}

                {ip.type === "DateTime" && (
                  <DateTimeMui
                    name={ip.id}
                    label={ip.label}
                    error={null}
                    disabled={false}
                    required={ip.required}
                    valueChange={formValue[ip.id] || new Date()}
                    onInputChange={inputDateChange}
                  />
                )}

                {(ip.type === "text" || ip.type === "password") && (
                  <Input
                    error={errors[ip.id] && errors[ip.id]}
                    name={ip.id}
                    value={formValue[ip.id]}
                    label={ip.label}
                    type={ip.type}
                    size={ip.size}
                    autoFocus={ip.autoFocus}
                    inputChange={inputChange}
                  />
                )}
                {ip.type === "modal" && (
                  <ChildModal
                    name={ip.id}
                    label={ip.label}
                    option={ip.option}
                    onInputChange={inputChange}
                  />
                )}
              </Fragment>
            ))}

            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Button
                onClick={handleSubmit}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Thêm
              </Button>
              <Button
                onClick={() => {
                  navigate("/daylaixe/hocvien");
                }}
                variant="contained"
                color="error"
                sx={{ mt: 3, mb: 2 }}
              >
                Đóng
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;

// <button onClick={testDisPatch}> Tesst</button>

// sanhoc: "",
// nguon: "",
// truongthi: "",
// khoathi: "",
// thietbi: [],
// thitn: [],
// thish: [],
// ghichu: [],

// hinhanh: [],
// tags: [],

// const renderForm = (inputForm) => {
//   for (let i = 0; i < inputForm.length; i++) {
//     const ip = inputForm[i];
//     if (ip.type === "select") {
//       return (
//         <Select
//           name={ip.id}
//           options={ip.options}
//           label="Bạn là ..."
//           error={errors[ip.id] && errors[ip.id]}
//           inputChange={inputChange}
//         />
//       );
//     } else if (ip.type === "DateTime") {
//       return (
//         <DateTimeMui
//           name={ip.id}
//           label={ip.label}
//           error={null}
//           disabled={false}
//           required={ip.required}
//           valueChange={formValue[ip.id] || new Date()}
//           onInputChange={inputChange}
//         />
//       );
//     } else {
//       return (
//         <Input
//           error={errors[ip.id] && errors[ip.id]}
//           name={ip.id}
//           value={formValue[ip.id]}
//           label={ip.label}
//           type={ip.type}
//           size={ip.size}
//           autoFocus={ip.autoFocus}
//           inputChange={inputChange}
//         />
//       );
//     }
//   }
// };
