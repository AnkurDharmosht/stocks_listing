import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SideBarContext from "../../store/sidebar-context";

const NavItemComponent = ({ item, open, index, setOpen }) => {
  const sideBarCtx = useContext(SideBarContext);
  const setTitle = sideBarCtx.setTitle;
  const setActiveIndex = sideBarCtx.setActiveIndex;
  // const [activePath, setActivePath] = useState("");
  const location = useLocation();
  const currentPath = location.pathname;
  let isCurrentActive = currentPath === item.to;

  if (
    currentPath.startsWith("/dashboard/invoices") &&
    item.to === "/dashboard/invoicing-service"
  ) {
    isCurrentActive = true;
  } else if (
    currentPath.startsWith("/dashboard/collections") &&
    item.to === "/dashboard/collections"
  ) {
    isCurrentActive = true;
  }
  if (currentPath === "/dashboard/collections") {
    setTitle("COLLECTIONS");
  }
  if (
    currentPath === "/dashboard/invoicing-service" ||
    currentPath === "/dashboard/lawyer-dashboard"
  ) {
    setTitle("INVOICE");
  }
  if (currentPath === "/dashboard/client-management") {
    setTitle("CLIENT");
  } else {
    setTitle("INVOICE");
  }

  // useEffect(() => {
  //   if (
  //     location.pathname !== "/dashboard/invoices/make" &&
  //     invDraft.length > 0
  //   ) {
  //     alert("yo");
  //   }
  //   return () => {};
  // }, [location.pathname]);

  return (
    <div style={{ textAlign: "center" }}>
      <ListItem
        key={item.title}
        disablePadding
        sx={{ display: "block" }}
        onClick={() => {
          setActiveIndex(index, -1);
          setOpen(false);
        }}
      >
        <NavLink
          to={item.to}
          key={item.to}
          onClick={() => {}}
          style={({ isActive }) => {
            return {
              display: "block",
              margin: "0.2rem 0",
              color: isActive ? "#1e845a" : "black",
              fontWeight: isActive ? "bold" : "normal",
              textDecoration: "none",
              padding: open ? "6px 18px 6px 18px" : "6px 8px 6px 8px",
              // borderRight: isActive
              //   ? "5px solid rgba(30, 132, 89, 0.7) "
              //   : "none",
              // padding: "6px 18px 6px 12px",
            };
          }}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              "&:hover": {
                backgroundColor: "rgba(30, 132, 89, 0.3)",
              },
              backgroundColor: isCurrentActive ? "rgba(30, 132, 89, 0.2)" : "",
              boxShadow: isCurrentActive
                ? "0px 8px 37.5px rgba(55, 69, 87, 0.1)"
                : "#fff",
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 1.5 : "auto",
                justifyContent: "center",
                color: isCurrentActive ? "#1E8459" : "#000",
              }}
            >
              {item.icon}
            </ListItemIcon>

            <ListItemText
              primary={item.title}
              sx={{
                opacity: open ? 1 : 0,
                color: isCurrentActive ? "#1E8459" : "#000",
              }}
              className="font-navbar"
            />
          </ListItemButton>
        </NavLink>
      </ListItem>
    </div>
  );
};

export default NavItemComponent;
