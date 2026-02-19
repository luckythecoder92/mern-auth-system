const express = require('express');
const { registerUser, loginUser, userProfile, logOutUser } = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');
const router = express.Router();

router.post('/api/register', registerUser);
router.post('/api/login', loginUser);
router.get('/api/profile',protect,userProfile);
router.get('/api/logout',protect, logOutUser);

module.exports = router;