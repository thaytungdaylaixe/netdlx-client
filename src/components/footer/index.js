import * as React from "react";
import { Link } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" to="/">
        Thầy Tùng - Dạy lái xe
      </Link>{" "}
      2022
    </Typography>
  );
}

export default function StickyFooter() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",

        width: "100%",
      }}
    >
      <CssBaseline />

      <Box
        component="footer"
        sx={{
          py: 2,
          px: 1,
          mt: "60px",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}

// sx={{
//   display: "flex",
//   flexDirection: "column",
//   position: "fixed",
//   bottom: 0,
//   right: 0,
//   width: "100%",
// }}
