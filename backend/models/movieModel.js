// backend/models/movieModel.js
import db from '../config/db.js';

export const addMovie = (movieData, callback) => {
  const { title, genre, rating, description, image, producer } = movieData;
  const sql = "INSERT INTO movielist (title, genre, rating, description, image, producer) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(sql, [title, genre, rating, description, image, producer], callback);
};

export const getAllMovies = (callback) => {
  const sql = "SELECT * FROM movielist";
  db.query(sql, callback);
};

export const updateMovie = (id, movieData, callback) => {
  const { title, genre, rating, description, image, producer } = movieData;
  const sql = "UPDATE movielist SET title=?, genre=?, rating=?, description=?, image=?, producer=? WHERE id=?";
  db.query(sql, [title, genre, rating, description, image, producer, id], callback);
};

export const deleteMovie = (id, callback) => {
  const sql = "DELETE FROM movielist WHERE id=?";
  db.query(sql, [id], callback);
};
