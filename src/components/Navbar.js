import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Link as MaterialLink } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuthContext } from './AuthContext';

export default function MenuAppBar() {
  const { auth, setAuth } = useAuthContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const [roles, setRoles] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (auth && auth !== "") {
      try {
        let authObj = JSON.parse(auth);
        let roles = authObj ? authObj.roles : null;
        let isAdmin = roles ? roles.includes("ADMIN") : null;
        setRoles(roles);
        setIsAdmin(isAdmin);
      } catch (err) {
        console.error(err);
        setRoles([]);
        setIsAdmin(false);
      }
    }
  }, [auth]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    handleClose();
    navigate('/login');
  }

  const handleLogout = () => {
    handleClose();
    navigate('/exit');
    setAuth("");
    setRoles([]);
    setIsAdmin(false);
  }

  const handleProfile = () => {
    handleClose();
    navigate('/profile');
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            App
          </Typography>
          <MaterialLink component={RouterLink} to='/home' variant="h8" sx={{ flexGrow: 1, color: "#FFFFFF" }}>Home</MaterialLink>
          <MaterialLink component={RouterLink} to='/about' variant="h8" sx={{ flexGrow: 1, color: "#FFFFFF" }}>About</MaterialLink>
          { isAdmin ? <MaterialLink component={RouterLink} to='/users' variant="h8" sx={{ flexGrow: 1, color: "#FFFFFF" }}>Users</MaterialLink> : null}
          { (roles?.length > 0) ? <MaterialLink component={RouterLink} to='/profile' variant="h8" sx={{ flexGrow: 1, color: "#FFFFFF" }}>Profile</MaterialLink> : null}
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {(!roles || roles.length === 0) ? <MenuItem onClick={handleLogin}>Login</MenuItem> : null}
              {(roles?.length > 0) ? <MenuItem onClick={handleLogout}>Logout</MenuItem> : null}
              {(roles?.length > 0) ? <MenuItem onClick={handleProfile}>Profile</MenuItem> : null}
              {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}