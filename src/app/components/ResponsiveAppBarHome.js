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
      <style jsx>{`
        .hover-darken:hover {
          background-color: #0012b5;
        }
      `}</style>
      <AppBar>
        <Toolbar>
          <Avatar alt="TaskTitan" src="\..\..\tasktitans-removebg-preview (1).png" sx={{ width: 80, height: 80 }} />
          {username ? (
            <div>
              <Button
                className="hover-darken" 
                aria-controls="menu"
                aria-haspopup="true"
                onClick={handleMenuOpen}
                color="inherit"
                style={{ color: '#fff', marginLeft: '10px', transition: 'background-color 0.3s ease' }}
              >
                {username}
              </Button>
              <Menu
                className="hover-darken" 
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
              <Button color="warning" className="hover-darken" style={{ color: '#fff', marginLeft: '10px', transition: 'background-color 0.3s ease' }}>
                Login
              </Button>
              
            </Link>
          )}
          <Link href="/todolist">
            
            <Button color="warning" className="hover-darken" style={{ color: '#fff', transition: 'background-color 0.3s ease' }}>
              To Do List
            </Button>
          </Link>
          <Link href="/leaderboards">
            <Button color="warning" className="hover-darken" style={{ color: '#fff', transition: 'background-color 0.3s ease' }}>
              Leaderboards
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default CustomAppBar;
