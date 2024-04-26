const express = require('express');
const router = express.Router();
const passport = require('../middleware/passport');
const auth = require('../middleware/auth');

// Login route
router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!user) {
      return res.status(401).json({ error: info.message });
    }
    const token = auth.generateToken(user);
    res.json({ token });
  })(req, res, next);
});

module.exports = router;
