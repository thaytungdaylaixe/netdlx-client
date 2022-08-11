import React, { useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loading from "../components/loading";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Input from "../components/form/Input";
import { Valid, ValidDangky } from "../utils/valid";
import { register } from "../redux/slices/authSlice";
import Select from "../components/form/Select";

const theme = createTheme();

const Register = () => {
  const [formValue, setFormValue] = useState({
    sdt: "",
    hovaten: "",
    password: "",
    cf_password: "",
    role: "",
  });

  const { loading } = useSelector((state) => ({ ...state.auth }));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const ValidDK = await ValidDangky(formValue);

    if (ValidDK.countErrors > 0) {
      return setErrors(ValidDK.errors);
    }

    await dispatch(register({ formValue, navigate, toast }));
  };

  const [errors, setErrors] = useState({});

  const inputChange = ({ name, value }) => {
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

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Loading loading={loading} />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Link to="/">
            <Avatar
              src="/iconx/android-72x72.png"
              sx={{ m: 1, width: 72, height: 72 }}
            />
          </Link>
          <Typography component="h1" variant="h5">
            Đăng ký
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
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

                {ip.type !== "select" && (
                  <Input
                    error={errors[ip.id] && errors[ip.id]}
                    name={ip.id}
                    value={formValue[ip.id]}
                    label={ip.label}
                    type={ip.type}
                    autoFocus={ip.autoFocus}
                    inputChange={inputChange}
                  />
                )}
              </Fragment>
            ))}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Đăng ký
            </Button>
            <Grid container>
              <Grid item xs={12}>
                <Link to="/">
                  <Typography variant="body2">Forgot password?</Typography>
                </Link>
              </Grid>
              <Grid item xs={12}>
                <Link to="/users/login">
                  <Typography variant="body2">
                    {"Bạn đã tài khoản ? Đăng nhập"}
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;

const options = [
  { key: "hv", value: "Học viên." },
  { key: "gv", value: "Giáo viên." },
];

const inputForm = [
  {
    id: "sdt",
    label: "Số điện thoại",
    type: "text",
    autoFocus: true,
  },
  {
    id: "hovaten",
    label: "Họ và tên",
    type: "text",
  },
  {
    id: "password",
    label: "Mật khẩu",
    type: "password",
  },
  {
    id: "cf_password",
    label: "Nhập lại mật khẩu",
    type: "password",
  },
  {
    id: "role",
    label: "Bạn là ...",
    type: "select",
    options: options,
  },
];
