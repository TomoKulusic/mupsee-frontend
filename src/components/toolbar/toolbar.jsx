import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./toolbar.css";

class ToolbarComponent extends Component {
  pages = [
    { link: "Search", path: "/search" },
    { link: "Favorites", path: "/favorites" },
    { link: "Contact", path: "/contact" },
  ];

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      filteredData: [],
      wordEntered: "",
    };
  }

  render() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {this.pages.map((page) => (
              <MenuItem key={page.link} component={Link} to={page.path}>
                <Typography textAlign="center">{page.link}</Typography>
              </MenuItem>
            ))}
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}

export default ToolbarComponent;
