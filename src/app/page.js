"use client"
import React from 'react';
import Link from 'next/link';
import { Container, Typography, Button, Grid,  AppBar, Toolbar, } from '@mui/material';
import CustomAppBar from './components/ResponsiveAppBarHome'; // Import the AppBar component
import { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';

const HomePage = () => {

  const [username, setUsername] = useState('Guest');
  const cookies = new Cookies();

  useEffect(() => {
    const savedUsername = cookies.get('nick');
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  const backgroundStyle = {
    backgroundImage: `url(${'/HomePageBG.png'})`,
    backgroundSize: 'cover', 
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'left',
    textAlign: 'left',
    padding: '50px',
    margin: '-8px',
    overflow: 'show',
  };
  const titleStyle = {
    color: 'White',
    marginBottom: '20px',
    fontFamily: 'Impact, sans-serif', 
    fontSize: '150px',
    marginLeft: '-200px',
  };

  const subtitleStyle = {
    color: '#fff',
    fontSize: '50px',
    maxWidth: '90%',
    lineHeight: '1.5',
    fontFamily: 'Impact, sans-serif',
    marginTop: '-190px',
    marginLeft: '200px',
  };

  return (
    <div style={backgroundStyle}>
      <CustomAppBar />
      <Container>
      <Typography variant="h2" gutterBottom style={titleStyle}>
          Task Titans
          <br/>
          <hr style={{backgroundColor: 'White', width: '900px', height: '5px', margin: '-10px'}}/>
          <br/>
        </Typography>
        <Typography variant="h4" gutterBottom style={subtitleStyle}>
          Welcome to Task Titans!
        </Typography>
        <Typography variant="body1" gutterBottom>
        <br/><br/>
          <h1 style={{color: 'white'}}>Master Your Tasks and become a Titan!</h1><br/>
          <hr style={{width: '700px', margin: '-10px' }}/>
          <br/>
           This app is designed to help you manage your tasks and time effectively.
           <br/> Please enjoy the app and let us know if you have any feedback!
        </Typography>
        <Typography>
          
          <Link href="/todolist" passHref>
            <Button variant="contained" color="primary" style={{ marginTop: '30px' }}>
            {username}!
            <br/>
              Lets Do Some Tasks!
            </Button>
          </Link>
        </Typography>
      </Container>
    </div>
  );
};

export default HomePage;
