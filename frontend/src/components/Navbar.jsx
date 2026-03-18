import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Chip } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: 'linear-gradient(135deg, #EC4899, #8B5CF6)',
        px: 2,
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Brand */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            letterSpacing: 0.5,
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              color: 'white',
            }}
          >
            🍬 KATA Sweet Shop
          </Link>
        </Typography>

        {/* Right Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {user ? (
            <>
              {/* User Email */}
              <Chip
                label={user.email}
                size="small"
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.25)',
                  color: '#fff',
                  fontWeight: 500,
                }}
              />

              {/* Admin Badge */}
              {user.role === 'admin' && (
                <Chip
                  label="Admin"
                  size="small"
                  sx={{
                    backgroundColor: '#fff',
                    color: '#8B5CF6',
                    fontWeight: 600,
                  }}
                />
              )}

              {/* Admin Action */}
              {user.role === 'admin' && (
                <Button
                  component={Link}
                  to="/sweets/new"
                  sx={{
                    textTransform: 'none',
                    borderRadius: 20,
                    px: 2,
                    fontWeight: 500,
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.35)',
                    },
                  }}
                >
                  Add Sweet
                </Button>
              )}

              {/* Logout */}
              <Button
                onClick={handleLogout}
                sx={{
                  textTransform: 'none',
                  borderRadius: 20,
                  px: 2.5,
                  fontWeight: 600,
                  backgroundColor: '#fff',
                  color: '#8B5CF6',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#FDF2F8',
                    transform: 'translateY(-1px)',
                  },
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                sx={{
                  textTransform: 'none',
                  fontWeight: 500,
                  color: '#fff',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Login
              </Button>

              <Button
                component={Link}
                to="/register"
                sx={{
                  textTransform: 'none',
                  borderRadius: 20,
                  px: 2.5,
                  fontWeight: 600,
                  backgroundColor: '#fff',
                  color: '#8B5CF6',
                  '&:hover': {
                    backgroundColor: '#FDF2F8',
                  },
                }}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
