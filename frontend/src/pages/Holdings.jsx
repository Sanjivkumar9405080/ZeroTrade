import { useEffect, useState, useCallback } from 'react';
import { getHoldings, getAllStocks } from '../services/api';
import TradeModal from '../components/TradeModal';

const fmtINR = (n) => Number(n || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 });

export default function Holdings() {
  const [holdings,   setHoldings]   = useState([]);
  const [stocks,     setStocks]     = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [tradeModal, setTradeModal] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const [h, s] = await Promise.all([getHoldings(), getAllStocks()]);
      setHoldings(h.data);
      setStocks(s.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const getCurrentPrice = (symbol) =>
    stocks.find(s => s.symbol === symbol)?.price || 0;

  const getPnL = (h) => {
    const curr = getCurrentPrice(h.stockSymbol);
    const pnl  = (curr - h.avgPrice) * h.quantity;
    const pct  = h.avgPrice > 0 ? ((curr - h.avgPrice) / h.avgPrice) * 100 : 0;
    return { pnl, pct, curr };
  };

  const totalInvested    = holdings.reduce((s, h) => s + h.avgPrice * h.quantity, 0);
  const totalCurrentVal  = holdings.reduce((s, h) => s + getCurrentPrice(h.stockSymbol) * h.quantity, 0);
  const totalPnL         = totalCurrentVal - totalInvested;
  const totalPct         = totalInvested > 0 ? ((totalPnL / totalInvested) * 100).toFixed(2) : '0.00';

  if (loading) return <div className="spinner-wrap"><div className="spinner" /></div>;

  return (
    <div className="fade-in">
      <div className="page-header">
        <div>
          <h1>Holdings</h1>
          <p>Your long-term stock portfolio</p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="stats-grid" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <div className="stat-label">📦 Total Invested</div>
          <div className="stat-value">₹{fmtINR(totalInvested)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">📊 Current Value</div>
          <div className="stat-value">₹{fmtINR(totalCurrentVal)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">📈 Total P&L</div>
          <div className="stat-value" style={{ color: totalPnL >= 0 ? 'var(--clr-green)' : 'var(--clr-red)' }}>
            {totalPnL >= 0 ? '+' : ''}₹{fmtINR(Math.abs(totalPnL))}
          </div>
          <div className="stat-sub" style={{ color: totalPnL >= 0 ? 'var(--clr-green)' : 'var(--clr-red)' }}>
            {totalPnL >= 0 ? '▲' : '▼'} {Math.abs(totalPct)}%
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">🏷️ Stocks Owned</div>
          <div className="stat-value">{holdings.length}</div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="card" style={{ padding: 0 }}>
        {holdings.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">💼</div>
            <p>You have no holdings yet.</p>
            <a href="/markets" className="btn btn-primary" style={{ marginTop: '8px' }}>Buy your first stock →</a>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Company</th>
                  <th style={{ textAlign: 'right' }}>Qty</th>
                  <th style={{ textAlign: 'right' }}>Avg Price</th>
                  <th style={{ textAlign: 'right' }}>LTP</th>
                  <th style={{ textAlign: 'right' }}>Invested</th>
                  <th style={{ textAlign: 'right' }}>Current</th>
                  <th style={{ textAlign: 'right' }}>P&L</th>
                  <th style={{ textAlign: 'right' }}>P&L %</th>
                  <th style={{ textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((h) => {
                  const { pnl, pct, curr } = getPnL(h);
                  const invested = h.avgPrice * h.quantity;
                  const currentVal = curr * h.quantity;
                  return (
                    <tr key={h._id}>
                      <td>
                        <span style={{
                          fontWeight: 700, color: 'var(--clr-primary)',
                          background: 'var(--clr-surface-2)',
                          padding: '3px 8px', borderRadius: '6px', fontSize: '13px'
                        }}>{h.stockSymbol}</span>
                      </td>
                      <td style={{ color: 'var(--clr-text-2)', fontSize: '13px' }}>{h.stockName}</td>
                      <td style={{ textAlign: 'right', fontWeight: 600 }}>{h.quantity}</td>
                      <td style={{ textAlign: 'right' }}>₹{fmtINR(h.avgPrice)}</td>
                      <td style={{ textAlign: 'right', fontWeight: 600 }}>₹{fmtINR(curr)}</td>
                      <td style={{ textAlign: 'right' }}>₹{fmtINR(invested)}</td>
                      <td style={{ textAlign: 'right' }}>₹{fmtINR(currentVal)}</td>
                      <td style={{ textAlign: 'right' }}>
                        <span className={pnl >= 0 ? 'positive' : 'negative'}>
                          {pnl >= 0 ? '+' : ''}₹{fmtINR(Math.abs(pnl))}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <span className={pnl >= 0 ? 'positive' : 'negative'}>
                          {pnl >= 0 ? '+' : ''}{pct.toFixed(2)}%
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button className="btn btn-red btn-sm"
                          onClick={() => setTradeModal({
                            stock: { symbol: h.stockSymbol, name: h.stockName, price: curr, changePercent: pct },
                            mode: 'SELL'
                          })}>
                          Sell
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {tradeModal && (
        <TradeModal
          stock={tradeModal.stock}
          mode={tradeModal.mode}
          onClose={() => setTradeModal(null)}
          onSuccess={fetchData}
        />
      )}
    </div>
  );
}
