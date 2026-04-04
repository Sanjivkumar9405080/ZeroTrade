const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const Wallet = require('../models/Wallet');

// Temporary in-memory store for signup flows
// (In production, use Redis or a TempUser collection!)
const signupStore = new Map();

// Generate a 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'zerodha_super_secret_key_2024', { expiresIn: '7d' });
};

// Generic email sender using Nodemailer
const sendOTPEmail = async (email, otp, type) => {
  try {
    // Read from .env variables
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    // Use Gmail configuration
    let transporter = nodemailer.createTransport({
      service: 'gmail',  // Switched to Gmail preset instead of Ethereal
      auth: {
        user: emailUser,
        pass: emailPass
      }
    });

    const subject = type === 'SIGNUP' ? 'ZeroTrade - Verify your Signup' : 'ZeroTrade - Login Verification';
    const html = `<h2>Hello!</h2><p>Your OTP for ${type} is: <strong style="font-size:24px;">${otp}</strong></p><p>It will expire in 5 minutes.</p>`;

    console.log(`\n📧 Sending Email to: ${email}`);
    console.log(`👉 Subject: ${subject}`);
    console.log(`🔑 OTP: ${otp} (Valid for 5 mins)\n`);

    // Only attempt to send if credentials exist, otherwise just mock it in console
    if (emailUser && emailPass && emailUser !== 'your_email@gmail.com') {
      await transporter.sendMail({
        from: `"ZeroTrade Auth" <${emailUser}>`,
        to: email,
        subject,
        html
      });
      console.log('[MAIL SENT] Live email successfully delivered via Gmail SMTP.');
    } else {
      console.log('⚠️ [MAIL SKIPPED] No valid EMAIL_USER / EMAIL_PASS found in .env.');
      console.log('⚠️ Setup an App Password in your Google Account to deliver actual emails.');
    }
  } catch (err) {
    console.error('[MAIL ERROR] Failed to send email, but continuing execution.', err.message);
  }
};

// ─── SIGNUP FLOW ────────────────────────────────────────────────────────────

// @desc    Step 1: Receive info, generate OTP, do NOT save to DB
// @route   POST /api/auth/signup
const signup = async (req, res) => {
  try {
    console.log('\n[SIGNUP] Incoming request:', req.body);
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Generate OTP & Expiry (5 mins)
    const otp = generateOTP();
    const otpExpiry = Date.now() + 5 * 60 * 1000;

    // Store temporarily in memory
    signupStore.set(normalizedEmail, {
      name: name.trim(),
      email: normalizedEmail,
      password,
      otp,
      otpExpiry
    });

    console.log(`[SIGNUP] Valid info. Generated OTP: ${otp} for ${normalizedEmail}`);

    // Send Email
    await sendOTPEmail(normalizedEmail, otp, 'SIGNUP');

    res.status(200).json({ message: 'OTP sent to email. Please verify.' });
  } catch (error) {
    console.error('[SIGNUP] Error:', error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

// @desc    Step 2: Verify OTP, Hash password, Save user to DB, Return JWT
// @route   POST /api/auth/verify-signup-otp
const verifySignupOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const storedData = signupStore.get(normalizedEmail);

    console.log(`\n[VERIFY SIGNUP] Checking OTP for ${normalizedEmail}. Provided OTP: ${otp}`);

    if (!storedData) {
      return res.status(400).json({ message: 'Signup session expired or not found. Please register again.' });
    }

    if (storedData.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (Date.now() > storedData.otpExpiry) {
      signupStore.delete(normalizedEmail);
      return res.status(400).json({ message: 'OTP has expired. Please register again.' });
    }

    // OTP is valid! Proceed to save user.
    const hashedPassword = await bcrypt.hash(storedData.password, 10);
    
    const user = await User.create({
      name: storedData.name,
      email: storedData.email,
      password: hashedPassword
      // otp/otpExpiry are empty on actual creation
    });

    console.log('[VERIFY SIGNUP] User created in DB:', user._id);

    // Give new user wallet balance
    await Wallet.create({ userId: user._id, balance: 100000 });
    console.log('[VERIFY SIGNUP] Wallet created');

    // Clean up store
    signupStore.delete(normalizedEmail);

    const token = generateToken(user._id);

    res.status(201).json({
      message: 'Account verified and created successfully! 🎉',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('[VERIFY SIGNUP] Error:', error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};


// ─── LOGIN FLOW ─────────────────────────────────────────────────────────────

// @desc    Step 1: Verify email + password, Generate OTP, Save to User DB
// @route   POST /api/auth/login
const login = async (req, res) => {
  try {
    console.log('\n[LOGIN] Incoming request:', req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Passwords match -> Generate OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

    // Save OTP to DB
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    console.log(`[LOGIN] Password matches. Generated OTP ${otp} and saved to DB for ${normalizedEmail}`);

    // Send Email
    await sendOTPEmail(normalizedEmail, otp, 'LOGIN');

    res.status(200).json({ message: 'OTP sent to your email.' });
  } catch (error) {
    console.error('[LOGIN] Error:', error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

// @desc    Step 2: Verify Login OTP, Generate JWT
// @route   POST /api/auth/verify-login-otp
const verifyLoginOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    console.log(`\n[VERIFY LOGIN] Checking OTP for ${normalizedEmail}. Provided OTP: ${otp}`);

    const user = await User.findOne({ email: normalizedEmail });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if OTP exists
    if (!user.otp || !user.otpExpiry) {
      return res.status(400).json({ message: 'No OTP session found. Please login again.' });
    }

    // Check OTP value
    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Check OTP expiry
    if (new Date() > user.otpExpiry) {
      // Nullify OTP
      user.otp = undefined;
      user.otpExpiry = undefined;
      await user.save();
      return res.status(400).json({ message: 'OTP has expired. Please login again.' });
    }

    // Success! Clear OTP fields and login
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    console.log('[VERIFY LOGIN] Success! OTP matched and cleared. Providing JWT.');

    const token = generateToken(user._id);

    res.status(200).json({
      message: 'Login successful! 🚀',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error('[VERIFY LOGIN] Error:', error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

// ─── PROFILE FLOW ───────────────────────────────────────────────────────────

// @desc    Get logged-in user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  signup,
  verifySignupOtp,
  login,
  verifyLoginOtp,
  getMe
};
