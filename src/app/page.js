import React from 'react';
import Link from 'next/link';
import { Container, Typography, Button, Grid,  AppBar, Toolbar, } from '@mui/material';
import CustomAppBar from './components/ResponsiveAppBarHome'; // Import the AppBar component

const HomePage = () => {
  const backgroundStyle = {
    backgroundImage: `url(${'/HomePageBG.png'})`,
    backgroundSize: 'cover', 
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'left',
    textAlign: 'ledf',
    padding: '50px',
    margin: '-8px',
    overflow: 'hidden',
  };

  return (
    <div style={backgroundStyle}>
      <CustomAppBar />
      <Container>
        <Typography variant="h2" gutterBottom>
          Task Titans
          <hr/>
        </Typography>
        <Typography variant="body1" gutterBottom>
          Master Your Tasks and become a Titan
        </Typography>
       
      </Container>
    </div>
  );
};

export default HomePage;
