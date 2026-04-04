import { useState } from 'react';
import toast from 'react-hot-toast';
import { buyStock, sellStock } from '../services/api';

export default function TradeModal({ stock, mode, onClose, onSuccess }) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading]   = useState(false);

  const isBuy      = mode === 'BUY';
  const totalCost  = (stock.price * quantity).toFixed(2);
  const fmtCur     = (n) => Number(n).toLocaleString('en-IN', { minimumFractionDigits: 2 });

  const handleTrade = async (e) => {
    e.preventDefault();
    if (quantity < 1) { toast.error('Quantity must be at least 1'); return; }
    setLoading(true);
    try {
      const payload = {
        stockSymbol: stock.symbol,
        stockName:   stock.name,
        quantity:    Number(quantity),
        price:       stock.price,
      };
      const res = isBuy ? await buyStock(payload) : await sellStock(payload);
      toast.success(res.data.message);
      onSuccess?.();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Trade failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div>
            <h3 style={{ color: isBuy ? 'var(--clr-green)' : 'var(--clr-red)' }}>
              {isBuy ? '🟢 Buy' : '🔴 Sell'} — {stock.symbol}
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--clr-text-2)', marginTop: '2px' }}>{stock.name}</p>
          </div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        {/* Price Info */}
        <div style={{
          background: 'var(--clr-surface-2)', borderRadius: '10px',
          padding: '14px 16px', marginBottom: '20px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--clr-text-2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Current Price</div>
            <div style={{ fontSize: '22px', fontWeight: 700 }}>₹{fmtCur(stock.price)}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '11px', color: 'var(--clr-text-2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Change</div>
            <div style={{
              fontSize: '15px', fontWeight: 600,
              color: stock.changePercent >= 0 ? 'var(--clr-green)' : 'var(--clr-red)'
            }}>
              {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent?.toFixed(2)}%
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleTrade}>
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              autoFocus
            />
          </div>

          {/* Quick qty buttons */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '16px', flexWrap: 'wrap' }}>
            {[1, 5, 10, 25, 50].map(q => (
              <button key={q} type="button" className="btn btn-outline btn-sm"
                style={{ boundary: quantity == q ? 'var(--clr-primary)' : undefined }}
                onClick={() => setQuantity(q)}>
                {q}
              </button>
            ))}
          </div>

          {/* Total */}
          <div style={{
            background: isBuy ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)',
            border: `1px solid ${isBuy ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}`,
            borderRadius: '10px', padding: '14px 16px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: '20px',
          }}>
            <span style={{ fontSize: '13px', color: 'var(--clr-text-2)' }}>
              {isBuy ? 'Total Cost' : 'Total Revenue'}
            </span>
            <span style={{ fontSize: '18px', fontWeight: 700,
              color: isBuy ? 'var(--clr-green)' : 'var(--clr-red)' }}>
              ₹{fmtCur(totalCost)}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="button" className="btn btn-outline btn-full" onClick={onClose}>Cancel</button>
            <button type="submit" className={`btn ${isBuy ? 'btn-green' : 'btn-red'} btn-full`} disabled={loading}>
              {loading ? 'Processing...' : `${isBuy ? 'Buy' : 'Sell'} Now`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
