import { useState } from "react";
import { Tooltip } from "@mui/material";
import {
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Box,
} from "@mui/material";
import {
  AccountCircle,
  Business,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import "./Sidenavbar.css";

const SideNavbar = ({ openEmployess, setopenEmployess }) => {
  const [selected, setSelected] = useState("employees");
  const [expanded, setExpanded] = useState(false);

  const toggleSelected = (item) => {
    if (item === selected) {
      setSelected(null);
    } else {
      setSelected(item);
    }
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="sidenavbar_layout">
      <List  className="sidenavbar_list" sx={{}}>
        <Tooltip title="Employees">
          <ListItemButton
            onClick={() => {
              setopenEmployess(!openEmployess);
              toggleSelected("employees");
            }}
            selected={selected === "employees"}
            sx={{
              backgroundColor:
                selected === "employees" ? "#e0e0e0" : "transparent",
              color:
                selected === "employees" ? "primary.main" : "text.secondary",
              "&:hover": {
                backgroundColor: "grey.100",
              },
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
            }}
          >
            <ListItemIcon
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AccountCircle />
            </ListItemIcon>
            {expanded && (
              <>
                <ListItemText primary="Employees" />
                <Box sx={{ flexGrow: 1 }} />
              </>
            )}
          </ListItemButton>
        </Tooltip>
        <Tooltip title="Projects">
          <ListItemButton
            onClick={() => toggleSelected("projects")}
            selected={selected === "projects"}
            sx={{
              backgroundColor:
                selected === "projects" ? "#e0e0e0" : "transparent",
              color:
                selected === "projects" ? "primary.main" : "text.secondary",
              "&:hover": {
                backgroundColor: "grey.100",
              },
              borderRadius: 2,
              display: "flex", // Add flex display
              alignItems: "center",
              // marginBottom: 5, // Center align the content
            }}
          >
            <ListItemIcon
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center", // Add this property to center the content horizontally
              }}
            >
              <Business />
            </ListItemIcon>
            {expanded && (
              <>
                <ListItemText primary="Projects" />
                <Box sx={{ flexGrow: 1 }} />
              </>
            )}
          </ListItemButton>
        </Tooltip>

        <ListItemButton
          sx={{
            backgroundColor:
              selected === "projects" ? "#e0e0e0" : "transparent",
            color: selected === "projects" ? "primary.main" : "text.secondary",
            "&:hover": {
              backgroundColor: "grey.100",
            },
            borderRadius: 2,
            alignItems: "center",
            width: "100%",
            display: "flex", // Add flex display
            justifyContent: "center", // Add justifyContent
          }}
        >
          {expanded ? (
            <Tooltip title="Close">
              <ChevronLeft onClick={toggleExpanded} />
            </Tooltip>
          ) : (
            <Tooltip title="Open">
              <ChevronRight onClick={toggleExpanded} />
            </Tooltip>
          )}
        </ListItemButton>
      </List>
    </div>
  );
};

export default SideNavbar;
