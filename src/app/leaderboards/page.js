// HomePage.js
'use client'
import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CustomAppBar from '../components/ResponsiveAppBarLeader';
import Cookies from 'universal-cookie';

const HomePage = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [filterClass, setFilterClass] = useState('all'); // Initial filter set to 'all'

  useEffect(() => {
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

  // Handle class filter change
  const handleClassFilterChange = (event) => {
    setFilterClass(event.target.value);
  };

  // Filter leaderboard data based on selected class
  const filteredData = filterClass === 'all' ? leaderboardData : leaderboardData.filter(item => item.class === filterClass);

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
        {/* Add class filter dropdown */}
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="class-filter-label">Filter by Class</InputLabel>
          <Select
            labelId="class-filter-label"
            id="class-filter-select"
            value={filterClass}
            onChange={handleClassFilterChange}
          >
            <MenuItem value="all">All Classes</MenuItem>
            <MenuItem value="1">Class 1</MenuItem>
            <MenuItem value="2">Class 2</MenuItem>
            <MenuItem value="3">Class 3</MenuItem>
            <MenuItem value="4">Class 4</MenuItem>
          </Select>
        </FormControl>

        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Typography variant="h5">Username</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h5">Class</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h5">Points</Typography>
          </Grid>
          {filteredData.map((item, index) => (
            <React.Fragment key={index}>
              <Grid item xs={4}>
                <Typography variant="body1">{item.nick}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1">{item.class}</Typography>
              </Grid>
              <Grid item xs={4}>
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
