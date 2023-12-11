import React from 'react';
import Link from 'next/link';
import { Container, Typography, Button, Grid,  AppBar, Toolbar, } from '@mui/material';
import CustomAppBar from './components/ResponsiveAppBarHome'; // Import the AppBar component

const HomePage = () => {
  return (
    <div>
      <CustomAppBar />
      <Container style={{ marginTop: '300px' }}> {/* Adjust the margin top */}
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item>
            <Typography variant="h2" align="center" gutterBottom>
              TaskTitans
            </Typography>
          </Grid>
          <Grid item>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
export default HomePage;
