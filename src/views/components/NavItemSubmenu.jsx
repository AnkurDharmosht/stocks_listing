import React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import SideBarContext from "../../store/sidebar-context";

const NavItemSubmenu = ({ item, open, index, setOpen }) => {
  const [subMenuOpen, setSubMenuOpen] = React.useState(false);
  const handleClick = () => {
    setSubMenuOpen(!subMenuOpen);
  };
  const sideBarCtx = useContext(SideBarContext);
  const setTitle = sideBarCtx.setTitle;
  const setActiveIndex = sideBarCtx.setActiveIndex;
  const location = useLocation();

  return (
    <div style={{ textAlign: "center" }}>
      <List key={item.title}>
        <ListItemButton
          onClick={handleClick}
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            padding: open ? "6px 18px 6px 34px" : "6px 18px 6px 21px",
            "&:hover": {
              backgroundColor: "rgba(30, 132, 89, 0.3)",
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 1.5 : "auto",
              justifyContent: "center",
              color: "#000",
            }}
          >
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.title} sx={{ opacity: open ? 1 : 0 }} />
          {open ? subMenuOpen ? <ExpandLess /> : <ExpandMore /> : ""}
        </ListItemButton>
        <Collapse in={subMenuOpen} timeout="auto" unmountOnExit>
          {item &&
            item.submenus &&
            item.submenus.map((subMenu, i) => {
              const currentPath = location.pathname;
              let isCurrentActive = currentPath === subMenu.to;
              return (
                <NavLink
                  to={subMenu.to}
                  key={subMenu.to}
                  onClick={() => {
                    // setTitle(subMenu.title);
                    setActiveIndex(index, i);
                    setOpen(false);
                  }}
                  style={({ isActive }) => {
                    return {
                      display: "block",
                      color: isActive ? "#fff" : "",
                      textDecoration: "none",
                      justifyContent: open ? "center" : "end",
                      padding: open ? "6px 18px 6px 18px" : "6px 8px 6px 8px",
                    };
                  }}
                >
                  <ListItemButton
                    sx={{
                      pl: open ? 5 : 1.45,
                      "&:hover": {
                        backgroundColor: "rgba(30, 132, 89, 0.3)",
                      },
                      backgroundColor: isCurrentActive
                        ? "rgba(30, 132, 89, 0.3)"
                        : "",
                      // borderRadius: "12px",
                      boxShadow: isCurrentActive
                        ? "0px 8px 37.5px rgba(55, 69, 87, 0.1)"
                        : "#fff",
                    }}
                  >
                    <ListItemIcon
                      className="font-navbar"
                      sx={{
                        color: isCurrentActive ? "#1E8459" : "#000",
                      }}
                    >
                      {subMenu.icon}{" "}
                    </ListItemIcon>
                    <ListItemText
                      primary={subMenu.title}
                      sx={{
                        marginLeft: open && -2,
                        color: isCurrentActive ? "#1E8459" : "#000",
                      }}
                      className="font-navbar"
                    />
                  </ListItemButton>
                </NavLink>
              );
            })}
        </Collapse>
      </List>
    </div>
  );
};

export default NavItemSubmenu;
