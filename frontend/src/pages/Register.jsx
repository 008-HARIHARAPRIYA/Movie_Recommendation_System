// src/pages/Register.jsx
import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [msg, setMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', form);
      setMsg(res.data.message);
      setSuccess(true);

      // 👇 Redirect to login page after 1.5s delay
      setTimeout(() => {
        navigate('/home');
      }, 1000);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Registration failed');
      setSuccess(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Paper sx={{ padding: 4, width: 400 }}>
        <Typography variant="h5" gutterBottom>Register</Typography>
        <TextField fullWidth margin="normal" name="username" label="Username" onChange={handleChange} />
        <TextField fullWidth margin="normal" name="email" label="Email" onChange={handleChange} />
        <TextField fullWidth margin="normal" name="password" label="Password" type="password" onChange={handleChange} />
        <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleRegister}>Register</Button>

        {msg && (
          <Typography sx={{ mt: 2 }} color={success ? 'green' : 'error'}>
            {msg}
          </Typography>
        )}
      </Paper>
    </Box>
  );
}

export default Register;
