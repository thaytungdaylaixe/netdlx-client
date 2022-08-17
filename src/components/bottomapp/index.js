import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";

export default function LabelBottomNavigation(props) {
  const navigate = useNavigate();

  const { BottomAppData } = props;
  const [value, setValue] = useState(
    localStorage.getItem("link_refresh") || "/daylaixe/trangchu"
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
    localStorage.setItem("link_refresh", newValue);
  };

  useEffect(() => {
    navigate(`${value}`);
  }, [value]);

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        sx={{ maxWidth: "100%" }}
        style={{ background: "#1976D2" }}
        value={value}
        onChange={handleChange}
      >
        {BottomAppData.map((prop, i) => (
          <BottomNavigationAction
            key={i}
            style={{ color: "white" }}
            label={prop.label}
            value={prop.value}
            icon={prop.icon}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}

// navigate(`/daylaixe/${value}`);
