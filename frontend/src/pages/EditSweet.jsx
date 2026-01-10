import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Paper,
} from "@mui/material";
import { toast } from "react-toastify";
import { getSweetById, updateSweet } from "../api/sweetApi";

const categories = [
  "Nut-Based",
  "Milk-Based",
  "Vegetable-Based",
  "Chocolate",
  "Candy",
  "Pastry",
];

export const EditSweet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSweet = async () => {
      try {
        const sweet = await getSweetById(id);
        setFormData({
          name: sweet.name,
          category: sweet.category,
          price: sweet.price.toString(),
          quantity: sweet.quantity.toString(),
        });
      } catch (error) {
        toast.error("Failed to load sweet details");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchSweet();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const sweetData = {
        ...formData,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity),
      };
      await updateSweet(id, sweetData);
      toast.success("Sweet updated successfully!");
      navigate(`/sweets/${id}`);
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to update sweet");
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #FDF2F8, #EEF2FF)",
        p: 3,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: 480,
          p: 4,
          borderRadius: 4,
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 30px 60px rgba(0,0,0,0.12)",
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight={700}
          gutterBottom
          sx={{ color: "#1F2937" }}
        >
          ✏️ Edit Sweet
        </Typography>

        <Typography
          variant="body2"
          textAlign="center"
          sx={{ color: "#6B7280", mb: 3 }}
        >
          Update sweet details easily 🍬
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Sweet Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2.5,
                backgroundColor: "#F8FAFF",
              },
            }}
          />

          <FormControl
            fullWidth
            margin="normal"
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2.5,
                backgroundColor: "#F8FAFF",
              },
            }}
          >
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              label="Category"
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            margin="normal"
            label="Price (₹)"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            inputProps={{ min: 0, step: 0.01 }}
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2.5,
                backgroundColor: "#F8FAFF",
              },
            }}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Quantity"
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            inputProps={{ min: 0 }}
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2.5,
                backgroundColor: "#F8FAFF",
              },
            }}
          />

          <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
            <Button
              type="submit"
              fullWidth
              sx={{
                py: 1.3,
                fontWeight: 600,
                borderRadius: 3,
                textTransform: "none",
                background: "linear-gradient(135deg, #EC4899, #8B5CF6)",
                color: "#fff",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "linear-gradient(135deg, #DB2777, #7C3AED)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 15px 30px rgba(139,92,246,0.4)",
                },
              }}
            >
              Update Sweet
            </Button>

            <Button
              fullWidth
              onClick={() => navigate(`/sweets/${id}`)}
              sx={{
                py: 1.3,
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 500,
                backgroundColor: "#F1F5F9",
                color: "#475569",
                "&:hover": {
                  backgroundColor: "#E2E8F0",
                },
              }}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};
