// src/pages/Top10movie.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  Paper,
  Rating
} from '@mui/material';
import axios from 'axios';
import './Top10movie.css'; // 👈 make sure to import your CSS

function Top10movie() {
  const [title, setTitle] = useState('');
  const [recommended, setRecommended] = useState([]);
  const [msg, setMsg] = useState('');

  const handleSearch = async () => {
    if (!title) {
      setMsg('Please enter a movie title');
      setRecommended([]);
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/recommend', { title });
      setRecommended(res.data.recommended || []);
      setMsg('');
    } catch (err) {
      console.error(err);
      setMsg('Failed to fetch recommendations');
      setRecommended([]);
    }
  };

  return (
    <Box className="recommend-container">
<Paper elevation={3} className="search-box">
  <Typography variant="h4" gutterBottom>
    🎬 Find Similar Movies
  </Typography>
  <Box className="input-row">
    <TextField
      label="Enter a movie name"
      variant="outlined"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      fullWidth
    />
    <Button variant="contained" onClick={handleSearch}>
      Recommend
    </Button>
  </Box>
  {msg && <Typography className="error-msg">{msg}</Typography>}
</Paper>


      {recommended.length > 0 && (
        <Typography variant="h5" gutterBottom>
          Recommended Movies:
        </Typography>
      )}

      <div className="movie-grid">
        {recommended.map((movie, index) => (
          <Card className="movie-card" key={index}>
            <div className="movie-image-wrapper">
              <img src={movie.image} alt={movie.title} className="movie-image" />
            </div>
            <CardHeader
              title={movie.title}
              subheader={`Genre: ${movie.genre}`}
              className="card-header"
            />
            <CardContent className="card-content">
              <Typography className="movie-description">
                <strong>Description:</strong> {movie.description}
              </Typography>
              <Typography className="movie-producer">
                <strong>Producer:</strong> {movie.producer}
              </Typography>
              <Typography className="movie-rating">
                <strong>Rating:</strong>{' '}
                <Rating value={Number(movie.rating)} readOnly max={10} />
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </Box>
  );
}

export default Top10movie;
