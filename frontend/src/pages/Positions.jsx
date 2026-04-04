import { useEffect, useState, useCallback } from 'react';
import { getPositions, getAllPositions } from '../services/api';

const fmtINR   = (n)   => Number(n || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 });
const fmtDate  = (str) => new Date(str).toLocaleString('en-IN', { day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit' });

export default function Positions() {
  const [todayPos,  setTodayPos]  = useState([]);
  const [allPos,    setAllPos]    = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [activeTab, setActiveTab] = useState('TODAY');

  const fetchData = useCallback(async () => {
    try {
      const [t, a] = await Promise.all([getPositions(), getAllPositions()]);
      setTodayPos(t.data);
      setAllPos(a.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const positions = activeTab === 'TODAY' ? todayPos : allPos;

  const todayBuys   = todayPos.filter(p => p.type === 'BUY');
  const todaySells  = todayPos.filter(p => p.type === 'SELL');
  const buyValue    = todayBuys.reduce((s, p) => s + p.buyPrice * p.quantity, 0);
  const sellValue   = todaySells.reduce((s, p) => s + p.buyPrice * p.quantity, 0);
  const intradayPnL = sellValue - buyValue;

  if (loading) return <div className="spinner-wrap"><div className="spinner" /></div>;

  return (
    <div className="fade-in">
      <div className="page-header">
        <div>
          <h1>Positions</h1>
          <p>Intraday and historical trade positions</p>
        </div>
      </div>

      {/* Summary */}
      <div className="stats-grid" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <div className="stat-label">⚡ Today's Trades</div>
          <div className="stat-value">{todayPos.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">🟢 Buy Value</div>
          <div className="stat-value">₹{fmtINR(buyValue)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">🔴 Sell Value</div>
          <div className="stat-value">₹{fmtINR(sellValue)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">📊 Intraday P&L</div>
          <div className="stat-value" style={{ color: intradayPnL >= 0 ? 'var(--clr-green)' : 'var(--clr-red)' }}>
            {intradayPnL >= 0 ? '+' : ''}₹{fmtINR(Math.abs(intradayPnL))}
          </div>
        </div>
      </div>

      {/* Tab */}
      <div className="tab-bar">
        <button className={`tab-btn ${activeTab === 'TODAY' ? 'active' : ''}`} onClick={() => setActiveTab('TODAY')}>
          Today ({todayPos.length})
        </button>
        <button className={`tab-btn ${activeTab === 'ALL' ? 'active' : ''}`} onClick={() => setActiveTab('ALL')}>
          All History ({allPos.length})
        </button>
      </div>

      {/* Table */}
      <div className="card" style={{ padding: 0 }}>
        {positions.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">⚡</div>
            <p>{activeTab === 'TODAY' ? "No trades today yet." : "No position history."}</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Symbol</th>
                  <th>Company</th>
                  <th style={{ textAlign: 'right' }}>Qty</th>
                  <th style={{ textAlign: 'right' }}>Price</th>
                  <th style={{ textAlign: 'right' }}>Total Value</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {positions.map((p) => (
                  <tr key={p._id}>
                    <td>
                      <span className={`badge ${p.type === 'BUY' ? 'badge-green' : 'badge-red'}`}>
                        {p.type === 'BUY' ? '🟢 BUY' : '🔴 SELL'}
                      </span>
                    </td>
                    <td>
                      <span style={{
                        fontWeight: 700, color: 'var(--clr-primary)',
                        background: 'var(--clr-surface-2)',
                        padding: '3px 8px', borderRadius: '6px', fontSize: '13px'
                      }}>{p.stockSymbol}</span>
                    </td>
                    <td style={{ color: 'var(--clr-text-2)', fontSize: '13px' }}>{p.stockName}</td>
                    <td style={{ textAlign: 'right', fontWeight: 600 }}>{p.quantity}</td>
                    <td style={{ textAlign: 'right' }}>₹{fmtINR(p.buyPrice)}</td>
                    <td style={{ textAlign: 'right', fontWeight: 600 }}>
                      ₹{fmtINR(p.buyPrice * p.quantity)}
                    </td>
                    <td style={{ color: 'var(--clr-text-2)', fontSize: '12px' }}>
                      {fmtDate(p.createdAt)}
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
