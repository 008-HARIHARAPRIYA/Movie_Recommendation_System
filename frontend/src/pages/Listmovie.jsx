import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, Typography, Dialog, DialogTitle, DialogContent, TextField, DialogActions,
  TablePagination
} from '@mui/material';
import { saveAs } from 'file-saver';
import './listmovie.css';

import axios from 'axios';

function Listmovie() {
  const [movies, setMovies] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [form, setForm] = useState({ title: '', genre: '', rating: '', description: '', producer: '', image: '' });
  const [editId, setEditId] = useState(null); // null = Add, otherwise Update

  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchMovies = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/movies/list', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMovies(res.data);
    } catch (error) {
      console.error("❌ Error:", error.message);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleDownloadCSV = () => {
    const csvContent = [
      ['Title', 'Genre', 'Rating', 'Description', 'Producer'],
      ...movies.map(movie => [movie.title, movie.genre, movie.rating, movie.description, movie.producer])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'movie_list.csv');
  };

  const openAddDialog = () => {
    setForm({ title: '', genre: '', rating: '', description: '', producer: '', image: '' });
    setEditId(null);
    setOpenDialog(true);
  };

  const openEditDialog = (movie) => {
    setForm(movie);
    setEditId(movie.id);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/movies/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMovies();
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    const url = editId
      ? `http://localhost:5000/api/movies/update/${editId}`
      : `http://localhost:5000/api/movies/add`;

    const method = editId ? 'put' : 'post';

    await axios[method](url, form, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setOpenDialog(false);
    fetchMovies();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="listmovie-container">
      <Typography variant="h4" gutterBottom>Movie List</Typography>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <Button variant="contained" color="primary" onClick={openAddDialog}>Add Movie</Button>
        <Button variant="contained" color="secondary" onClick={handleDownloadCSV}>Download CSV</Button>
      </div>

      <TableContainer component={Paper} className="movie-table">
        <Table>
          <TableHead sx={{ backgroundColor: '#1976d2' }}>
            <TableRow>
              <TableCell sx={{ color: '#fff' }}>Title</TableCell>
              <TableCell sx={{ color: '#fff' }}>Genre</TableCell>
              <TableCell sx={{ color: '#fff' }}>Rating</TableCell>
              <TableCell sx={{ color: '#fff' }}>Description</TableCell>
              <TableCell sx={{ color: '#fff' }}>Producer</TableCell>
              <TableCell sx={{ color: '#fff' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((movie) => (
              <TableRow key={movie.id}>
                <TableCell>{movie.title}</TableCell>
                <TableCell>{movie.genre}</TableCell>
                <TableCell>{movie.rating}</TableCell>
                <TableCell>{movie.description}</TableCell>
                <TableCell>{movie.producer}</TableCell>
                <TableCell>
                  
<div className="action-buttons">

                  <Button onClick={() => openEditDialog(movie)}>Edit</Button>
                  <Button color="error" onClick={() => handleDelete(movie.id)}>Delete</Button>
                </div>
                </TableCell>
               
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination Component */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={movies.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{editId ? 'Update Movie' : 'Add New Movie'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField name="title" label="Title" value={form.title} onChange={handleChange} fullWidth />
          <TextField name="genre" label="Genre" value={form.genre} onChange={handleChange} fullWidth />
          <TextField name="rating" label="Rating" value={form.rating} onChange={handleChange} fullWidth />
          <TextField name="description" label="Description" value={form.description} onChange={handleChange} fullWidth />
          <TextField name="producer" label="Producer" value={form.producer} onChange={handleChange} fullWidth />
          <TextField name="image" label="Image URL" value={form.image} onChange={handleChange} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>{editId ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Listmovie;
