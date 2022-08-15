import React from "react";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

export default function RightSlideNav(props) {
  const {
    MenuItems: { right },
    onClose,
    Logout,
    user,
  } = props;

  const rightSlide = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={onClose}
      onKeyDown={onClose}
    >
      <List>
        {user && (
          <ListItem disablePadding onClick={Logout}>
            <ListItemButton>
              <ListItemIcon sx={{ color: "#1976D2" }}>
                <LogoutOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                sx={{ color: "#1976D2" }}
                primary="Thoát"
                // secondary="testing"
              />
            </ListItemButton>
          </ListItem>
        )}

        {right.map((navlink, index) =>
          navlink.divider ? (
            <Divider key={index} />
          ) : (
            <Link to={navlink.link} key={index} onClick={onClose}>
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

  return <>{rightSlide("abc")}</>;
}
