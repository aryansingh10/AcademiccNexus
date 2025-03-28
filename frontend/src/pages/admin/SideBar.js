import React from "react";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Divider, Tooltip } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from "@mui/icons-material/AnnouncementOutlined";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import ReportIcon from "@mui/icons-material/Report";
import AssignmentIcon from "@mui/icons-material/Assignment";

const menuItems = [
  { text: "Home", icon: <HomeIcon />, path: "/" },
  { text: "Classes", icon: <ClassOutlinedIcon />, path: "/Admin/classes" },
  { text: "Subjects", icon: <AssignmentIcon />, path: "/Admin/subjects" },
  { text: "Teachers", icon: <SupervisorAccountOutlinedIcon />, path: "/Admin/teachers" },
  { text: "Students", icon: <PersonOutlineIcon />, path: "/Admin/students" },
  { text: "Notices", icon: <AnnouncementOutlinedIcon />, path: "/Admin/notices" },
  { text: "Complains", icon: <ReportIcon />, path: "/Admin/complains" }
];

const userItems = [
  { text: "Profile", icon: <AccountCircleOutlinedIcon />, path: "/Admin/profile" },
  { text: "Logout", icon: <ExitToAppIcon />, path: "/logout" }
];

const SideBar = () => {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 250,
        flexShrink: 0,
        height: "100vh", // Ensures sidebar extends from top to bottom
        "& .MuiDrawer-paper": {
          width: 250,
          height: "100vh", // Ensures the black background fills the full height
          transition: "0.3s ease",
          backgroundColor: "#1E1E2F",
          color: "#FFF",
          overflowX: "hidden",
          borderRight: "1px solid #333"
        }
      }}
    >
      {/* Main Navigation */}
      <List>
        {menuItems.map(({ text, icon, path }) => (
          <Tooltip key={text} title={text} placement="right">
            <ListItemButton
              component={Link}
              to={path}
              sx={{
                padding: "12px",
                borderRadius: "8px",
                margin: "6px",
                color: location.pathname.startsWith(path) ? "#2196F3" : "#FFF",
                backgroundColor: location.pathname.startsWith(path) ? "#333" : "transparent",
                "&:hover": { backgroundColor: "#444" }
              }}
            >
              <ListItemIcon sx={{ color: location.pathname.startsWith(path) ? "#2196F3" : "#FFF" }}>
                {icon}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </Tooltip>
        ))}
      </List>

      <Divider sx={{ backgroundColor: "#555", margin: "10px 0" }} />

      {/* User Section */}
      <List>
        {userItems.map(({ text, icon, path }) => (
          <Tooltip key={text} title={text} placement="right">
            <ListItemButton
              component={Link}
              to={path}
              sx={{
                padding: "12px",
                borderRadius: "8px",
                margin: "6px",
                color: location.pathname.startsWith(path) ? "#F44336" : "#FFF",
                backgroundColor: location.pathname.startsWith(path) ? "#333" : "transparent",
                "&:hover": { backgroundColor: "#444" }
              }}
            >
              <ListItemIcon sx={{ color: location.pathname.startsWith(path) ? "#F44336" : "#FFF" }}>
                {icon}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </Tooltip>
        ))}
      </List>
    </Drawer>
  );
};

export default SideBar;
