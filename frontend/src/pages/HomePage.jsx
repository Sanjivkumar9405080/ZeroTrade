import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const { user } = useAuth();
  
  return (
    <div className="max-w-6xl mx-auto py-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-brand-blue to-indigo-600 rounded-2xl p-8 mb-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 transform translate-x-10 -translate-y-10">
          <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z"/></svg>
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome back to ZeroTrade, {user?.name.split(' ')[0]}!</h1>
          <p className="text-blue-100 text-lg max-w-xl">
            Dive into the markets with your ₹1,00,000 virtual balance. Discover top stocks and track your live simulated portfolio.
          </p>
        </div>
      </div>

      {/* Info / Quick Links */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Link to="/markets" className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow hover:border-blue-200 group">
          <div className="w-12 h-12 bg-blue-50 text-brand-blue rounded-full flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">🏪</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Explore Markets</h3>
          <p className="text-sm text-gray-500">Live stock prices, volume, and seamless buy/sell access matching NSE data.</p>
        </Link>
        <Link to="/dashboard" className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow hover:border-emerald-200 group">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">📊</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Dashboard Analytics</h3>
          <p className="text-sm text-gray-500">View your virtual portfolio performance timeline, top movers, and recent history.</p>
        </Link>
        <Link to="/holdings" className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow hover:border-purple-200 group">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">💼</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Your Holdings</h3>
          <p className="text-sm text-gray-500">Track long-term trades, view real-time P&L changes, and manage your current equity.</p>
        </Link>
      </div>

      {/* Educational block */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 flex flex-col md:flex-row gap-8 items-center">
        <div className="md:w-1/3">
          <div className="aspect-square rounded-full border-8 border-white shadow-xl bg-gradient-to-tr from-orange-100 to-amber-200 flex items-center justify-center flex-shrink-0 relative">
            <span className="text-6xl">💡</span>
          </div>
        </div>
        <div className="md:w-2/3">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Beginner's Guide to Paper Trading</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            ZeroTrade is built to perfectly simulate real-market conditions without the financial risk. Start by picking one or two sectors you understand, invest your mock capital, and watch the behavior of those specific assets throughout the trading session. 
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Remember, intraday trades are settled automatically as `Positions`, whereas long-term deliveries are recorded into `Holdings`.
          </p>
          <a href="#" className="inline-flex items-center gap-2 font-medium text-brand-blue hover:text-blue-700">
            Read complete tutorial <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
}
