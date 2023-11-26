import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import Link from 'next/link';

const CustomAppBar = () => {
  return (
    <div>
      <AppBar>
        <Toolbar>
            <Link href="/homepage" passHref>
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
