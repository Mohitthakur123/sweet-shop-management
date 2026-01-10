import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/sweetApi';
import { toast } from 'react-toastify';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
} from '@mui/material';
import { AuthContext } from '../context/AuthContext';

export const Login = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await loginUser(formData);
      login(token);
      toast.success('Logged in successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: 420,
          p: 4,
          borderRadius: 4,
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 30px 60px rgba(0,0,0,0.12)',
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight={700}
          gutterBottom
          sx={{ color: '#1F2937' }}
        >
          Welcome Back
        </Typography>

        <Typography
          variant="body2"
          textAlign="center"
          sx={{ color: '#6B7280', mb: 3 }}
        >
          Login to continue managing sweets 🍭
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2.5,
                backgroundColor: '#F8FAFF',
                '&.Mui-focused fieldset': {
                  borderColor: '#A78BFA',
                },
              },
            }}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2.5,
                backgroundColor: '#F8FAFF',
                '&.Mui-focused fieldset': {
                  borderColor: '#A78BFA',
                },
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            sx={{
              mt: 3,
              py: 1.4,
              fontWeight: 600,
              borderRadius: 3,
              textTransform: 'none',
              background: 'linear-gradient(135deg, #EC4899, #8B5CF6)',
              color: '#fff',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'linear-gradient(135deg, #DB2777, #7C3AED)',
                transform: 'translateY(-3px)',
                boxShadow: '0 15px 30px rgba(139,92,246,0.4)',
              },
            }}
          >
            Login
          </Button>
        </form>

        <Typography
          variant="body2"
          textAlign="center"
          sx={{ mt: 3, color: '#4B5563' }}
        >
          Don&apos;t have an account?{' '}
          <span
            style={{
              color: '#8B5CF6',
              cursor: 'pointer',
              fontWeight: 600,
            }}
            onClick={() => navigate('/register')}
          >
            Register
          </span>
        </Typography>
      </Paper>
    </Box>
  );
};
