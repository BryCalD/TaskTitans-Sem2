import React from 'react';
import Link from 'next/link';
import { Container, Typography, Button, Grid,  AppBar, Toolbar, } from '@mui/material';
import CustomAppBar from '../components/ResponsiveAppBarHome'; // Import the AppBar component

const HomePage = () => {
  const backgroundStyle = {
    backgroundImage: `url(${'/BackgroundImage.png'})`,
    backgroundSize: 'cover', 
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '50px',
  };

  return (
    <div style={backgroundStyle}>
      <CustomAppBar />
      <Container>
        <Typography variant="h2" gutterBottom>
          Task Titans
        </Typography>
        <Typography variant="body1" gutterBottom>
          Master Your Tasks and become a Titan
        </Typography>
        {/* Other content */}
      </Container>
    </div>
  );
};

export default HomePage;
