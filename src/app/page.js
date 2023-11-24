dashboard
import React from 'react';
import Link from 'next/link';
import { Container, Typography, Button, Grid } from '@mui/material';

const HomePage = () => {
  return (
    <Container>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item>
          <Typography variant="h2" align="center" gutterBottom>
            TaskTitans
          </Typography>
        </Grid>
        <Grid item>
          <Link href="/register" passHref>
            <Button variant="contained" color="primary">
              Sign Up
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/login" passHref>
            <Button variant="contained" color="primary">
              Sign In
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;

