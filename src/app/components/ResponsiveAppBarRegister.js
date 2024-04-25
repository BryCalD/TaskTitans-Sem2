import React from 'react';
import { AppBar, Toolbar, Button, Avatar, Menu, MenuItem } from '@mui/material';
import Link from 'next/link';


const CustomAppBar = () => {
  return (
    <div>
      <AppBar>
        <Toolbar>
        <Avatar alt="TaskTitan" src="\..\..\tasktitans-removebg-preview (1).png" sx={{ width: 80, height: 80 }} />
            <Link href="/.." passHref>
          <Button color="primary" style={{ color: '#fff' }}>
            Home
          </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default CustomAppBar;
