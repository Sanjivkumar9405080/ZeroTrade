import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { signupUser, verifySignupOtp } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function LandingSignup() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', email: '', password: '', otp: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { toast.error('Please fill all fields'); return; }
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      const res = await signupUser({ name: form.name, email: form.email, password: form.password });
      toast.success(res.data.message || 'OTP Sent! Please verify.');
      setStep(2);
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
    <section id="signup" className="py-24 px-6 bg-white border-b border-gray-100">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center">
        <div className="md:w-1/2">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">Open a ZeroTrade account</h2>
          <p className="text-lg text-gray-500 mb-6">
            Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.
          </p>
          <ul className="space-y-4 text-gray-600 mb-8">
            <li className="flex items-center gap-3"><span className="text-green-500 font-bold">✓</span> Free ₹1,00,000 virtual balance</li>
            <li className="flex items-center gap-3"><span className="text-green-500 font-bold">✓</span> Real-time NSE stock simulation</li>
            <li className="flex items-center gap-3"><span className="text-green-500 font-bold">✓</span> Detailed portfolio analytics</li>
          </ul>
        </div>
        
        <div className="md:w-1/2 w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl shadow-blue-500/10 border border-gray-100 p-8 relative">
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand-blue/10 rounded-full blur-2xl"></div>
            
            {step === 1 ? (
              <>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Sign up now</h3>
                <p className="text-sm text-gray-500 mb-6">Create your free paper trading account</p>
                
                <form onSubmit={handleSignupSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Full Name</label>
                    <input type="text" name="name" placeholder="John Doe"
                      value={form.name} onChange={handleChange} 
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Email Address</label>
                    <input type="email" name="email" placeholder="john@example.com"
                      value={form.email} onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Password</label>
                    <input type="password" name="password" placeholder="Min 6 characters"
                      value={form.password} onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all" />
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full bg-brand-blue hover:bg-blue-600 text-white font-medium rounded-lg px-4 py-3.5 mt-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed">
                    {loading ? 'Sending OTP...' : 'Continue'}
                  </button>
                </form>
                <p className="text-xs text-center text-gray-400 mt-6">
                  By submitting, you agree to our Terms & Conditions.
                </p>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Verify OTP</h3>
                <p className="text-sm text-gray-500 mb-6">Enter the 6-digit code sent to your email.</p>
                
                <form onSubmit={handleOtpSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">OTP Code</label>
                    <input type="text" name="otp" placeholder="123456" maxLength="6"
                      value={form.otp} onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 text-center tracking-[4px] text-lg focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all" />
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg px-4 py-3.5 mt-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed">
                    {loading ? 'Verifying...' : 'Verify & Play'}
                  </button>
                  <button type="button" onClick={() => setStep(1)} disabled={loading}
                    className="w-full bg-transparent border border-gray-300 text-gray-600 font-medium rounded-lg px-4 py-3 mt-2 transition-colors hover:bg-gray-50">
                    Back
                  </button>
                </form>
              </>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
