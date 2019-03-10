// Load User model
const Worker = require('./model.js');

// @route   GET api/users/test
// @desc    Tests user route
// @access  Public
router.get('/test', (req, res) => {
  // output json, automatically gives status 200
  res.json({ msg: 'Users Works' });
});
