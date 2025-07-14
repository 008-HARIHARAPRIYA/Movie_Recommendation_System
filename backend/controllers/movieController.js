// backend/controllers/movieController.js
import * as movieModel from '../models/movieModel.js';

export const addMovie = (req, res) => {
  movieModel.addMovie(req.body, (err, result) => {
    if (err) return res.status(500).json({ message: "Error adding movie" });
    res.status(201).json({ message: "Movie added successfully" });
  });
};

export const getMovies = (req, res) => {
  movieModel.getAllMovies((err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching movies" });
    res.status(200).json(results);
  });
};

export const updateMovie = (req, res) => {
  const id = req.params.id;
  movieModel.updateMovie(id, req.body, (err, result) => {
    if (err) return res.status(500).json({ message: "Error updating movie" });
    res.status(200).json({ message: "Movie updated successfully" });
  });
};

export const deleteMovie = (req, res) => {
  const id = req.params.id;
  movieModel.deleteMovie(id, (err, result) => {
    if (err) return res.status(500).json({ message: "Error deleting movie" });
    res.status(200).json({ message: "Movie deleted successfully" });
  });
};
