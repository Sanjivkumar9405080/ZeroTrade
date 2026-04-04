import { useEffect, useState, useCallback } from 'react';
import { getAllStocks } from '../services/api';
import TradeModal from '../components/TradeModal';

const fmtINR = (n) => Number(n || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 });

export default function Markets() {
  const [stocks,     setStocks]     = useState([]);
  const [filtered,   setFiltered]   = useState([]);
  const [search,     setSearch]     = useState('');
  const [loading,    setLoading]    = useState(true);
  const [tradeModal, setTradeModal] = useState(null);
  const [activeTab,  setActiveTab]  = useState('ALL');

  const sectors = ['ALL', 'IT', 'Banking', 'Energy', 'Auto', 'Finance', 'Pharma', 'FMCG', 'Telecom'];

  const fetchStocks = useCallback(async () => {
    try {
      const res = await getAllStocks(search);
      setStocks(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => { fetchStocks(); }, [fetchStocks]);

  // Live price refresh every 5 seconds
  useEffect(() => {
    const timer = setInterval(fetchStocks, 5000);
    return () => clearInterval(timer);
  }, [fetchStocks]);

  // Filter by sector tab
  useEffect(() => {
    if (activeTab === 'ALL') setFiltered(stocks);
    else setFiltered(stocks.filter(s => s.sector === activeTab));
  }, [stocks, activeTab]);

  if (loading) return <div className="spinner-wrap"><div className="spinner" /></div>;

  const gainers = [...stocks].sort((a, b) => b.changePercent - a.changePercent).slice(0, 3);
  const losers  = [...stocks].sort((a, b) => a.changePercent - b.changePercent).slice(0, 3);

  return (
    <div className="fade-in">
      <div className="page-header">
        <div>
          <h1>Markets</h1>
          <p>NSE stocks — prices refresh every 5 seconds</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            fontSize: '11px', color: 'var(--clr-green)',
            background: 'rgba(34,197,94,0.1)', borderRadius: '99px',
            padding: '4px 12px', border: '1px solid rgba(34,197,94,0.2)'
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--clr-green)',
              animation: 'pulse 1.5s infinite', display: 'inline-block' }} />
            LIVE
          </span>
        </div>
      </div>

      {/* Top Gainers / Losers */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        <div className="card">
          <div className="section-title">🚀 Top Gainers</div>
          {gainers.map(s => (
            <div key={s.symbol} style={{
              display: 'flex', justifyContent: 'space-between', padding: '8px 0',
              borderBottom: '1px solid var(--clr-border)', alignItems: 'center'
            }}>
              <span style={{ fontWeight: 600, fontSize: '13px' }}>{s.symbol}</span>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>₹{fmtINR(s.price)}</div>
                <div className="positive" style={{ fontSize: '12px' }}>+{s.changePercent?.toFixed(2)}%</div>
              </div>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="section-title">📉 Top Losers</div>
          {losers.map(s => (
            <div key={s.symbol} style={{
              display: 'flex', justifyContent: 'space-between', padding: '8px 0',
              borderBottom: '1px solid var(--clr-border)', alignItems: 'center'
            }}>
              <span style={{ fontWeight: 600, fontSize: '13px' }}>{s.symbol}</span>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>₹{fmtINR(s.price)}</div>
                <div className="negative" style={{ fontSize: '12px' }}>{s.changePercent?.toFixed(2)}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="card" style={{ padding: '16px 20px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div className="search-bar" style={{ maxWidth: '300px' }}>
            <span className="search-icon">🔍</span>
            <input
              placeholder="Search stocks…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="tab-bar" style={{ marginBottom: 0 }}>
            {sectors.map(s => (
              <button key={s} className={`tab-btn ${activeTab === s ? 'active' : ''}`}
                onClick={() => setActiveTab(s)}>{s}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Stock Table */}
      <div className="card" style={{ padding: 0 }}>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Company</th>
                <th>Sector</th>
                <th style={{ textAlign: 'right' }}>Price (₹)</th>
                <th style={{ textAlign: 'right' }}>Change</th>
                <th style={{ textAlign: 'right' }}>High</th>
                <th style={{ textAlign: 'right' }}>Low</th>
                <th style={{ textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.symbol}>
                  <td>
                    <span style={{
                      fontWeight: 700, fontSize: '13px',
                      background: 'var(--clr-surface-2)',
                      padding: '3px 8px', borderRadius: '6px',
                      color: 'var(--clr-primary)'
                    }}>{s.symbol}</span>
                  </td>
                  <td style={{ color: 'var(--clr-text-2)', fontSize: '13px' }}>{s.name}</td>
                  <td>
                    <span className="badge badge-blue">{s.sector}</span>
                  </td>
                  <td style={{ textAlign: 'right', fontWeight: 600 }}>₹{fmtINR(s.price)}</td>
                  <td style={{ textAlign: 'right' }}>
                    <span className={s.changePercent >= 0 ? 'positive' : 'negative'}>
                      {s.changePercent >= 0 ? '+' : ''}{s.changePercent?.toFixed(2)}%
                    </span>
                  </td>
                  <td style={{ textAlign: 'right', color: 'var(--clr-text-2)', fontSize: '13px' }}>
                    ₹{fmtINR(s.high)}
                  </td>
                  <td style={{ textAlign: 'right', color: 'var(--clr-text-2)', fontSize: '13px' }}>
                    ₹{fmtINR(s.low)}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                      <button className="btn btn-green btn-sm"
                        onClick={() => setTradeModal({ stock: s, mode: 'BUY' })}>Buy</button>
                      <button className="btn btn-red btn-sm"
                        onClick={() => setTradeModal({ stock: s, mode: 'SELL' })}>Sell</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={8}>
                  <div className="empty-state">
                    <div className="empty-icon">🔍</div>
                    <p>No stocks match your search</p>
                  </div>
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {tradeModal && (
        <TradeModal
          stock={tradeModal.stock}
          mode={tradeModal.mode}
          onClose={() => setTradeModal(null)}
          onSuccess={() => {}}
        />
      )}
    </div>
  );
}
