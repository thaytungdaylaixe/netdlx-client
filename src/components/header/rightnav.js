import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MoreIcon from "@mui/icons-material/MoreVert";
import RightSlideNav from "./rightslidenav";

import Drawer from "@mui/material/Drawer";

export default function RightNav(props) {
  const [stateNav, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const { menuRight } = props;

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...stateNav, [anchor]: open });
  };

  return (
    <>
      <IconButton
        size="large"
        aria-label="show more"
        color="inherit"
        onClick={toggleDrawer("right", true)}
      >
        <MoreIcon />
      </IconButton>
      <Drawer
        anchor="right"
        open={stateNav["right"]}
        onClose={toggleDrawer("right", false)}
      >
        <RightSlideNav
          menuRight={menuRight}
          onClose={toggleDrawer("right", false)}
        />
      </Drawer>
    </>
  );
}
