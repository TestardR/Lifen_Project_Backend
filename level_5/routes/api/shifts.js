const express = require('express');
const router = express.Router();

// Load Shift model
const Shift = require('../../models/Shift');

// @route   GET api/shifts/test
// @desc    Tests shift route
router.get('/test', (req, res) => {
  // output json, automatically gives status 200
  res.json({ msg: 'Shifts Works' });
});

// @route GET api/shifts
// @desc    Get shifts
router.get('/', (req, res) => {
  Shift.find()
    .sort({ start_date: 1 }) // sort by date
    // .then(shift => res.json(shift))
    .then(result => res.render('shifts/index.ejs', { shifts: result }))
    .catch(err => res.status(404).json({ noshiftsfound: 'No shifts found' }));
});

// @route   GET api/shifts/:id
// @desc    Get shift by id
router.get('/:id', (req, res) => {
  Shift.findById(req.params.id)
    .then(result => res.render('shifts/edit.ejs', { shift: result }))
    .catch(err =>
      res.status(404).json({ noshiftfound: 'No shift found with this id' })
    );
});

// @route   POST api/shifts/register
// @desc    Registration shift
router.post('/register', (req, res) => {
  const newShift = new Shift({
    start_date: req.body.start_date,
    user_id: req.body.user_id || null
  });

  newShift
    .save()
    // .then(shift => res.json(shift))
    .then(res.redirect('/api/shifts'))
    .catch(err => console.log(err));
});

// @route   PUT api/shifts/:id
// @desc    Update shift
router.put('/:id', (req, res) => {
  let newData = { start_date: req.body.start_date, user_id: req.body.user_id };
  Shift.findByIdAndUpdate(req.params.id, { $set: newData })
    .then(res.redirect('/api/shifts'))
    .catch(err => console.log(err));
});

// @route   DELETE api/shifts/:id
// @desc    Delete shift
router.delete('/:id', (req, res) => {
  Shift.findById(req.params.id)
    .then(shift => {
      // Delete
      shift.remove().then(res.redirect('/api/shifts'));
    })
    .catch(err => res.status(404).json({ noshitfound: 'No shift found' }));
});

module.exports = router;
