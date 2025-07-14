// src/pages/Home.jsx
import React from 'react';
import MovieImage from '../assets/movie_theme.png';
import './Home.css';
import { Box, Grid, Paper, Typography, Button, Stack } from '@mui/material';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <>
      <Navbar />
      {/* About Section */}


      <Box className="home-root">
        <Grid container justifyContent="center" alignItems="center">
            <Box className="about-section" padding="40px" sx={{ mb: 4, textAlign: 'center' }}>
  <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#ff4081' }}>
    🎥 Your Personal Movie Guide
  </Typography>
  <Typography variant="body1" sx={{ maxWidth: 800, margin: '0 auto', fontSize: '1.2rem' , color:'orange'}}>
    Discover handpicked movies based on your preferences. From top-rated blockbusters to hidden gems, our AI-powered engine recommends what you’ll love.
  </Typography>
</Box>
          <Grid item xs={12} md={10}>
            <Paper
              elevation={5}
              className="login-container"
              sx={{
                backgroundImage: 'linear-gradient(to top, #30cfd0 0%, #330867 100%)',
                backgroundColor: 'transparent',
                padding: '20px',
              }}
            >
              <Grid container spacing={2}>
                {/* Left side content */}
                <Grid item xs={12} md={6} display="flex" flexDirection="column" justifyContent="center">
                  <Typography variant="h4" gutterBottom className="login-title">
                    Welcome to Movie Recommender 🎬
                  </Typography>
                  <Typography variant="body1" className="login-text" textAlign="center">
                    Discover movies tailored just for you.
                  </Typography>

                  {/* ✅ Buttons: Login & Register only */}
                  <Stack spacing={2} direction="row" justifyContent="center" mt={3}>
                    <Button variant="contained" className="btn-light" onClick={handleLogin}>Login</Button>
                    <Button variant="outlined" className="btn-outline" onClick={handleRegister}>Register</Button>
                  </Stack>
                </Grid>

                {/* Right side image */}
                <Grid item xs={12} md={6}>
                  <img
                    src={MovieImage}
                    alt="Movie Theme"
                    className="login-image"
                  />
                </Grid>
              </Grid>
            </Paper>
            {/* Trending Movies Section */}
{/* Trending Movies Section */}
<Box className="trending-section" sx={{ mt: 6, mb: 6 }}>
  <Typography variant="h4" sx={{ textAlign: 'center', mb: 3, color: '#ff9800', fontWeight: 'bold' }}>
    🔥 Trending Now
  </Typography>
  <Grid container spacing={3} justifyContent="center" object-fit="cover">
    {[
      {
        title: 'Leo',
        description: 'Thalapathy Vijay’s explosive action thriller.',
        image: 'https://tse1.mm.bing.net/th/id/OIP.1I22prSDW9FUd0KABAf_EAHaGB?pid=Api&P=0&h=180'
      },
      {
        title: 'Jailer',
        description: 'Rajinikanth’s power-packed performance.',
        image: 'https://tse1.mm.bing.net/th/id/OIP.OgU3wxA6kJVjMvTx3K_LpwAAAA?pid=Api&P=0&h=180'
      },
      {
        title: 'Vikram',
        description: 'A high-octane spy thriller starring Kamal Haasan.',
        image: 'https://tse4.mm.bing.net/th/id/OIP.lf4wHtY9FN5G7icO2xqAzAHaLH?pid=Api&P=0&h=180'
      },
      {
        title: 'Valimai',
        description: 'Action comedy with Ajith Kumar in a unique role.',
        image: 'https://tse1.mm.bing.net/th/id/OIP.pkBAQWfAC8iYCYD61PqoTgHaJQ?pid=Api&P=0&h=180'
      }
    ].map((movie, index) => (
      <Grid item xs={12} sm={6} md={3} key={index}>
        <Paper
          elevation={4}
          sx={{
            borderRadius: 2,
            overflow: 'hidden',
            backgroundColor: '#121212',
            color: '#fff',

            transition: 'transform 0.3s',
            '&:hover': { transform: 'scale(1.05)' }
          }}
        >
          <img
            src={movie.image}
            alt={movie.title}
            style={{ width: '100%', height: '280px', objectFit: 'contain' }}
          />
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              {movie.title}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              {movie.description}
            </Typography>
          </Box>
        </Paper>
      </Grid>
    ))}
  </Grid>
</Box>

          </Grid>
        </Grid>
      </Box>
      {/* Footer */}
<Box className="footer" sx={{
  mt: 6,
  py: 3,
  textAlign: 'center',
  backgroundColor: '#333',
  color: '#fff',
}}>
  <Typography variant="body2">
    © 2025 Movie Recommender | All Rights Reserved.
  </Typography>
  
  
</Box>

    </>
  );
}

export default Home;
