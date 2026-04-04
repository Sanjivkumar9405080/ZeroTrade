import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthContext';
import Home from './pages/Home';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Holdings from './pages/Holdings';
import Positions from './pages/Positions';
import Orders from './pages/Orders';
import Markets from './pages/Markets';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import PricingPage from './pages/PricingPage';
import SupportPage from './pages/SupportPage';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return (
    <div className="spinner-wrap" style={{ height: '100vh' }}>
      <div className="spinner" />
    </div>
  );
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Public route wrapper (prevent logged-in users from accessing login/signup/landing)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  return isAuthenticated ? <Navigate to="/home" replace /> : children;
};

// Layout with Navbar + Sidebar
const AppLayout = ({ children }) => (
  <div className="app-layout">
    <Sidebar />
    <div style={{ flex: 1 }}>
      <Navbar />
      <main className="main-content fade-in">{children}</main>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1c2333',
            color: '#e2e8f0',
            border: '1px solid #1e2d40',
            borderRadius: '10px',
            fontSize: '14px',
          },
          success: { iconTheme: { primary: '#22c55e', secondary: '#fff' } },
          error:   { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
        }}
      />
      <Routes>
        {/* Public (Hidden if logged in) */}
        <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
        <Route path="/about" element={<PublicRoute><AboutPage /></PublicRoute>} />
        <Route path="/products" element={<PublicRoute><ProductsPage /></PublicRoute>} />
        <Route path="/pricing" element={<PublicRoute><PricingPage /></PublicRoute>} />
        <Route path="/support" element={<PublicRoute><SupportPage /></PublicRoute>} />
        <Route path="/login"  element={<PublicRoute><Login /></PublicRoute>}  />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
        
        {/* Protected */}
        <Route path="/home" element={
          <ProtectedRoute>
            <AppLayout><HomePage /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <AppLayout><Dashboard /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/markets" element={
          <ProtectedRoute>
            <AppLayout><Markets /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/holdings" element={
          <ProtectedRoute>
            <AppLayout><Holdings /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/positions" element={
          <ProtectedRoute>
            <AppLayout><Positions /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/orders" element={
          <ProtectedRoute>
            <AppLayout><Orders /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
