const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

// Models
const Stock   = require('./models/Stock');
const User    = require('./models/User');
const Wallet  = require('./models/Wallet');
const Holding = require('./models/Holding');
const Order   = require('./models/Order');

// ─── Sample Data ────────────────────────────────────────────────────────────

const stocks = [
  { symbol: 'RELIANCE',   name: 'Reliance Industries Ltd',          price: 2456.75, change: 1.23,    changePercent: 0.50,  sector: 'Energy',   high: 2470.00, low: 2430.00, volume: 4523678 },
  { symbol: 'TCS',        name: 'Tata Consultancy Services',         price: 3678.40, change: -45.60,  changePercent: -1.22, sector: 'IT',       high: 3730.00, low: 3665.00, volume: 2134567 },
  { symbol: 'INFY',       name: 'Infosys Ltd',                       price: 1423.55, change: 18.90,   changePercent: 1.35,  sector: 'IT',       high: 1440.00, low: 1410.00, volume: 3456789 },
  { symbol: 'HDFCBANK',   name: 'HDFC Bank Ltd',                     price: 1567.25, change: -12.35,  changePercent: -0.78, sector: 'Banking',  high: 1580.00, low: 1555.00, volume: 5678901 },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd',                 price: 987.60,  change: 23.40,   changePercent: 2.43,  sector: 'Telecom',  high: 995.00,  low: 970.00,  volume: 2345678 },
  { symbol: 'WIPRO',      name: 'Wipro Ltd',                         price: 456.80,  change: -5.20,   changePercent: -1.13, sector: 'IT',       high: 465.00,  low: 453.00,  volume: 4567890 },
  { symbol: 'BAJFINANCE', name: 'Bajaj Finance Ltd',                 price: 6789.45, change: 134.55,  changePercent: 2.02,  sector: 'Finance',  high: 6810.00, low: 6680.00, volume: 1234567 },
  { symbol: 'HCLTECH',    name: 'HCL Technologies Ltd',              price: 1234.70, change: 22.30,   changePercent: 1.84,  sector: 'IT',       high: 1250.00, low: 1220.00, volume: 2345679 },
  { symbol: 'AXISBANK',   name: 'Axis Bank Ltd',                     price: 1056.35, change: -8.65,   changePercent: -0.81, sector: 'Banking',  high: 1070.00, low: 1050.00, volume: 6789012 },
  { symbol: 'TATAMOTORS', name: 'Tata Motors Ltd',                   price: 876.50,  change: 34.50,   changePercent: 4.10,  sector: 'Auto',     high: 890.00,  low: 845.00,  volume: 7890123 },
  { symbol: 'SBIN',       name: 'State Bank of India',               price: 623.75,  change: 11.25,   changePercent: 1.84,  sector: 'Banking',  high: 630.00,  low: 615.00,  volume: 8901234 },
  { symbol: 'MARUTI',     name: 'Maruti Suzuki India Ltd',           price: 10234.60,change: -123.40, changePercent: -1.19, sector: 'Auto',     high: 10380.00,low: 10200.00,volume: 567890  },
  { symbol: 'SUNPHARMA',  name: 'Sun Pharmaceutical Industries',     price: 1123.40, change: 15.60,   changePercent: 1.41,  sector: 'Pharma',   high: 1135.00, low: 1110.00, volume: 3456780 },
  { symbol: 'ONGC',       name: 'Oil and Natural Gas Corporation',   price: 267.85,  change: 4.15,    changePercent: 1.57,  sector: 'Energy',   high: 272.00,  low: 264.00,  volume: 9012345 },
  { symbol: 'ITC',        name: 'ITC Ltd',                           price: 434.20,  change: -2.80,   changePercent: -0.64, sector: 'FMCG',     high: 438.00,  low: 431.00,  volume: 5678902 },
  { symbol: 'KOTAKBANK',  name: 'Kotak Mahindra Bank Ltd',           price: 1789.90, change: 28.10,   changePercent: 1.60,  sector: 'Banking',  high: 1800.00, low: 1770.00, volume: 1234568 },
  { symbol: 'LT',         name: 'Larsen and Toubro Ltd',             price: 3456.75, change: 67.25,   changePercent: 1.98,  sector: 'Infra',    high: 3480.00, low: 3400.00, volume: 980123  },
  { symbol: 'NESTLEIND',  name: 'Nestle India Ltd',                  price: 24567.80,change: -234.20, changePercent: -0.94, sector: 'FMCG',     high: 24800.00,low: 24500.00,volume: 123456  },
  { symbol: 'POWERGRID',  name: 'Power Grid Corporation of India',   price: 278.45,  change: 5.55,    changePercent: 2.03,  sector: 'Power',    high: 282.00,  low: 274.00,  volume: 4567891 },
  { symbol: 'ULTRACEMCO', name: 'UltraTech Cement Ltd',              price: 8934.60, change: 165.40,  changePercent: 1.89,  sector: 'Cement',   high: 8960.00, low: 8780.00, volume: 456789  },
];

