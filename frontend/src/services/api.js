import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Automatically attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 errors globally — but skip redirect for auth routes
// (avoids redirect loops when validating token on page load)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthRoute =
      error.config?.url?.includes('/auth/login') ||
      error.config?.url?.includes('/auth/register') ||
      error.config?.url?.includes('/auth/me');

    if (error.response?.status === 401 && !isAuthRoute) {
      console.warn('[API] 401 on protected route — clearing session and redirecting to /login');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

// ── Auth ──────────────────────────────────────────
export const signupUser       = (data) => API.post('/auth/signup', data);
export const verifySignupOtp  = (data) => API.post('/auth/verify-signup-otp', data);
export const loginUser        = (data) => API.post('/auth/login', data);
export const verifyLoginOtp   = (data) => API.post('/auth/verify-login-otp', data);
export const getMe            = ()     => API.get('/auth/me');

// ── Wallet ───────────────────────────────────────
export const getWallet  = ()       => API.get('/wallet');
export const addFunds   = (amount) => API.post('/wallet/add', { amount });

// ── Stocks ───────────────────────────────────────
export const getAllStocks     = (search = '') => API.get(`/stocks?search=${search}`);
export const getStockBySymbol = (symbol)      => API.get(`/stocks/${symbol}`);

// ── Orders ───────────────────────────────────────
export const getOrders = () => API.get('/orders');
export const buyStock  = (data) => API.post('/orders/buy', data);
export const sellStock = (data) => API.post('/orders/sell', data);

// ── Holdings ─────────────────────────────────────
export const getHoldings = () => API.get('/holdings');

// ── Positions ────────────────────────────────────
export const getPositions   = () => API.get('/positions');
export const getAllPositions = () => API.get('/positions/all');

export default API;
