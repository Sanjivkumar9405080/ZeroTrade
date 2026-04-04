import React from 'react';
import { ArrowRight, BarChart3, PieChart, Zap, Shield, LineChart, Cpu, Clock, Layers, CheckCircle2, LayoutDashboard, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProductsSection() {
  return (
    <div className="bg-white font-sans text-slate-800 selection:bg-blue-100 overflow-hidden">
      
      {/* 1. Hero / Intro Section */}
      <section className="relative pt-20 pb-32 px-6 lg:pt-28">
        <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-blue-50/80 to-transparent pointer-events-none"></div>
        {/* Abstract background elements */}
        <div className="absolute right-0 top-20 w-1/3 h-[500px] bg-indigo-50/50 rounded-l-[100px] -z-10 rotate-3 transform origin-right hidden lg:block"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-bold mb-8 shadow-sm">
            <Zap size={16} className="text-amber-500" />
            <span>The Ultimate Trading Platform</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 max-w-4xl leading-tight">
            Trade with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Precision and Power</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10">
            A comprehensive suite of professional-grade tools designed for everyone—from everyday investors to high-frequency algorithmic traders.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
            <Link to="/signup" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2">
              Get Started for Free <ArrowRight size={20} />
            </Link>
            <a href="#features" className="px-8 py-4 bg-white text-slate-700 font-bold rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 flex items-center justify-center">
              Explore Features
            </a>
          </div>

          {/* Hero Dashboard Screenshot Placeholder */}
          <div className="mt-20 w-full max-w-6xl mx-auto relative perspective-1000">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-[2rem] blur opacity-20"></div>
            <div className="relative rounded-[2rem] border border-slate-200/60 bg-white/50 backdrop-blur-xl shadow-2xl p-2 md:p-4 overflow-hidden transform transition-transform duration-700 hover:scale-[1.01]">
              <div className="bg-slate-50 rounded-xl border border-slate-100 overflow-hidden shadow-inner flex flex-col">
                {/* Mock Browser/App Header */}
                <div className="h-12 bg-white border-b border-slate-200 flex items-center px-4 gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                  </div>
                  <div className="ml-4 h-6 bg-slate-100 rounded flex-grow max-w-md border border-slate-200"></div>
                </div>
                {/* Mock App Content */}
                <div className="p-4 md:p-8 grid grid-cols-1 md:grid-cols-4 gap-6 h-[400px] md:h-[600px]">
                  {/* Left Sidebar Mock */}
                  <div className="hidden md:flex flex-col gap-4 border-r border-slate-200 pr-6">
                    <div className="h-8 w-3/4 bg-slate-200 rounded-md mb-4"></div>
                    {[1,2,3,4,5].map(i => <div key={i} className="h-10 w-full bg-white border border-slate-100 rounded-lg"></div>)}
                  </div>
                  {/* Main Chart Area Mock */}
                  <div className="md:col-span-3 flex flex-col gap-6">
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="h-6 w-32 bg-slate-200 rounded mb-2"></div>
                        <div className="h-10 w-48 bg-slate-800 rounded"></div>
                      </div>
                      <div className="flex gap-2">
                        <div className="h-8 w-16 bg-emerald-100 rounded"></div>
                        <div className="h-8 w-16 bg-red-100 rounded"></div>
                      </div>
                    </div>
                    {/* Mock Chart */}
                    <div className="flex-grow bg-white border border-slate-200 rounded-xl relative overflow-hidden flex items-end p-0">
                      {/* CSS-based Mock Chart Lines */}
                      <svg className="w-full h-full absolute inset-0 text-blue-500/20" preserveAspectRatio="none" viewBox="0 0 100 100">
                        <path d="M0,100 L0,50 Q25,30 50,60 T100,20 L100,100 Z" fill="currentColor"></path>
                      </svg>
                      <svg className="w-full h-full absolute inset-0 text-blue-500" preserveAspectRatio="none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M0,50 Q25,30 50,60 T100,20"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Feature Cards Grid */}
      <section id="features" className="py-24 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">One platform. <span className="text-blue-600">Every asset class.</span></h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Explore a comprehensive range of investment products carefully integrated into a single, unified interface.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Stocks & IPOs', desc: 'Direct market access for equity trading with advanced charting plugins.', icon: <BarChart3 size={32} /> },
              { title: 'Mutual Funds', desc: 'Invest in direct mutual funds with absolutely zero hidden commissions.', icon: <PieChart size={32} /> },
              { title: 'Futures & Options', desc: 'Pro-level derivatives trading with real-time margin calculations.', icon: <Zap size={32} /> },
              { title: 'Bonds & G-Sec', desc: 'Secure your portfolio with fixed-income government and corporate bonds.', icon: <Shield size={32} /> }
            ].map((p, i) => (
              <div key={i} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:bg-white hover:border-blue-100 hover:shadow-xl transition-all duration-300 group">
                <div className="w-14 h-14 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-blue-600 mb-6 shadow-sm group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  {p.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{p.title}</h3>
                <p className="text-slate-600 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Detailed Feature 1 - Left Text, Right Image */}
      <section className="py-24 px-6 bg-slate-50 border-y border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            {/* Visualizer Placeholder */}
            <div className="relative rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="flex gap-4 mb-6">
                <div className="w-full h-32 bg-indigo-50 rounded-xl border border-indigo-100 flex items-center justify-center">
                  <LineChart className="text-indigo-300 w-16 h-16 opacity-50" />
                </div>
                <div className="w-full h-32 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-center">
                   <BarChart3 className="text-blue-300 w-16 h-16 opacity-50" />
                </div>
              </div>
              <div className="w-full h-48 bg-slate-50 rounded-xl border border-slate-100 p-4 relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded">LIVE DATA</div>
                <div className="space-y-3 mt-8">
                  <div className="w-full h-2 bg-slate-200 rounded-full"></div>
                  <div className="w-3/4 h-2 bg-slate-200 rounded-full"></div>
                  <div className="w-5/6 h-2 bg-slate-200 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
              <LayoutDashboard size={24} />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Advanced Charting & Analytics</h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Spot trends instantly with real-time streaming data, over 100 technical indicators, and highly customizable chart layouts. Our interface adapts to your trading style, not the other way around.
            </p>
            <ul className="space-y-4">
              {[
                "Real-time tick-by-tick data streaming",
                "Save multiple workspaces and monitor setups",
                "Integrated financial news and company insights"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="text-blue-600 shrink-0 mt-0.5" size={20} />
                  <span className="text-slate-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Detailed Feature 2 - Left Image, Right Text */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
              <Cpu size={24} />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Lightning Fast Execution Engine</h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Never miss a market opportunity. Built on modern tech stacks, our proprietary order execution engine processes trades in under 10 milliseconds, ensuring you get the price you see.
            </p>
            <ul className="space-y-4">
              {[
                "Ultra-low latency infrastructure",
                "Advanced order types (GTT, Trailing Stop-Loss, BO/CO)",
                "Robust API access for algorithmic trading"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="text-indigo-600 shrink-0 mt-0.5" size={20} />
                  <span className="text-slate-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative relative-group">
             {/* Visualizer Placeholder */}
             <div className="relative rounded-3xl bg-slate-900 shadow-2xl p-8 transform rotate-1 hover:rotate-0 transition-transform duration-500 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-screen filter blur-[80px] opacity-40"></div>
                <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
                  <span className="text-slate-300 font-mono text-sm">Engine Status: <span className="text-emerald-400">Online</span></span>
                  <Terminal className="text-slate-400" size={20} />
                </div>
                <div className="font-mono text-sm text-green-400 space-y-2 opacity-80">
                  <p>{'>'} initialize_connection()</p>
                  <p>{'>'} [OK] Socket connected to exchange</p>
                  <p>{'>'} place_order(type="LIMIT", side="BUY", qty=100)</p>
                  <p className="text-blue-400">{'>'} [SYS] Routing through dark pool...</p>
                  <p className="text-slate-300">{'>'} Executing...</p>
                  <div className="flex items-center gap-2 mt-4 text-emerald-400 bg-emerald-400/10 px-3 py-2 rounded">
                    <Clock size={16} /> Order filled in 8.4ms
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 5. Use Cases / Key Benefits */}
      <section className="py-24 px-6 bg-slate-900 text-white relative">
        <div className="absolute inset-0 bg-blue-900/20"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Built for every type of investor</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Whether you're making your first trade or writing complex prediction algorithms, we have the tools you need.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md hover:bg-white/10 transition-colors">
              <Zap className="text-amber-400 mb-6 w-10 h-10" />
              <h3 className="text-2xl font-bold mb-4">Day Traders</h3>
              <p className="text-slate-400 mb-6 leading-relaxed">Leverage high-speed execution, deep market depth, and specialized keyboard shortcuts to capitalize on intraday swings.</p>
              <a href="#" className="text-amber-400 font-bold hover:underline flex items-center gap-1">Learn about Margin <ArrowRight size={16}/></a>
            </div>
            
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md hover:bg-white/10 transition-colors">
              <Layers className="text-emerald-400 mb-6 w-10 h-10" />
              <h3 className="text-2xl font-bold mb-4">Long-term Investors</h3>
              <p className="text-slate-400 mb-6 leading-relaxed">Build wealth steadily with direct mutual funds, SIP automation, fundamental analysis tools, and zero brokerage on delivery.</p>
              <a href="#" className="text-emerald-400 font-bold hover:underline flex items-center gap-1">View Mutual Funds <ArrowRight size={16}/></a>
            </div>
            
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md hover:bg-white/10 transition-colors">
              <Terminal className="text-blue-400 mb-6 w-10 h-10" />
              <h3 className="text-2xl font-bold mb-4">Algorithmic Traders</h3>
              <p className="text-slate-400 mb-6 leading-relaxed">Connect your custom trading bots to our robust API. Get access to historical tick data and real-time websocket streams.</p>
              <a href="#" className="text-blue-400 font-bold hover:underline flex items-center gap-1">Read API Docs <ArrowRight size={16}/></a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Call to Action */}
      <section className="py-24 px-6 bg-white text-center">
        <div className="max-w-4xl mx-auto bg-gradient-to-vr from-slate-50 to-blue-50/30 border border-slate-100 p-12 lg:p-20 rounded-[3rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-[80px] opacity-70"></div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight relative z-10">Ready to take control?</h2>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto relative z-10">
            Join over 5 million users who trust ZeroTrade for their daily trading and long-term wealth creation.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 relative z-10">
            <Link to="/signup" className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 w-full sm:w-auto justify-center">
              Try Now for Free
            </Link>
            <Link to="/about" className="px-10 py-4 bg-white text-slate-700 font-bold text-lg rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all duration-300 w-full sm:w-auto justify-center">
              Learn More
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
