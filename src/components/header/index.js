import React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

import SearchIcon from "@mui/icons-material/Search";

import LeftNav from "./leftnav";
import RightNav from "./rightnav";

export default function NavBar(props) {
  const { user, MenuItems } = props;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <LeftNav menuLeft={MenuItems.left} hovaten={user?.result?.hovaten} />
          <Box sx={{ flexGrow: 1 }} />
          <IconButton size="large" aria-label="search" color="inherit">
            <SearchIcon />
          </IconButton>
          <RightNav menuRight={MenuItems.right} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

// <RightNav menuRight={menuRight} />
