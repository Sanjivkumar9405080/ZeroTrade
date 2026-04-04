import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getWallet, addFunds } from '../services/api';
import toast from 'react-hot-toast';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [balance, setBalance] = useState(null);
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [amount, setAmount] = useState('');
  const [adding, setAdding] = useState(false);

  const fetchBalance = async () => {
    try {
      const res = await getWallet();
      setBalance(res.data.balance);
    } catch {}
  };

  useEffect(() => { fetchBalance(); }, []);

  const handleAddFunds = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error('Enter a valid amount');
      return;
    }
    setAdding(true);
    try {
      const res = await addFunds(Number(amount));
      setBalance(res.data.balance);
      toast.success(res.data.message);
      setAmount('');
      setShowAddFunds(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add funds');
    } finally {
      setAdding(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const fmt = (n) => n?.toLocaleString('en-IN', { minimumFractionDigits: 2 });

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 'var(--sidebar-w)', right: 0,
        height: 'var(--navbar-h)', zIndex: 100,
        background: 'rgba(10,14,26,0.92)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--clr-border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 28px', gap: '16px'
      }}>
        {/* Left: Logo text for mobile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '13px', color: 'var(--clr-text-2)' }}>
            Welcome, <strong style={{ color: 'var(--clr-text)' }}>{user?.name}</strong>
          </span>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Wallet */}
          <div style={{
            background: 'var(--clr-surface-2)', border: '1px solid var(--clr-border)',
            borderRadius: '10px', padding: '8px 16px',
            display: 'flex', alignItems: 'center', gap: '8px'
          }}>
            <span style={{ fontSize: '18px' }}>💰</span>
            <div>
              <div style={{ fontSize: '10px', color: 'var(--clr-text-2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Balance</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--clr-green)' }}>
                {balance !== null ? `₹${fmt(balance)}` : '...'}
              </div>
            </div>
          </div>

          <button className="btn btn-primary btn-sm" onClick={() => setShowAddFunds(true)}>+ Add Funds</button>

          <button className="btn btn-outline btn-sm" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Add Funds Modal */}
      {showAddFunds && (
        <div className="modal-overlay" onClick={() => setShowAddFunds(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>💰 Add Funds</h3>
              <button className="modal-close" onClick={() => setShowAddFunds(false)}>×</button>
            </div>
            <form onSubmit={handleAddFunds}>
              <div className="form-group">
                <label>Amount (₹)</label>
                <input
                  type="number"
                  placeholder="Enter amount e.g. 50000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"
                  max="1000000"
                  autoFocus
                />
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                {[5000, 10000, 25000, 50000].map(q => (
                  <button key={q} type="button" className="btn btn-outline btn-sm"
                    onClick={() => setAmount(q)}>₹{q.toLocaleString('en-IN')}</button>
                ))}
              </div>
              <button type="submit" className="btn btn-green btn-full btn-lg" disabled={adding}>
                {adding ? 'Adding...' : 'Add Funds'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
