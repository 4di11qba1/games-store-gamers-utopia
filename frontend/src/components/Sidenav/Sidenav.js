import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ShopIcon from "@mui/icons-material/Shop";
import GradeIcon from "@mui/icons-material/Grade";
import { Logout } from "@mui/icons-material";
import { LightMode, DarkMode } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import PeopleIcon from "@mui/icons-material/People";
import ChatIcon from "@mui/icons-material/Chat";
import "./Sidenav.css";
import NavIcons from "../NavIcons/NavIcons";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/AuthActions";
import Searchbar from "../Searchbar/Searchbar";
import { lightTheme, darkTheme } from "../Theme";

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

export default function MiniDrawer({ darkMode, changeMode }) {
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logout());
  };

  const [open, setOpen] = React.useState(false);
  const nav = useNavigate();

  const isActive = (path) => {
    return window.location.href.split("/").pop() === path;
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navigateTo = (url) => {
    nav(url);
  };

  useEffect(() => {
    const elements = document.getElementsByClassName("css-1r9jet7");
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
    }
  });

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundImage: "none" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <img
              src="http://localhost:3000/img/tiger-logo.jpg"
              alt="Logo"
              style={{ width: "25px" }}
            />
          </IconButton>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" noWrap component="div">
              Store
            </Typography>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Searchbar
                lightTheme={lightTheme}
                darkTheme={darkTheme}
                darkMode={darkMode}
              />
              <IconButton color="inherit" onClick={changeMode}>
                {darkMode ? <DarkMode /> : <LightMode />}
              </IconButton>
              <NavIcons />
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ visibility: open ? "visible" : "hidden" }}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <List>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => navigateTo("../home")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                borderRadius: "0 30px 30px 0",
                bgcolor: isActive("home") ? "background.default" : "",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText
                primary="Social Media"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => navigateTo("../chat")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                borderRadius: "0 30px 30px 0",
                bgcolor: isActive("chat") ? "background.default" : "",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <ChatIcon />
              </ListItemIcon>
              <ListItemText primary="Chatroom" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
        <List>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => navigateTo("../main")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                borderRadius: "0 30px 30px 0",
                bgcolor: isActive("main") ? "background.default" : "",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <ShopIcon />
              </ListItemIcon>
              <ListItemText primary="Store" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => navigateTo("../library")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                borderRadius: "0 30px 30px 0",
                bgcolor: isActive("library") ? "background.default" : "",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <GradeIcon />
              </ListItemIcon>
              <ListItemText primary="Library" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
        <List>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={changeMode}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                borderRadius: "0 30px 30px 0",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {darkMode ? <DarkMode /> : <LightMode />}
              </ListItemIcon>
              <ListItemText
                primary={darkMode ? "White Mode" : "Dark Mode"}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
        <List>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={handleLogOut}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                borderRadius: "0 30px 30px 0",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Sign Out" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ width: "50vw", flexGrow: 1, padding: "48px 15px 15px 0" }}
      >
        <DrawerHeader />
      </Box>
    </Box>
  );
}
