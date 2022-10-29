import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import { AccountCircle } from "@mui/icons-material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, isLogin, logout } from "../store/chat";

const NavBar = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(isLogin());
  const currentUser = useSelector(getCurrentUser());
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <Box mb={3}>
      <AppBar>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <ChatIcon />
            <Typography ml={2} variant="h5">
              Локальный чат
            </Typography>
          </Box>
          {isAuth && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography mr={1} variant="h6">
                {currentUser}
              </Typography>
              <IconButton aria-controls="user" onClick={handleMenu}>
                <AccountCircle fontSize="large" />
              </IconButton>
              <Menu
                id="user"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                keepMounted
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Выйти</MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
