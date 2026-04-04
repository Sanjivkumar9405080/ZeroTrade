import LandingNavbar from '../components/landing/LandingNavbar';
import HeroSection from '../components/landing/HeroSection';
import LandingSignup from '../components/landing/LandingSignup';
import LandingFooter from '../components/landing/LandingFooter';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans selection:bg-brand-blue selection:text-white">
      <LandingNavbar />
      <HeroSection />
      
      {/* Sections separated into pages: /about, /products, /pricing, /support */}
      
      <LandingSignup />
      <LandingFooter />
    </div>
  );
}
