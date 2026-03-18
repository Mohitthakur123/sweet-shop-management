import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getSweets, searchSweets, deleteSweet } from '../api/sweetApi';

export const SweetList = () => {
  const { user } = useContext(AuthContext);
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSweets = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getSweets();
        if (!Array.isArray(data)) throw new Error('Invalid data format');
        setSweets(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch sweets');
        toast.error('Failed to fetch sweets');
      } finally {
        setLoading(false);
      }
    };
    fetchSweets();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteSweet(id);
      setSweets((prev) => prev.filter((sweet) => sweet.id !== id));
      toast.success('Sweet deleted successfully');
    } catch {
      toast.error('Failed to delete sweet');
    }
  };

  /* ---------------- Loading ---------------- */
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  /* ---------------- Error ---------------- */
  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Button
          sx={{ mt: 2 }}
          variant="contained"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        p: 4,
        background: 'linear-gradient(135deg, #FDF2F8, #EEF2FF)',
      }}
    >
      {/* Page Header */}
      <Typography
        variant="h4"
        fontWeight={700}
        sx={{ mb: 3, color: '#1F2937' }}
      >
        🍬 Sweet Inventory
      </Typography>

      {/* Empty State */}
      {sweets.length === 0 ? (
        <Paper
          sx={{
            p: 4,
            borderRadius: 4,
            textAlign: 'center',
            background: 'rgba(255,255,255,0.85)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
          }}
        >
          <Typography color="text.secondary">
            No sweets available
          </Typography>
        </Paper>
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 4,
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 30px 60px rgba(0,0,0,0.12)',
          }}
        >
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  background:
                    'linear-gradient(135deg, #EC4899, #8B5CF6)',
                }}
              >
                {['Name', 'Category', 'Price', 'Quantity', 'Actions'].map(
                  (head) => (
                    <TableCell
                      key={head}
                      sx={{ color: '#fff', fontWeight: 600 }}
                    >
                      {head}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {sweets.map((sweet) => (
                <TableRow
                  key={sweet.id}
                  hover
                  sx={{
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: '#FDF2F8',
                    },
                  }}
                >
                  <TableCell>{sweet.name}</TableCell>
                  <TableCell>{sweet.category}</TableCell>
                  <TableCell>₹{sweet.price}</TableCell>
                  <TableCell>{sweet.quantity}</TableCell>

                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        size="small"
                        component={Link}
                        to={`/sweets/${sweet.id}`}
                        sx={{
                          textTransform: 'none',
                          borderRadius: 2,
                          background:
                            'linear-gradient(135deg, #60A5FA, #818CF8)',
                          color: '#fff',
                          '&:hover': {
                            background:
                              'linear-gradient(135deg, #3B82F6, #6366F1)',
                          },
                        }}
                      >
                        View
                      </Button>

                      {user && user.role === 'admin' && (
                        <>
                          <Button
                            size="small"
                            component={Link}
                            to={`/sweets/${sweet.id}/edit`}
                            sx={{
                              textTransform: 'none',
                              borderRadius: 2,
                              background:
                                'linear-gradient(135deg, #34D399, #10B981)',
                              color: '#fff',
                              '&:hover': {
                                background:
                                  'linear-gradient(135deg, #059669, #047857)',
                              },
                            }}
                          >
                            Edit
                          </Button>

                          <Button
                            size="small"
                            onClick={() => handleDelete(sweet.id)}
                            sx={{
                              textTransform: 'none',
                              borderRadius: 2,
                              background:
                                'linear-gradient(135deg, #F87171, #EF4444)',
                              color: '#fff',
                              '&:hover': {
                                background:
                                  'linear-gradient(135deg, #DC2626, #B91C1C)',
                              },
                            }}
                          >
                            Delete
                          </Button>
                        </>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};
