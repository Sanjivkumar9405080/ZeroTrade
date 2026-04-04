import React from 'react';
import { Target, TrendingUp, ShieldCheck, Users, Zap, Award, ArrowRight, CheckCircle2, HeadphonesIcon, LineChart, Globe } from 'lucide-react';

export default function AboutAndSupportSection() {
  return (
    <div id="about" className="bg-slate-50 min-h-screen text-slate-800 font-sans selection:bg-blue-100">
      
      {/* 1. Hero Section */}
      <section className="relative pt-28 pb-20 px-6 overflow-hidden bg-white">
        <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-blue-50/70 to-transparent pointer-events-none"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-pulse"></div>
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            About ZeroTrade
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
            Empowering Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Financial Journey</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10">
            We are building the most intuitive, transparent, and powerful platform for modern investors to achieve their financial goals without the hassle of high fees.
          </p>
        </div>
      </section>

      {/* 2. Mission & Vision */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Mission */}
          <div className="group p-8 md:p-10 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300">
              <Target size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
            <p className="text-slate-600 leading-relaxed">
              To break down all barriers to entry in investing by providing zero-brokerage, seamless technology, and dedicated educational support. We believe that financial freedom should be accessible to everyone, everywhere.
            </p>
          </div>
          
          {/* Vision */}
          <div className="group p-8 md:p-10 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300">
              <TrendingUp size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
            <p className="text-slate-600 leading-relaxed">
              To become the central nervous system for retail investing worldwide, where every decision is powered by unbiased data, superior technology, and a community of thriving traders and investors.
            </p>
          </div>
        </div>
      </section>

      {/* 3. What We Do */}
      <section className="py-20 px-6 bg-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything You Need to Succeed</h2>
            <p className="text-lg text-slate-600">
              A comprehensive suite of tools and services designed to give you the ultimate trading edge.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <LineChart size={28} />,
                title: "Advanced Trading",
                description: "Lightning-fast execution, advanced charting, and deep analytics for pro investors.",
                color: "text-emerald-600",
                bg: "bg-emerald-50",
                borderColor: "hover:border-emerald-200"
              },
              {
                icon: <Globe size={28} />,
                title: "Global Markets",
                description: "Seamless access to domestic and international markets from a unified dashboard.",
                color: "text-blue-600",
                bg: "bg-blue-50",
                borderColor: "hover:border-blue-200"
              },
              {
                icon: <HeadphonesIcon size={28} />,
                title: "24/7 Support",
                description: "Dedicated financial experts and technical support available round the clock.",
                color: "text-indigo-600",
                bg: "bg-indigo-50",
                borderColor: "hover:border-indigo-200"
              }
            ].map((feature, idx) => (
              <div key={idx} className={`p-8 rounded-3xl bg-slate-50 hover:bg-white hover:shadow-xl border border-transparent ${feature.borderColor} md:hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center group`}>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 shadow-sm ${feature.bg} ${feature.color}`}>
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h4>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us */}
      <section className="py-24 px-6 bg-slate-900 text-white relative overflow-hidden">
        {/* Subtle background abstract shapes */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-900/40 to-transparent"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-screen filter blur-[100px]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-300 text-sm font-bold mb-6 backdrop-blur-sm border border-white/5">
              Why ZeroTrade
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">Why Millions Trust Us</h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed max-w-xl">
              We did not just build a brokerage; we built a technology company that empowers your financial life with transparency and innovation.
            </p>
            <div className="space-y-6">
              {[
                { icon: <Zap size={22} />, text: "Zero Commission on Delivery Trades" },
                { icon: <ShieldCheck size={22} />, text: "Bank-grade Security Protocols" },
                { icon: <Award size={22} />, text: "Award-winning Mobile Platform" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-blue-400 flex items-center justify-center shrink-0 group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500 transition-all duration-300 shadow-lg">
                    {item.icon}
                  </div>
                  <span className="text-xl font-medium text-slate-200 group-hover:text-white transition-colors">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Abstract Data Visualization */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-full">
            <div className="aspect-square rounded-[2rem] bg-gradient-to-tr from-blue-600/20 to-indigo-900/40 p-6 md:p-8 shadow-2xl border border-white/10 backdrop-blur-xl transform md:-rotate-2 hover:rotate-0 transition-transform duration-500 group">
              <div className="w-full h-full rounded-2xl border border-white/20 bg-slate-900/50 flex flex-col justify-between p-6 md:p-8 shadow-inner relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400"></div>
                
                <div className="flex justify-between items-center bg-white/5 rounded-2xl p-5 border border-white/10 hover:bg-white/10 transition-colors duration-300">
                  <div>
                    <div className="text-slate-400 text-sm font-medium mb-1 tracking-wider uppercase">Total Assets</div>
                    <div className="text-3xl md:text-4xl font-extrabold font-mono text-white">$12.4B+</div>
                  </div>
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <TrendingUp className="text-emerald-400" size={28} />
                  </div>
                </div>
                
                <div className="space-y-5 my-8">
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-2 font-medium"><span>Equities</span><span>75%</span></div>
                    <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden shadow-inner">
                      <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 w-3/4 group-hover:w-[78%] transition-all duration-1000"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-2 font-medium"><span>Mutual Funds</span><span>50%</span></div>
                    <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden shadow-inner">
                      <div className="h-full bg-gradient-to-r from-indigo-400 to-indigo-600 w-1/2 group-hover:w-[55%] transition-all duration-1000"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-2 font-medium"><span>Commodities</span><span>85%</span></div>
                    <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden shadow-inner">
                      <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 w-5/6 group-hover:w-[90%] transition-all duration-1000"></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-900 flex justify-center items-center overflow-hidden shadow-xl z-20" style={{ zIndex: 10 - i }}>
                        <Users size={16} className="text-slate-400"/>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="text-sm text-white font-bold">Join 5M+ Traders</div>
                    <div className="text-xs text-emerald-400 font-medium">Growing every day</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Team Section */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Built by Experts</h2>
            <p className="text-lg text-slate-600">
              A diverse team of engineers, financial analysts, and designers relentlessly focused on your success.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { name: "Alex Mercer", role: "CEO & Founder", init: "AM", color: "bg-blue-100 text-blue-700" },
              { name: "Sarah Chen", role: "CTO", init: "SC", color: "bg-indigo-100 text-indigo-700" },
              { name: "Michael Ross", role: "Head of Trading", init: "MR", color: "bg-emerald-100 text-emerald-700" },
              { name: "Priya Sharma", role: "Lead Designer", init: "PS", color: "bg-purple-100 text-purple-700" }
            ].map((member, idx) => (
              <div key={idx} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                <div className={`w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full flex items-center justify-center text-xl md:text-2xl font-black mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300 ${member.color}`}>
                  {member.init}
                </div>
                <h4 className="text-lg md:text-xl font-bold text-slate-900">{member.name}</h4>
                <p className="text-sm md:text-base text-slate-500 mt-2 font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Call to Action & Support */}
      <section id="support" className="py-0 px-6 mb-24 relative z-20">
        <div className="max-w-5xl mx-auto rounded-[3rem] overflow-hidden shadow-2xl relative bg-blue-600">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-800"></div>
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 p-10 md:p-16 lg:p-20 text-center text-white">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">Ready to transform your trading?</h2>
            <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join millions of investors who have already made the switch. Open your account in under 5 minutes or contact our support team to learn more.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
              <a href="/signup" className="px-8 py-4 bg-white text-blue-700 font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 text-lg w-full sm:w-auto justify-center group">
                Get Started Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="mailto:support@zerotrade.com" className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center gap-2 text-lg w-full sm:w-auto justify-center">
                Contact Support
              </a>
            </div>
            
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm md:text-base font-medium text-blue-100">
              <span className="flex items-center gap-2"><CheckCircle2 size={18} className="text-emerald-400" /> No hidden fees</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={18} className="text-emerald-400" /> 100% Online process</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={18} className="text-emerald-400" /> 24/7 Support</span>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}
