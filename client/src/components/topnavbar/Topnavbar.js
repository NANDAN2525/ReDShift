import React from "react";
import "./Topnavbar.css";
import { Typography } from "@mui/material";
import logo from "../../assets/logo.svg";
// import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import ResponsiveAppBar from "../ex/ResponsiveAppBar";
const Topnavbar = () => {
  return (
    <div className="Topnavbar_layout">
      <div className="Topnavbar_img_layout">
        <img src={logo} alt="logo" className="Topnavbar_img" />
      </div>
      <div className="Topnavbar_title">
        <Typography
          variant="h5"
          align="center"
          fontFamily={
            "Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"
          }
          component="div"
        >
          Employee Management System
        </Typography>
      </div>
      <div className="Topnavbar_logbuttons_layout">
        <ResponsiveAppBar sx={{ fontSize: 40 }} />
      </div>
    </div>
  );
};

export default Topnavbar;
