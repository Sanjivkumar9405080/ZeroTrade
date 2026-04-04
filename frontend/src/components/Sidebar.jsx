import { NavLink } from 'react-router-dom';

const nav = [
  { to: '/dashboard', label: 'Dashboard',  icon: '📊' },
  { to: '/markets',   label: 'Markets',    icon: '🏪' },
  { to: '/holdings',  label: 'Holdings',   icon: '💼' },
  { to: '/positions', label: 'Positions',  icon: '⚡' },
  { to: '/orders',    label: 'Orders',     icon: '📑' },
];

export default function Sidebar() {
  return (
    <aside style={{
      width: 'var(--sidebar-w)',
      minHeight: '100vh',
      position: 'fixed',
      top: 0, left: 0, bottom: 0,
      background: 'var(--clr-surface)',
      borderRight: '1px solid var(--clr-border)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 200,
      overflowY: 'auto',
    }}>
      {/* Logo */}
      <div style={{
        height: 'var(--navbar-h)',
        display: 'flex', alignItems: 'center', gap: '12px',
        padding: '0 20px',
        borderBottom: '1px solid var(--clr-border)',
        flexShrink: 0,
      }}>
        <div style={{
          width: 34, height: 34,
          background: 'linear-gradient(135deg, var(--clr-primary), #7c3aed)',
          borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '16px', flexShrink: 0,
        }}>📈</div>
        <span style={{
          fontSize: '18px', fontWeight: 800,
          background: 'linear-gradient(135deg, #fff, #94a3b8)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>ZeroTrade</span>
      </div>

      {/* Label */}
      <div style={{ padding: '20px 20px 8px', fontSize: '10px', fontWeight: 600,
        color: 'var(--clr-text-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        Main Menu
      </div>

      {/* Nav Items */}
      <nav style={{ flex: 1, padding: '0 12px' }}>
        {nav.map(({ to, label, icon }) => (
          <NavLink key={to} to={to}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '11px 12px', borderRadius: '10px',
              textDecoration: 'none', marginBottom: '4px',
              fontSize: '14px', fontWeight: 500,
              transition: 'all 0.2s ease',
              background: isActive ? 'rgba(56,97,251,0.15)' : 'transparent',
              color: isActive ? 'var(--clr-primary)' : 'var(--clr-text-2)',
              borderLeft: isActive ? '3px solid var(--clr-primary)' : '3px solid transparent',
            })}
          >
            <span style={{ fontSize: '18px' }}>{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div style={{
        padding: '16px 20px',
        borderTop: '1px solid var(--clr-border)',
        fontSize: '11px', color: 'var(--clr-text-3)',
        textAlign: 'center',
      }}>
        <div>🟢 Paper Trading Mode</div>
        <div style={{ marginTop: '4px' }}>Real-time sim • No real money</div>
      </div>
    </aside>
  );
}
