const passport = require('passport');

const auth = passport.authenticate('jwt', { session: false });

const isAdmin = (req, res, next) => {
  if (req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Access denied. Admin only.' });
};

module.exports = { auth, isAdmin };