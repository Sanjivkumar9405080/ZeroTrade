import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { signupUser, verifySignupOtp } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const [step, setStep] = useState(1);
  const [form, setForm]     = useState({ name: '', email: '', password: '', otp: '' });
  const [loading, setLoading] = useState(false);
  const { login }           = useAuth();
  const navigate            = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { toast.error('Please fill all fields'); return; }
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      const res = await signupUser({ name: form.name, email: form.email, password: form.password });
      toast.success(res.data.message || 'OTP Sent to email! Please check.');
      setStep(2); // Go to OTP step
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!form.otp) { toast.error('Please enter OTP'); return; }
    setLoading(true);
    try {
      const res = await verifySignupOtp({ email: form.email, otp: form.otp });
      login(res.data.token, res.data.user);
      toast.success(`Account verified! You got ₹1,00,000 to trade! 🎉`);
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
            <h2>Create account</h2>
            <p className="auth-sub">Start paper trading with ₹1 Lakh virtual money</p>

            <form onSubmit={handleSignupSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="name" placeholder="Rahul Sharma"
                  value={form.name} onChange={handleChange} autoFocus />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" name="email" placeholder="rahul@example.com"
                  value={form.email} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" name="password" placeholder="Min 6 characters"
                  value={form.password} onChange={handleChange} />
              </div>
              <button type="submit" className="btn btn-green btn-full btn-lg" disabled={loading}
                style={{ marginTop: '8px' }}>
                {loading ? 'Sending OTP...' : 'Create Account — Free'}
              </button>
            </form>

            <p className="auth-link">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>

            <div style={{
              marginTop: '20px', padding: '12px 14px',
              background: 'rgba(34,197,94,0.08)', borderRadius: '8px',
              border: '1px solid rgba(34,197,94,0.2)',
              fontSize: '12px', color: 'var(--clr-text-2)'
            }}>
              🎁 Get <strong style={{ color: 'var(--clr-green)' }}>₹1,00,000</strong> virtual balance instantly after OTP verification!
            </div>
          </>
        ) : (
          <>
            <h2>Verify Your Email</h2>
            <p className="auth-sub">Enter the 6-digit OTP sent to {form.email}</p>

            <form onSubmit={handleOtpSubmit}>
              <div className="form-group">
                <label>OTP Code</label>
                <input type="text" name="otp" placeholder="123456" maxLength="6"
                  value={form.otp} onChange={handleChange} autoFocus
                  style={{ textAlign: 'center', letterSpacing: '4px', fontSize: '18px' }} />
              </div>
              <button type="submit" className="btn btn-green btn-full btn-lg" disabled={loading}
                style={{ marginTop: '8px' }}>
                {loading ? 'Verifying...' : 'Verify OTP & Play'}
              </button>
              <button type="button" className="btn btn-full" disabled={loading}
                onClick={() => setStep(1)}
                style={{ marginTop: '8px', background: 'transparent', color: 'var(--clr-text-2)' }}>
                Re-enter details
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
}
