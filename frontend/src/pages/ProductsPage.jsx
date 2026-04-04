import LandingNavbar from '../components/landing/LandingNavbar';
import ProductsSection from '../components/landing/ProductsSection';
import LandingFooter from '../components/landing/LandingFooter';
import { useEffect } from 'react';

export default function ProductsPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans selection:bg-brand-blue selection:text-white flex flex-col">
      <LandingNavbar />
      <div className="flex-grow pt-24 pb-12">
        <ProductsSection />
      </div>
      <LandingFooter />
    </div>
  );
}
