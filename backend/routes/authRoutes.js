const express = require('express');
const router = express.Router();
const {
  signup,
  verifySignupOtp,
  login,
  verifyLoginOtp,
  getMe
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/signup', signup);
router.post('/verify-signup-otp', verifySignupOtp);
router.post('/login', login);
router.post('/verify-login-otp', verifyLoginOtp);
router.get('/me', protect, getMe);

module.exports = router;
