const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to DB
connectDB();

const app = express();

// ─── CORS ────────────────────────────────────────────────────────────────────
// Allow requests from local dev and any deployed frontend (set FRONTEND_URL on Render)
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL, // e.g. https://your-frontend.onrender.com
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
}));

app.use(express.json());

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/wallet', require('./routes/walletRoutes'));
app.use('/api/stocks', require('./routes/stockRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/holdings', require('./routes/holdingRoutes'));
app.use('/api/positions', require('./routes/positionRoutes'));

// ─── Health check ─────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: '🚀 Zerodha Clone API is running!', env: process.env.NODE_ENV });
});

// ─── Start server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
// Listen on 0.0.0.0 so Render can route external traffic to the process
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT} (NODE_ENV=${process.env.NODE_ENV})`);
});
