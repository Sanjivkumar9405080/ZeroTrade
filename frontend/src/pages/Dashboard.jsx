import { useEffect, useState, useCallback } from 'react';
import { getHoldings, getAllStocks, getWallet, getOrders } from '../services/api';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import TradeModal from '../components/TradeModal';

// Generate dummy sparkline chart data
const genChartData = () => {
  const data = [];
  let val = 100000;
  for (let i = 30; i >= 0; i--) {
    val += (Math.random() - 0.45) * 3000;
    const d = new Date();
    d.setDate(d.getDate() - i);
    data.push({ date: d.toLocaleDateString('en-IN', { day:'2-digit', month:'short' }), value: Math.max(60000, val) });
  }
  return data;
};

const fmtINR = (n) => Number(n || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 });

export default function Dashboard() {
  const [holdings,  setHoldings]  = useState([]);
  const [stocks,    setStocks]    = useState([]);
  const [wallet,    setWallet]    = useState(null);
  const [orders,    setOrders]    = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [chartData] = useState(genChartData);
  const [tradeModal, setTradeModal] = useState(null); // { stock, mode }

  const fetchAll = useCallback(async () => {
    try {
      const [h, s, w, o] = await Promise.all([
        getHoldings(), getAllStocks(), getWallet(), getOrders()
      ]);
      setHoldings(h.data);
      setStocks(s.data.slice(0, 8));
      setWallet(w.data.balance);
      setOrders(o.data.slice(0, 5));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // Compute P&L
  const totalInvested = holdings.reduce((s, h) => s + h.avgPrice * h.quantity, 0);
  const currentValue  = holdings.reduce((s, h) => {
    const stk = stocks.find(st => st.symbol === h.stockSymbol);
    return s + (stk ? stk.price : h.avgPrice) * h.quantity;
  }, 0);
  const totalPnL     = currentValue - totalInvested;
  const pnlPercent   = totalInvested > 0 ? ((totalPnL / totalInvested) * 100).toFixed(2) : '0.00';

  if (loading) return <div className="spinner-wrap"><div className="spinner" /></div>;

  return (
    <div className="fade-in">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Your portfolio at a glance</p>
        </div>
        <Link to="/markets" className="btn btn-primary">🏪 Go to Markets</Link>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">💰 Available Balance</div>
          <div className="stat-value" style={{ color: 'var(--clr-green)' }}>₹{fmtINR(wallet)}</div>
          <div className="stat-sub">Virtual wallet</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">📦 Total Invested</div>
          <div className="stat-value">₹{fmtINR(totalInvested)}</div>
          <div className="stat-sub">{holdings.length} stocks</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">📊 Current Value</div>
          <div className="stat-value">₹{fmtINR(currentValue)}</div>
          <div className="stat-sub">Market valuation</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">📈 Total P&L</div>
          <div className="stat-value" style={{ color: totalPnL >= 0 ? 'var(--clr-green)' : 'var(--clr-red)' }}>
            {totalPnL >= 0 ? '+' : ''}₹{fmtINR(Math.abs(totalPnL))}
          </div>
          <div className="stat-sub" style={{ color: totalPnL >= 0 ? 'var(--clr-green)' : 'var(--clr-red)' }}>
            {totalPnL >= 0 ? '▲' : '▼'} {Math.abs(pnlPercent)}%
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">📑 Total Orders</div>
          <div className="stat-value">{orders.length > 0 ? orders.length : 0}</div>
          <div className="stat-sub">All time</div>
        </div>
      </div>

      {/* Portfolio Chart */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="section-title">Portfolio Value (30 Days Simulation)</div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="pGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#3861fb" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3861fb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e2d40" />
            <XAxis dataKey="date" tick={{ fill: '#4b5563', fontSize: 11 }} tickLine={false} axisLine={false}
              interval={6} />
            <YAxis tick={{ fill: '#4b5563', fontSize: 11 }} tickLine={false} axisLine={false}
              tickFormatter={(v) => `₹${(v/1000).toFixed(0)}K`} />
            <Tooltip
              contentStyle={{ background: '#1c2333', border: '1px solid #1e2d40', borderRadius: '10px', color: '#e2e8f0' }}
              formatter={(v) => [`₹${v.toLocaleString('en-IN')}`, 'Portfolio Value']}
              labelStyle={{ color: '#94a3b8' }}
            />
            <Area type="monotone" dataKey="value" stroke="#3861fb" strokeWidth={2} fill="url(#pGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Top Movers */}
        <div className="card">
          <div className="section-title">🔥 Top Movers</div>
          {stocks.map((s) => (
            <div key={s.symbol} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 0', borderBottom: '1px solid var(--clr-border)',
            }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '14px' }}>{s.symbol}</div>
                <div style={{ fontSize: '11px', color: 'var(--clr-text-2)' }}>{s.sector}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 600, fontSize: '14px' }}>₹{fmtINR(s.price)}</div>
                <div style={{ fontSize: '12px', color: s.changePercent >= 0 ? 'var(--clr-green)' : 'var(--clr-red)' }}>
                  {s.changePercent >= 0 ? '+' : ''}{s.changePercent?.toFixed(2)}%
                </div>
              </div>
              <div style={{ display: 'flex', gap: '6px', marginLeft: '12px' }}>
                <button className="btn btn-green btn-sm"
                  onClick={() => setTradeModal({ stock: s, mode: 'BUY' })}>B</button>
                <button className="btn btn-red btn-sm"
                  onClick={() => setTradeModal({ stock: s, mode: 'SELL' })}>S</button>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="card">
          <div className="section-title" style={{ justifyContent: 'space-between' }}>
            📑 Recent Orders
            <Link to="/orders" style={{ fontSize: '12px', color: 'var(--clr-primary)', textDecoration: 'none', fontWeight: 'normal' }}>
              View all →
            </Link>
          </div>
          {orders.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <p>No orders yet. Start trading!</p>
            </div>
          ) : orders.map((o) => (
            <div key={o._id} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '10px 0', borderBottom: '1px solid var(--clr-border)',
            }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span className={`badge ${o.type === 'BUY' ? 'badge-green' : 'badge-red'}`}>{o.type}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '13px' }}>{o.stockSymbol}</div>
                  <div style={{ fontSize: '11px', color: 'var(--clr-text-2)' }}>Qty: {o.quantity}</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 600, fontSize: '13px' }}>₹{fmtINR(o.totalAmount)}</div>
                <span className="badge badge-blue" style={{ fontSize: '10px' }}>{o.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {tradeModal && (
        <TradeModal
          stock={tradeModal.stock}
          mode={tradeModal.mode}
          onClose={() => setTradeModal(null)}
          onSuccess={fetchAll}
        />
      )}
    </div>
  );
}
