import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Paper,
} from '@mui/material';
import { toast } from 'react-toastify';
import { getSweetById, purchaseSweet } from '../api/sweetApi';

export const PurchaseSweet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sweet, setSweet] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSweet = async () => {
      try {
        const data = await getSweetById(id);
        setSweet(data);
      } catch (error) {
        toast.error('Failed to fetch sweet details');
        navigate(`/sweets/${id}`);
      } finally {
        setLoading(false);
      }
    };
    fetchSweet();
  }, [id, navigate]);

  const handlePurchase = async () => {
    try {
      await purchaseSweet(id, parseInt(quantity));
      toast.success(`Purchased ${quantity} ${sweet.name}(s) successfully!`);
      navigate(`/sweets/${id}`);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to purchase sweet');
    }
  };

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

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FDF2F8, #EEF2FF)',
        p: 3,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: 420,
          p: 4,
          borderRadius: 4,
          background: 'rgba(255,255,255,0.9)',
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
          🛒 Purchase Sweet
        </Typography>

        <Typography
          variant="body2"
          textAlign="center"
          sx={{ color: '#6B7280', mb: 3 }}
        >
          You are purchasing <strong>{sweet.name}</strong>
        </Typography>

        <Typography
          variant="body1"
          textAlign="center"
          sx={{ mb: 2, color: '#475569' }}
        >
          Available Stock: <strong>{sweet.quantity}</strong>
        </Typography>

        <TextField
          fullWidth
          margin="normal"
          label="Quantity to Purchase"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          inputProps={{ min: 1, max: sweet.quantity }}
          helperText={`Max available: ${sweet.quantity}`}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2.5,
              backgroundColor: '#F8FAFF',
            },
          }}
        />

        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button
            fullWidth
            onClick={handlePurchase}
            disabled={!quantity || parseInt(quantity) <= 0}
            sx={{
              py: 1.3,
              fontWeight: 600,
              borderRadius: 3,
              textTransform: 'none',
              background: 'linear-gradient(135deg, #34D399, #10B981)',
              color: '#fff',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'linear-gradient(135deg, #059669, #047857)',
                transform: 'translateY(-2px)',
                boxShadow: '0 15px 30px rgba(16,185,129,0.4)',
              },
              '&:disabled': {
                background: '#CBD5E1',
                color: '#64748B',
              },
            }}
          >
            Confirm Purchase
          </Button>

          <Button
            fullWidth
            onClick={() => navigate(`/sweets/${id}`)}
            sx={{
              py: 1.3,
              borderRadius: 3,
              textTransform: 'none',
              fontWeight: 500,
              backgroundColor: '#F1F5F9',
              color: '#475569',
              '&:hover': {
                backgroundColor: '#E2E8F0',
              },
            }}
          >
            Cancel
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
