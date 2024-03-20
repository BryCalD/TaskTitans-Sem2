// HomePage.js
'use client'
import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import CustomAppBar from '../components/ResponsiveAppBarLeader';

const HomePage = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    try {
      const response = await fetch('/api/getLeaderboard');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setLeaderboardData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography variant="h5">Username</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5">Points</Typography>
          </Grid>
          {leaderboardData.map((item, index) => (
            <React.Fragment key={index}>
              <Grid item xs={6}>
                <Typography variant="body1">{item.username}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{item.points}</Typography>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default HomePage;
