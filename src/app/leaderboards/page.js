// HomePage.js
'use client'
import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import CustomAppBar from '../components/ResponsiveAppBarLeader';
import Cookies from 'universal-cookie';


const HomePage = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const cookies = new Cookies();

  useEffect(() => {
    const savedUsername = cookies.get('nick');
    if (savedUsername) {
      setUsername(savedUsername);
    }
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    try {
      const response = await fetch('/api/getLeaderboard');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      let data = await response.json();
      // Sort data by points in descending order
      data.sort((a, b) => b.points - a.points);
      setLeaderboardData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Styling for the background image
  const backgroundStyle = {
    backgroundImage: `url('/backgroundImage.png')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '98.2vh',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'space-around'
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
                <Typography variant="body1">{item.nick}</Typography>
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
