import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { ThemeProvider } from "@material-ui/styles";
import { custom_theme } from "../../theme/Theme";
import { nav } from "../_nav";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Outlet, useNavigate } from "react-router-dom";
import NavItemComponent from "./NavItemComponent";
import NavItemSubmenu from "./NavItemSubmenu";
import { Button, Grid, Tooltip } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
export default function MiniDrawer() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    navigate("/");
  };
  return (
    <ThemeProvider theme={custom_theme}>
      <Box sx={{ display: "flex", fontFamily: "Poppins" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          sx={{
            backgroundColor: "#f1f9f7",
            boxShadow: "none",
            color: "#000",
            zIndex: 5,
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{ color: "#000", mr: { xs: -2, sm: 0, md: 0 } }}
              />
              <Button
                sx={{
                  borderRadius: "0px",
                  p: 0,
                  textAlign: "right",
                }}
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Grid>
                  <Typography
                    component="span"
                    sx={{
                      padding: 1,
                      textTransform: "capitalize",
                    }}
                  >
                    <Tooltip title="MY Profile" placement="bottom">
                      <AccountCircle
                        color="success"
                        sx={{ fontSize: "36px" }}
                      />
                    </Tooltip>
                  </Typography>
                </Grid>
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                style={{}}
              >
                <div
                  style={{
                    margin: 0,
                    paddingTop: "0rem",
                    width: "250px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <MenuItem
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "100%",
                      marginTop: "-8px",
                      "&:hover": { cursor: "default", background: "#fff" },
                    }}
                  >
                    <AccountCircle color="success" sx={{ fontSize: "80px" }} />
                    <span
                      style={{
                        fontWeight: "550",
                        fontSize: "0.9rem",
                        marginTop: "0.3rem",
                      }}
                    >
                      Shankar Singh
                    </span>

                    <span
                      style={{
                        fontWeight: "400",
                        fontSize: "0.85rem",
                        // marginTop: "0.3rem",
                      }}
                    >
                      shankar@gmail.com
                    </span>
                  </MenuItem>
                </div>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={open}
          onMouseOver={handleDrawerOpen}
          onMouseLeave={handleDrawerClose}
          sx={{ position: "absolute" }}
          PaperProps={{
            sx: {
              border: "none",
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
              borderTopRightRadius: "16px",
              borderBottomRightRadius: "16px",
            },
          }}
        >
          <DrawerHeader
            sx={{
              justifyContent: "center",
              display: "flex",
            }}
          >
            {open && "Close"}
            {!open && "Open"}
          </DrawerHeader>
          {/* <Divider /> */}
          <List sx={{ textAlign: "center" }}>
            {nav.map((item, index) => {
              return item && item.submenus ? (
                <NavItemSubmenu
                  item={item}
                  open={open}
                  setOpen={setOpen}
                  index={index}
                  key={index}
                />
              ) : (
                <NavItemComponent
                  item={item}
                  open={open}
                  setOpen={setOpen}
                  index={index}
                  key={index}
                />
              );
            })}
          </List>
          <Divider />
        </Drawer>
        <Box
          component="main"
          sx={{
            margin: "0 auto",
            width: "100%",
            overflow: "auto",
            marginLeft: "64px",
            marginRight: "6px",
          }}
        >
          <DrawerHeader
            sx={{
              position: "sticky",
              top: "0px",
            }}
          />
          <Outlet
            sx={{
              zIndex: -1,
              backgroundColor: "red",
            }}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
