import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState, useEffect } from 'react';

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
);
const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

export default function LandingNavbar() {
  const { isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 z-50">
            <div className="w-8 h-8 rounded bg-brand-blue flex items-center justify-center text-white font-bold text-lg">
              📈
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">ZeroTrade</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <Link to="/hero"  className="hover:text-brand-blue transition-colors">Home</Link>
            <Link to="/about" className="hover:text-brand-blue transition-colors">About</Link>
            <Link to="/products" className="hover:text-brand-blue transition-colors">Products</Link>
            <Link to="/pricing" className="hover:text-brand-blue transition-colors">Pricing</Link>
            <Link to="/support" className="hover:text-brand-blue transition-colors">Support</Link>
            
            <div className="flex items-center gap-4 ml-4">
              {isAuthenticated ? (
                <Link to="/home" className="px-5 py-2.5 bg-brand-blue hover:bg-blue-600 text-white rounded-md transition-colors shadow-sm">
                  Enter App
                </Link>
              ) : (
                <>
                  <Link to="/login" className="px-5 py-2.5 hover:text-brand-blue transition-colors">Login</Link>
                  <Link to="/signup" className="px-5 py-2.5 bg-brand-blue hover:bg-blue-600 text-white rounded-md transition-colors shadow-sm">Sign up</Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden z-50 text-gray-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 bg-white z-40 flex flex-col pt-24 px-6 gap-6 text-lg font-medium transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
          <Link to="/about" className="text-left text-gray-600 hover:text-brand-blue pb-4 border-b border-gray-100" onClick={() => setMobileMenuOpen(false)}>About</Link>
          <Link to="/products" className="text-left text-gray-600 hover:text-brand-blue pb-4 border-b border-gray-100" onClick={() => setMobileMenuOpen(false)}>Products</Link>
          <Link to="/pricing" className="text-left text-gray-600 hover:text-brand-blue pb-4 border-b border-gray-100" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
          <Link to="/support" className="text-left text-gray-600 hover:text-brand-blue pb-4 border-b border-gray-100" onClick={() => setMobileMenuOpen(false)}>Support</Link>
          
          <div className="flex flex-col gap-4 mt-4">
             {isAuthenticated ? (
                <Link to="/home" className="text-center py-3 bg-brand-blue text-white rounded-md">Enter App</Link>
             ) : (
                <>
                  <Link to="/login" className="text-center py-3 border border-gray-300 rounded-md text-gray-700">Login</Link>
                  <Link to="/signup" className="text-center py-3 bg-brand-blue text-white rounded-md">Sign up</Link>
                </>
             )}
          </div>
        </div>
      </nav>
    </>
  );
}
