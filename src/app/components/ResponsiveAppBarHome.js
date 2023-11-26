import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import Link from 'next/link';

const CustomAppBar = () => {
  return (
    <div>
      <AppBar>
        <Toolbar>
          <Link href="/login">
          <Button color="warning" style={{ color: '#fff' }}>
            Login
          </Button>
          </Link>
          <Link href="/register">
          <Button color="warning" style={{ color: '#fff' }}>
            register
          </Button>
          </Link>
          <Link href="/todolist">
          <Button color="warning" style={{ color: '#fff' }}>
            To Do List
          </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default CustomAppBar;
