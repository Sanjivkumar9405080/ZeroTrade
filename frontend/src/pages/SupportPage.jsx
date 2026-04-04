import LandingNavbar from '../components/landing/LandingNavbar';
import LandingFooter from '../components/landing/LandingFooter';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useEffect } from 'react';

export default function SupportPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans selection:bg-brand-blue selection:text-white flex flex-col">
      <LandingNavbar />
      <div className="flex-grow pt-32 pb-24 px-6 flex items-center justify-center bg-slate-50">
         <div className="max-w-5xl mx-auto rounded-[3rem] overflow-hidden shadow-2xl relative bg-blue-600 w-full">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-800"></div>
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 p-10 md:p-16 lg:p-20 text-center text-white">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">How can we help you?</h2>
            <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Our dedicated support team is available 24/7 to assist you. Browse our help center or contact us directly.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
              <a href="mailto:support@zerotrade.com" className="px-8 py-4 bg-white text-blue-700 font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 text-lg w-full sm:w-auto justify-center group">
                Email Support <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#" className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center gap-2 text-lg w-full sm:w-auto justify-center">
                Visit Help Center
              </a>
            </div>
            
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm md:text-base font-medium text-blue-100">
              <span className="flex items-center gap-2"><CheckCircle2 size={18} className="text-emerald-400" /> Average response time: 2 hrs</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={18} className="text-emerald-400" /> 24/7 Availability</span>
            </div>
          </div>
        </div>
      </div>
      <LandingFooter />
    </div>
  );
}
