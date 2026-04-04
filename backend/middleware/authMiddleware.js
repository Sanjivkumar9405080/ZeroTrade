const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // 1. Extract token from Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    console.log('[AUTH] No token provided');
    return res.status(401).json({ message: 'Not authorized. No token provided.' });
  }

  try {
    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('[AUTH] Token verified, userId:', decoded.id);

    // 3. Attach user (without password)
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      console.log('[AUTH] Token valid but user not found in DB, id:', decoded.id);
      return res.status(401).json({ message: 'User not found. Token invalid.' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('[AUTH] Token verification failed:', error.message);
    return res.status(401).json({ message: 'Not authorized. Token failed or expired.' });
  }
};

module.exports = { protect };
