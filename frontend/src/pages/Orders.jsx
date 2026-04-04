import { useEffect, useState, useCallback } from 'react';
import { getOrders } from '../services/api';

const fmtINR  = (n)   => Number(n || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 });
const fmtDate = (str) => new Date(str).toLocaleString('en-IN', {
  day: '2-digit', month: 'short', year: 'numeric',
  hour: '2-digit', minute: '2-digit'
});

export default function Orders() {
  const [orders,    setOrders]    = useState([]);
  const [filtered,  setFiltered]  = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [filter,    setFilter]    = useState('ALL'); // ALL | BUY | SELL
  const [search,    setSearch]    = useState('');

  const fetchOrders = useCallback(async () => {
    try {
      const res = await getOrders();
      setOrders(res.data);
      setFiltered(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  // Apply filters
  useEffect(() => {
    let result = orders;
    if (filter !== 'ALL') result = result.filter(o => o.type === filter);
    if (search) result = result.filter(o =>
      o.stockSymbol.toLowerCase().includes(search.toLowerCase()) ||
      o.stockName.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [filter, search, orders]);

  const totalBuy  = orders.filter(o => o.type === 'BUY').reduce((s, o) => s + o.totalAmount, 0);
  const totalSell = orders.filter(o => o.type === 'SELL').reduce((s, o) => s + o.totalAmount, 0);
  const realPnL   = totalSell - totalBuy;

  if (loading) return <div className="spinner-wrap"><div className="spinner" /></div>;

  return (
    <div className="fade-in">
      <div className="page-header">
        <div>
          <h1>Order Book</h1>
          <p>Complete history of all your trades</p>
        </div>
      </div>

      {/* Summary */}
      <div className="stats-grid" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <div className="stat-label">📑 Total Orders</div>
          <div className="stat-value">{orders.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">🟢 Total Bought</div>
          <div className="stat-value">₹{fmtINR(totalBuy)}</div>
          <div className="stat-sub">{orders.filter(o => o.type === 'BUY').length} orders</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">🔴 Total Sold</div>
          <div className="stat-value">₹{fmtINR(totalSell)}</div>
          <div className="stat-sub">{orders.filter(o => o.type === 'SELL').length} orders</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">💹 Realized P&L</div>
          <div className="stat-value" style={{ color: realPnL >= 0 ? 'var(--clr-green)' : 'var(--clr-red)' }}>
            {realPnL >= 0 ? '+' : ''}₹{fmtINR(Math.abs(realPnL))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div className="tab-bar" style={{ marginBottom: 0 }}>
          {['ALL', 'BUY', 'SELL'].map(f => (
            <button key={f} className={`tab-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input placeholder="Search by stock…"
            value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      {/* Orders Table */}
      <div className="card" style={{ padding: 0 }}>
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <p>No orders found.</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Type</th>
                  <th>Symbol</th>
                  <th>Company</th>
                  <th style={{ textAlign: 'right' }}>Qty</th>
                  <th style={{ textAlign: 'right' }}>Price</th>
                  <th style={{ textAlign: 'right' }}>Total</th>
                  <th style={{ textAlign: 'center' }}>Status</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((o, i) => (
                  <tr key={o._id}>
                    <td style={{ color: 'var(--clr-text-3)', fontSize: '12px' }}>{i + 1}</td>
                    <td>
                      <span className={`badge ${o.type === 'BUY' ? 'badge-green' : 'badge-red'}`}>
                        {o.type === 'BUY' ? '🟢 BUY' : '🔴 SELL'}
                      </span>
                    </td>
                    <td>
                      <span style={{
                        fontWeight: 700, color: 'var(--clr-primary)',
                        background: 'var(--clr-surface-2)',
                        padding: '3px 8px', borderRadius: '6px', fontSize: '13px'
                      }}>{o.stockSymbol}</span>
                    </td>
                    <td style={{ color: 'var(--clr-text-2)', fontSize: '12px', maxWidth: '180px' }}>
                      {o.stockName}
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: 600 }}>{o.quantity}</td>
                    <td style={{ textAlign: 'right' }}>₹{fmtINR(o.price)}</td>
                    <td style={{ textAlign: 'right', fontWeight: 700,
                      color: o.type === 'BUY' ? 'var(--clr-red)' : 'var(--clr-green)' }}>
                      {o.type === 'SELL' ? '+' : '-'}₹{fmtINR(o.totalAmount)}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span className={`badge ${o.status === 'COMPLETED' ? 'badge-green' : o.status === 'PENDING' ? 'badge-yellow' : 'badge-red'}`}>
                        {o.status}
                      </span>
                    </td>
                    <td style={{ color: 'var(--clr-text-2)', fontSize: '12px', whiteSpace: 'nowrap' }}>
                      {fmtDate(o.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
