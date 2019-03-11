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
    .then(shift => res.json(shift))
    .catch(err =>
      res.status(404).json({ noshiftsfound: 'No shifts found with this id' })
    );
});

// @route   GET api/shifts/:id
// @desc    Get shift by id
router.get('/:id', (req, res) => {
  Shift.findById(req.params.id)
    .then(shift => res.json(shift))
    .catch(err =>
      res.status(404).json({ noshiftfound: 'No shift found with this id' })
    );
});

// @route   POST api/shifts/register
// @desc    Registration shift
router.post('/register', (req, res) => {
  const newShift = new Shift({
    start_date: req.body.start_date,
    user_id: req.body.user_id
  });

  newShift
    .save()
    .then(shift => res.json(shift))
    .catch(err => console.log(err));
});

// @route   PUT api/shifts/:id
// @desc    Update shift
router.put('/:id', (req, res) => {
  Shift.findOne({ _id: req.params.id })
    .then(shift => {
      shift.name = req.body.name;
      shift.status = req.body.status;
      shift.save();
    })
    .then(() => res.json({ success: true }));
});

// @route   DELETE api/shifts/:id
// @desc    Delete shift
router.delete('/:id', (req, res) => {
  Shift.findById(req.params.id)
    .then(shift => {
      // Delete
      shift.remove().then(() => res.json({ success: true }));
    })
    .catch(err => res.status(404).json({ noshitfound: 'No shift found' }));
});

module.exports = router;
