import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

import LeftNav from "./leftnav";
import RightNav from "./rightnav";

export default function NavBar(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <LeftNav {...props} />
          <Box sx={{ flexGrow: 1 }} />
          <IconButton size="large" aria-label="search" color="inherit">
            <SearchIcon />
          </IconButton>
          <RightNav {...props} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
