import React from 'react';
import { Check, X, HelpCircle, Zap, Shield, Crown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PricingSection() {
  return (
    <div className="bg-slate-50 font-sans text-slate-800 selection:bg-blue-100">
      
      {/* 1. Header Section */}
      <section className="pt-24 pb-12 px-6 text-center max-w-4xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mb-6">
          Transparent Pricing
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
          Pricing that scales with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">your success</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
          No hidden fees, no complicated structures. Just straightforward pricing designed for investors and traders of all levels.
        </p>
      </section>

      {/* 2. Pricing Cards */}
      <section className="py-12 px-6 max-w-7xl mx-auto relative z-20">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          
          {/* Basic Plan */}
          <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full transform mt-4 md:mt-8">
            <div className="mb-8">
              <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center mb-6">
                <Shield size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Basic</h3>
              <p className="text-slate-500 text-sm mb-6 h-10">Perfect for beginners and long-term investors starting their journey.</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl md:text-5xl font-extrabold text-slate-900">₹0</span>
                <span className="text-slate-500 font-medium">/ forever</span>
              </div>
            </div>
            
            <ul className="space-y-4 mb-8 flex-grow">
              {[
                "Zero brokerage on equity delivery",
                "Zero commission on direct Mutual Funds",
                "Basic charting with standard indicators",
                "Standard email support",
                "Maximum 1 active device"
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check size={20} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-slate-600">{feature}</span>
                </li>
              ))}
            </ul>
            
            <Link to="/signup" className="w-full py-4 px-6 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition-colors duration-300 text-center">
              Get Started
            </Link>
          </div>

          {/* Pro Plan (Highlighted) */}
          <div className="bg-slate-900 rounded-[2rem] p-8 border border-slate-800 shadow-2xl relative flex flex-col h-full transform md:-mt-4 hover:-translate-y-2 transition-transform duration-300">
            <div className="absolute top-0 inset-x-0 flex justify-center -mt-4">
              <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full shadow-lg">
                Most Popular
              </span>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] pointer-events-none"></div>
            
            <div className="mb-8 relative z-10">
              <div className="w-12 h-12 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl flex items-center justify-center mb-6">
                <Zap size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Pro Trader</h3>
              <p className="text-slate-400 text-sm mb-6 h-10">Designed for active day traders requiring speed and advanced tools.</p>
              <div className="flex items-baseline gap-1">
                 <span className="text-4xl md:text-5xl font-extrabold text-white">₹20</span>
                <span className="text-slate-400 font-medium">/ trade</span>
              </div>
              <p className="text-slate-400 text-xs mt-1">or 0.03% (whichever is lower)</p>
            </div>
            
            <ul className="space-y-4 mb-8 flex-grow relative z-10">
              {[
                "Everything in Basic, plus:",
                "Intraday equity & F&O trading",
                "Advanced charting & technical tools",
                "Instant instant margin calculator",
                "Priority chat and call support",
                "Multiple active devices"
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check size={20} className="text-blue-400 shrink-0 mt-0.5" />
                  <span className={i === 0 ? "text-slate-300 font-semibold italic" : "text-slate-300"}>{feature}</span>
                </li>
              ))}
            </ul>
            
            <Link to="/signup" className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg transition-colors duration-300 text-center relative z-10">
              Try Pro Now
            </Link>
          </div>

          {/* Premium Plan */}
          <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full transform mt-4 md:mt-8">
            <div className="mb-8">
              <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center mb-6">
                <Crown size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Premium</h3>
              <p className="text-slate-500 text-sm mb-6 h-10">The ultimate suite for algorithmic traders and HNI investors.</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl md:text-5xl font-extrabold text-slate-900">₹999</span>
                <span className="text-slate-500 font-medium">/ month</span>
              </div>
            </div>
            
            <ul className="space-y-4 mb-8 flex-grow">
              {[
                "Zero brokerage on all segments",
                "Full API access for algo-trading",
                "Level 3 market data access",
                "Dedicated Relationship Manager",
                "Portfolio analysis & tax reports"
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check size={20} className="text-amber-500 shrink-0 mt-0.5" />
                  <span className="text-slate-600">{feature}</span>
                </li>
              ))}
            </ul>
            
            <Link to="/signup" className="w-full py-4 px-6 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition-colors duration-300 text-center">
              Get Premium
            </Link>
          </div>

        </div>
      </section>

      {/* 3. Feature Comparison Table */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Compare Features</h2>
          <p className="text-slate-600">A detailed breakdown of what's included in every plan.</p>
        </div>
        
        <div className="overflow-x-auto bg-white rounded-3xl shadow-xl border border-slate-100">
          <table className="w-full min-w-[600px] text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="py-6 px-6 font-bold text-slate-900 w-2/5">Features</th>
                <th className="py-6 px-6 font-bold text-slate-600 text-center w-1/5">Basic</th>
                <th className="py-6 px-6 font-bold text-blue-600 text-center w-1/5">Pro</th>
                <th className="py-6 px-6 font-bold text-amber-600 text-center w-1/5">Premium</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm md:text-base">
              {[
                { feature: "Equity Delivery Brokrage", basic: "₹0", pro: "₹0", premium: "₹0" },
                { feature: "Intraday & F&O Brokrage", basic: "Not Available", pro: "₹20/trade", premium: "₹0" },
                { feature: "Direct Mutual Funds", basic: true, pro: true, premium: true },
                { feature: "Charting Software", basic: "Standard", pro: "Advanced", premium: "Pro Plus" },
                { feature: "Algorithmic API Access", basic: false, pro: false, premium: true },
                { feature: "Margin Trading Facility", basic: false, pro: true, premium: true },
                { feature: "Customer Support", basic: "Email", pro: "Priority Chat", premium: "Dedicated RM" },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-5 px-6 font-medium text-slate-700">{row.feature}</td>
                  <td className="py-5 px-6 text-center text-slate-600">
                    {typeof row.basic === 'boolean' ? (row.basic ? <Check className="mx-auto text-emerald-500" size={20}/> : <X className="mx-auto text-slate-300" size={20}/>) : row.basic}
                  </td>
                  <td className="py-5 px-6 text-center font-medium text-slate-900 bg-blue-50/30">
                    {typeof row.pro === 'boolean' ? (row.pro ? <Check className="mx-auto text-blue-500" size={20}/> : <X className="mx-auto text-slate-300" size={20}/>) : row.pro}
                  </td>
                  <td className="py-5 px-6 text-center text-slate-600">
                    {typeof row.premium === 'boolean' ? (row.premium ? <Check className="mx-auto text-amber-500" size={20}/> : <X className="mx-auto text-slate-300" size={20}/>) : row.premium}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Bottom CTA */}
      <section className="py-20 px-6 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto bg-slate-900 rounded-[3rem] p-12 md:p-16 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-screen filter blur-[100px] opacity-40"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-screen filter blur-[100px] opacity-40"></div>
          
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 relative z-10">Start trading today</h2>
          <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto relative z-10">
            Open your account online in under 5 minutes and step into the future of investing. No paperwork required.
          </p>
          
          <Link to="/signup" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 font-bold rounded-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative z-10">
            Buy Now / Get Started <ArrowRight size={20} />
          </Link>
        </div>
      </section>

    </div>
  );
}