const usersRaw = [
  { name: 'Rahul Sharma',  email: 'rahul@zerodha.com',  password: 'password123' },
  { name: 'Priya Patel',   email: 'priya@zerodha.com',  password: 'password123' },
  { name: 'Amit Kumar',    email: 'amit@zerodha.com',   password: 'password123' },
];

// ─── Seed Function ───────────────────────────────────────────────────────────

const importData = async () => {
  try {
    // 1. Connect
    console.log('\n🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ Connected to database: "${mongoose.connection.name}"`);
    console.log(`   Host: ${mongoose.connection.host}\n`);

    // 2. Clear existing data
    console.log('🗑️  Clearing existing collections...');
    await Promise.all([
      Stock.deleteMany({}),
      User.deleteMany({}),
      Wallet.deleteMany({}),
      Holding.deleteMany({}),
      Order.deleteMany({}),
    ]);
    console.log('   ✔ stocks, users, wallets, holdings, orders — cleared\n');

    // 3. Seed Stocks
    console.log('📈 Seeding stocks collection...');
    const insertedStocks = await Stock.insertMany(stocks);
    console.log(`   ✔ ${insertedStocks.length} stocks inserted into "zerodha.stocks"\n`);

    // 4. Seed Users (with hashed passwords)
    console.log('👤 Seeding users collection...');
    const hashedUsers = await Promise.all(
      usersRaw.map(async (u) => ({
        ...u,
        password: await bcrypt.hash(u.password, 10),
      }))
    );
    const insertedUsers = await User.insertMany(hashedUsers);
    insertedUsers.forEach((u) =>
      console.log(`   ✔ User created → ${u.name} (${u.email}) [_id: ${u._id}]`)
    );
    console.log(`   Total: ${insertedUsers.length} users inserted into "zerodha.users"\n`);

    // 5. Seed Wallets (₹1,00,000 for each user)
    console.log('💰 Seeding wallets collection...');
    const wallets = insertedUsers.map((u) => ({
      userId:  u._id,
      balance: 100000,
    }));
    const insertedWallets = await Wallet.insertMany(wallets);
    console.log(`   ✔ ${insertedWallets.length} wallets inserted into "zerodha.wallets"\n`);

    // 6. Seed Holdings (tie to first user: Rahul)
    const rahul = insertedUsers[0];
    console.log(`📊 Seeding holdings collection (for user: ${rahul.name})...`);
    const holdings = [
      { userId: rahul._id, stockSymbol: 'RELIANCE',   stockName: 'Reliance Industries Ltd',      quantity: 10, avgPrice: 2400.00 },
      { userId: rahul._id, stockSymbol: 'TCS',        stockName: 'Tata Consultancy Services',     quantity: 5,  avgPrice: 3500.00 },
      { userId: rahul._id, stockSymbol: 'INFY',       stockName: 'Infosys Ltd',                   quantity: 20, avgPrice: 1350.00 },
      { userId: rahul._id, stockSymbol: 'HDFCBANK',   stockName: 'HDFC Bank Ltd',                 quantity: 15, avgPrice: 1500.00 },
      { userId: rahul._id, stockSymbol: 'TATAMOTORS', stockName: 'Tata Motors Ltd',               quantity: 30, avgPrice: 820.00  },
    ];
    const insertedHoldings = await Holding.insertMany(holdings);
    insertedHoldings.forEach((h) =>
      console.log(`   ✔ ${h.stockSymbol} — qty: ${h.quantity}, avgPrice: ₹${h.avgPrice}`)
    );
    console.log(`   Total: ${insertedHoldings.length} holdings inserted into "zerodha.holdings"\n`);

    // 7. Seed Orders
    const priya = insertedUsers[1];
    console.log('📋 Seeding orders collection...');
    const orders = [
      // Rahul's orders
      { userId: rahul._id, stockSymbol: 'RELIANCE',   stockName: 'Reliance Industries Ltd', type: 'BUY',  quantity: 10, price: 2400.00, totalAmount: 24000.00,  status: 'COMPLETED' },
      { userId: rahul._id, stockSymbol: 'TCS',        stockName: 'Tata Consultancy Services',type: 'BUY',  quantity: 5,  price: 3500.00, totalAmount: 17500.00,  status: 'COMPLETED' },
      { userId: rahul._id, stockSymbol: 'INFY',       stockName: 'Infosys Ltd',              type: 'BUY',  quantity: 20, price: 1350.00, totalAmount: 27000.00,  status: 'COMPLETED' },
      { userId: rahul._id, stockSymbol: 'WIPRO',      stockName: 'Wipro Ltd',                type: 'SELL', quantity: 8,  price: 470.00,  totalAmount: 3760.00,   status: 'COMPLETED' },
      // Priya's orders
      { userId: priya._id, stockSymbol: 'SBIN',       stockName: 'State Bank of India',      type: 'BUY',  quantity: 50, price: 600.00,  totalAmount: 30000.00,  status: 'COMPLETED' },
      { userId: priya._id, stockSymbol: 'HDFCBANK',   stockName: 'HDFC Bank Ltd',            type: 'BUY',  quantity: 10, price: 1550.00, totalAmount: 15500.00,  status: 'COMPLETED' },
      { userId: priya._id, stockSymbol: 'BAJFINANCE', stockName: 'Bajaj Finance Ltd',        type: 'SELL', quantity: 3,  price: 6700.00, totalAmount: 20100.00,  status: 'COMPLETED' },
    ];
    const insertedOrders = await Order.insertMany(orders);
    insertedOrders.forEach((o) =>
      console.log(`   ✔ [${o.type}] ${o.stockSymbol} — qty: ${o.quantity}, ₹${o.totalAmount} (${o.status})`)
    );
    console.log(`   Total: ${insertedOrders.length} orders inserted into "zerodha.orders"\n`);

    // 8. Summary
    console.log('═══════════════════════════════════════════════════');
    console.log('✅  SEED COMPLETED — Database: "zerodha"');
    console.log('═══════════════════════════════════════════════════');
    console.log(`   stocks   : ${insertedStocks.length}`);
    console.log(`   users    : ${insertedUsers.length}`);
    console.log(`   wallets  : ${insertedWallets.length}`);
    console.log(`   holdings : ${insertedHoldings.length}`);
    console.log(`   orders   : ${insertedOrders.length}`);
    console.log('═══════════════════════════════════════════════════');
    console.log('\n👉 Open MongoDB Compass → connect to your Atlas URI');
    console.log('   You should see the "zerodha" database with all collections.\n');

    process.exit(0);
  } catch (error) {
    console.error(`\n❌ Seeding failed: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
};

importData();
