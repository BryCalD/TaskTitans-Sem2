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
    backgroundImage: `url('/ABG.jpg')`,
    backgroundSize: 'cover',
    height: '100vh',
    margin: '-8px',
    marginTop: '5em',
    padding: '5em',
    alignItems: 'center',
    textAlign: 'center',
  };

  return (
    <div style={backgroundStyle}>
      <CustomAppBar />
      <Container component="main" style={{ 
          marginTop: '1px',
          backgroundColor: 'rgba(150, 150, 150, 0.3)',
          backgroundSize: 'cover',
          backgroundRepeat: 'repeat',
          borderRadius: '50px', 
          paddingTop: '30px',
          paddingleft: '2em',
          paddingBottom: '5em',
          paddingRight: '1em',
          backdropFilter: 'blur(2px)',
          border: '3px solid #1976d2',
        }}>
        {/* Add class filter dropdown */}
        <FormControl sx={{ m: 1, minWidth: 200 }}>
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
            <MenuItem value="5">Class 5</MenuItem>
            <MenuItem value="6">Class 6</MenuItem>
          </Select>
        </FormControl>

        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Typography variant="h4">Username<hr style={{height:"3px", backgroundColor: '#1976d2', border: 'none'}}/></Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h4">Class<hr style={{height:"3px", backgroundColor: '#1976d2', border: 'none'}}/></Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h4">Points<hr style={{height:"3px", backgroundColor: '#1976d2', border: 'none'}}/></Typography>
          </Grid>
          {filteredData.map((item, index) => (
            <React.Fragment key={index}>
              <Grid item xs={4} sx={{ m: -1, minWidth: 20 }}>
                <Typography variant="body1" style={{fontSize: '1.3em'}}>{item.nick}<hr style={{ border: 'none', height:"1px", backgroundColor: '#1976d2'}}/></Typography>
              </Grid>
              <Grid item xs={4} sx={{ m: -1, minWidth: 20 }}>
                <Typography variant="body1" style={{fontSize: '1.3em'}}>{item.class}<hr style={{ border: 'none', height:"1px", backgroundColor: '#1976d2'}}/></Typography>
              </Grid>
              <Grid item xs={4} sx={{ m: -1, minWidth: 20 }}>
                <Typography variant="body1" style={{fontSize: '1.3em'}}>{item.points}<hr style={{ border: 'none', height:"1px", backgroundColor: '#1976d2'}}/></Typography>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
        <hr/>
      </Container>
    </div>
  );
};

export default HomePage;
