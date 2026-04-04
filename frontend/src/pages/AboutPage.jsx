import LandingNavbar from '../components/landing/LandingNavbar';
import AboutAndSupportSection from '../components/landing/AboutAndSupportSection';
import LandingFooter from '../components/landing/LandingFooter';
import { useEffect } from 'react';

export default function AboutPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans selection:bg-brand-blue selection:text-white flex flex-col">
      <LandingNavbar />
      <div className="flex-grow pt-0">
        <AboutAndSupportSection />
      </div>
      <LandingFooter />
    </div>
  );
}
