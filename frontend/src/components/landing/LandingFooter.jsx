export default function LandingFooter() {
  return (
    <footer className="bg-gray-50 pt-16 pb-8 px-6 border-t border-gray-200 text-sm">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded bg-brand-blue flex items-center justify-center text-white font-bold text-xs">
                📈
              </div>
              <span className="text-lg font-bold text-gray-800">ZeroTrade</span>
            </div>
            <p className="text-gray-500 mb-4">© 2010 - 2026, ZeroTrade Broking Ltd.<br/>All rights reserved.</p>
            <div className="flex gap-4 text-gray-400 text-lg">
              {/* Social icons placeholders */}
              <a href="#" className="hover:text-gray-600 font-bold transition-all">𝕏</a>
              <a href="#" className="hover:text-gray-600 font-bold transition-all">f</a>
              <a href="#" className="hover:text-gray-600 font-bold transition-all">in</a>
              <a href="#" className="hover:text-gray-600 font-bold transition-all">ig</a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-700 mb-4 uppercase text-xs tracking-wider">Company</h4>
            <ul className="space-y-3 text-gray-500">
              <li><a href="#" className="hover:text-brand-blue transition-colors">About</a></li>
              <li><a href="#" className="hover:text-brand-blue transition-colors">Products</a></li>
              <li><a href="#" className="hover:text-brand-blue transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-brand-blue transition-colors">Referral programme</a></li>
              <li><a href="#" className="hover:text-brand-blue transition-colors">Careers</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-700 mb-4 uppercase text-xs tracking-wider">Support</h4>
            <ul className="space-y-3 text-gray-500">
              <li><a href="#" className="hover:text-brand-blue transition-colors">Contact us</a></li>
              <li><a href="#" className="hover:text-brand-blue transition-colors">Support portal</a></li>
              <li><a href="#" className="hover:text-brand-blue transition-colors">Z-Connect blog</a></li>
              <li><a href="#" className="hover:text-brand-blue transition-colors">List of charges</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-700 mb-4 uppercase text-xs tracking-wider">Account</h4>
            <ul className="space-y-3 text-gray-500">
              <li><a href="#" className="hover:text-brand-blue transition-colors">Open an account</a></li>
              <li><a href="#" className="hover:text-brand-blue transition-colors">Fund transfer</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 text-xs text-gray-400 space-y-4">
          <p>
            ZeroTrade Broking Ltd.: Member of NSE & BSE – SEBI Registration no.: INZ000031633 CDSL: Depository services through ZeroTrade Broking Ltd. – SEBI Registration no.: IN-DP-431-2019 Commodity Trading through ZeroTrade Commodities Pvt. Ltd. MCX: 46025 – SEBI Registration no.: INZ000038238 Registered Address: ZeroTrade Broking Ltd., #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School, J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. 
          </p>
          <p>
            Investments in securities market are subject to market risks; read all the related documents carefully before investing.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-6">
            <a href="#" className="hover:text-gray-600 transition-colors">NSE</a>
            <a href="#" className="hover:text-gray-600 transition-colors">BSE</a>
            <a href="#" className="hover:text-gray-600 transition-colors">MCX</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Terms & conditions</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Policies & procedures</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
