// src/components/Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // ✅ make sure you installed this with `npm install react-toastify`

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleProtectedNav = (path) => {
    if (!token) {
      toast.warning('Please login first');
      navigate('/login');
    } else {
      navigate(path);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    toast.success('Logged out successfully');
  };

  return (
    <AppBar position="static" className="navbar" color="black" padding="40px" sx={{ backgroundColor: 'skyblue' }}>
      <Toolbar>
        <Typography variant="h6" className="brand" sx={{ flexGrow: 1 }}>
          Movie Recommender
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" onClick={() => navigate('/')}>Home</Button>

          {/* 🔒 Protected links */}
          <Button color="inherit" onClick={() => handleProtectedNav('/top10')}>Top 10</Button>
          <Button color="inherit" onClick={() => handleProtectedNav('/movies')}>Movie List</Button>
        </Box>

        {/* Right-side buttons */}
        <Box sx={{ marginLeft: 'auto' }}>
          {token ? (
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
              <Button color="inherit" onClick={() => navigate('/register')}>Register</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
