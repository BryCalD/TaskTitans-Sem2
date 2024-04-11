'use client'
import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Avatar, Menu, MenuItem } from '@mui/material';
import Link from 'next/link';
import Cookies from 'universal-cookie';

const CustomAppBar = () => {
  const [username, setUsername] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const cookies = new Cookies();
    const savedUsername = cookies.get('username');
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Clear username cookie and reset state
    const cookies = new Cookies();
    cookies.remove('username');
    cookies.remove('nick');
    cookies.remove('points');
    setUsername('');
    handleMenuClose();
  };

  return (
    <div>
      <AppBar>
        <Toolbar>
          <Avatar alt="User Avatar" />
          {username ? (
            <div>
              <Button
                aria-controls="menu"
                aria-haspopup="true"
                onClick={handleMenuOpen}
                color="inherit"
                style={{ color: '#fff', marginLeft: '10px' }}
              >
                {username}
              </Button>
              <Menu
                id="menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <Link href="/login">
              <Button color="warning" style={{ color: '#fff', marginLeft: '10px' }}>
                Login
              </Button>
            </Link>
          )}
          <Link href="/homepage">
            <Button color="warning" style={{ color: '#fff' }}>
              Home
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default CustomAppBar;
