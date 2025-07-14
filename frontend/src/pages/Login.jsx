// src/pages/Login.jsx
import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      setMsg(res.data.message);
      setSuccess(true);

      // 👇 Wait 1.5 seconds then navigate to home page
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Login failed');
      setSuccess(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Paper sx={{ padding: 4, width: 400 }}>
        <Typography variant="h5" gutterBottom>Login</Typography>
        <TextField fullWidth margin="normal" name="email" label="Email" onChange={handleChange} />
        <TextField fullWidth margin="normal" name="password" label="Password" type="password" onChange={handleChange} />
        <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>Login</Button>

        {msg && (
          <Typography sx={{ mt: 2 }} color={success ? 'green' : 'error'}>
            {msg}
          </Typography>
        )}
      </Paper>
    </Box>
  );
}

export default Login;
