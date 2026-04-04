import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { loginUser, verifyLoginOtp } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [step, setStep] = useState(1);
  const [form, setForm]     = useState({ email: '', password: '', otp: '' });
  const [loading, setLoading] = useState(false);
  const { login }           = useAuth();
  const navigate            = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { toast.error('Please fill all fields'); return; }
    setLoading(true);
    try {
      const res = await loginUser({ email: form.email, password: form.password });
      toast.success(res.data.message || 'OTP Sent to your email');
      setStep(2); // Go to OTP step
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!form.otp) { toast.error('Please enter OTP'); return; }
    setLoading(true);
    try {
      const res = await verifyLoginOtp({ email: form.email, otp: form.otp });
      login(res.data.token, res.data.user);
      toast.success(`Welcome back, ${res.data.user.name}! 🚀`);
      navigate('/home');
    } catch (err) {
      toast.error(err.response?.data?.message || 'OTP Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card slide-up">
        <div className="auth-logo">
          <div className="auth-logo-icon">📈</div>
          <span className="auth-logo-text">ZeroTrade</span>
        </div>
        
        {step === 1 ? (
          <>
            <h2>Welcome back</h2>
            <p className="auth-sub">Sign in to your trading account</p>

            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" name="email" placeholder="you@example.com"
                  value={form.email} onChange={handleChange} autoFocus />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" name="password" placeholder="Enter your password"
                  value={form.password} onChange={handleChange} />
              </div>
              <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading}
                style={{ marginTop: '8px' }}>
                {loading ? 'Verifying...' : 'Sign In'}
              </button>
            </form>

            <p className="auth-link">
              Don't have an account? <Link to="/signup">Create one</Link>
            </p>
          </>
        ) : (
          <>
            <h2>Verify Login</h2>
            <p className="auth-sub">Enter the 6-digit OTP sent to your email.</p>

            <form onSubmit={handleOtpSubmit}>
              <div className="form-group">
                <label>OTP Verification</label>
                <input type="text" name="otp" placeholder="123456" maxLength="6"
                  value={form.otp} onChange={handleChange} autoFocus
                  style={{ textAlign: 'center', letterSpacing: '4px', fontSize: '18px' }} />
              </div>
              <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading}
                style={{ marginTop: '8px' }}>
                {loading ? 'Verifying...' : 'Verify OTP & Login'}
              </button>
              <button type="button" className="btn btn-full" disabled={loading}
                onClick={() => setStep(1)}
                style={{ marginTop: '8px', background: 'transparent', color: 'var(--clr-text-2)' }}>
                Back to Login
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
}
