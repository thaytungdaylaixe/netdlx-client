import React, { useState } from "react";
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
import { Valid, ValidDangNhap } from "../utils/valid";
import { login } from "../redux/slices/authSlice";

const theme = createTheme();

const Login = () => {
  const [formValue, setFormValue] = useState({
    sdt: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const { loading } = useSelector((state) => ({ ...state.auth }));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const ValidDN = await ValidDangNhap(formValue);

    if (ValidDN.countErrors > 0) {
      return setErrors(ValidDN.errors);
    }

    await dispatch(login({ formValue, navigate, toast }));
  };

  const inputChange = ({ name, value }) => {
    if (Valid(name, value) === null) {
      if (errors) {
        const newErrors = { ...errors };
        delete newErrors[name]; // or whichever key you want
        setErrors(newErrors);
      }
    } else setErrors({ ...errors, [name]: Valid(name, value) });

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
            Đăng nhập
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {inputForm.map((ip, i) => (
              <Input
                key={i}
                error={errors[ip.id] && errors[ip.id]}
                name={ip.id}
                value={formValue[ip.id]}
                label={ip.label}
                type={ip.type}
                autoFocus={ip.autoFocus}
                inputChange={inputChange}
              />
            ))}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              đăng nhập
            </Button>
            <Grid container>
              <Grid item xs={12}>
                <Link to="/">
                  <Typography variant="body2">Forgot password?</Typography>
                </Link>
              </Grid>
              <Grid item xs={12}>
                <Link to="/users/register">
                  <Typography variant="body2">
                    {"Bạn chưa có tài khoản ? Đăng ký"}
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

export default Login;

const inputForm = [
  {
    id: "sdt",
    label: "Số điện thoại",
    type: "text",
    autoFocus: true,
  },
  {
    id: "password",
    label: "Mật khẩu",
    type: "password",
  },
];
