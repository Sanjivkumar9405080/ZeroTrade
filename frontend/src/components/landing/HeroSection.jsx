import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function HeroSection() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto text-center flex flex-col items-center">
      <div className="w-full max-w-2xl mb-12">
        {/* Abstract Illustration representation */}
        <div className="relative w-full aspect-video bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden flex items-center justify-center shadow-inner mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent"></div>
          <div className="relative z-10 grid grid-cols-4 gap-4 w-3/4 opacity-80">
            <div className="h-24 bg-blue-500 rounded-sm rounded-tr-xl transform translate-y-4"></div>
            <div className="h-32 bg-indigo-400 rounded-sm rounded-tr-xl transform -translate-y-2"></div>
            <div className="h-20 bg-emerald-400 rounded-sm rounded-tr-xl transform translate-y-8"></div>
            <div className="h-40 bg-brand-blue rounded-sm rounded-tr-xl transform -translate-y-6"></div>
          </div>
          {/* Soft glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-blue/20 blur-3xl rounded-full pointer-events-none"></div>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 tracking-tight leading-tight mb-6">
          Invest in everything
        </h1>
        <p className="text-xl text-gray-500 mb-10 max-w-xl mx-auto">
          Online platform to invest in stocks, derivatives, mutual funds, and more. Join India's zero-brokerage trading simulation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {isAuthenticated ? (
            <Link to="/home" className="px-8 py-3.5 bg-brand-blue hover:bg-blue-600 text-white font-medium rounded shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5 text-lg">
              Enter App
            </Link>
          ) : (
            <Link to="/signup" className="px-8 py-3.5 bg-brand-blue hover:bg-blue-600 text-white font-medium rounded shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5 text-lg">
              Sign up now
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
