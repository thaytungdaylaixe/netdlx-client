import React, { useState } from "react";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const hoten = (hovaten) => {
  if (hovaten) {
    const myArray = hovaten.split(" ");
    return myArray.length > 1
      ? myArray[0] + " " + myArray[myArray.length - 1]
      : myArray[0];
  }
};

export default function LeftNav(props) {
  const {
    MenuItems: { left },
    user,
  } = props;

  const hovaten = user?.result?.hovaten;

  const [stateNav, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...stateNav, [anchor]: open });
  };

  const leftSlide = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={props.clickClose}
      onKeyDown={props.clickClose}
    >
      <List>
        {left.map((navlink, index) =>
          navlink.divider ? (
            <Divider key={index} />
          ) : (
            <Link
              to={navlink.link}
              key={index}
              onClick={toggleDrawer("left", false)}
            >
              <ListItem disablePadding onClick={navlink.onClick}>
                <ListItemButton>
                  <ListItemIcon sx={{ color: "#1976D2" }}>
                    {navlink.icon}
                  </ListItemIcon>

                  <ListItemText
                    sx={{ color: "#1976D2" }}
                    primary={navlink.text}
                    // secondary="testing"
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          )
        )}
      </List>
    </Box>
  );

  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ mr: 2 }}
        onClick={toggleDrawer("left", true)}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h8" component="div">
        {hoten(hovaten)}
      </Typography>
      <Drawer
        anchor="left"
        open={stateNav["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {leftSlide("left")}
      </Drawer>
    </>
  );
}
