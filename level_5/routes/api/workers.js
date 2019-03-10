const express = require('express');
const router = express.Router();

// Load User model
const Worker = require('../../models/Worker');

// @route   GET api/users/test
// @desc    Tests user route
router.get('/test', (req, res) => {
  // output json, automatically gives status 200
  res.json({ msg: 'Workers Works' });
});

// @route GET api/workers
// @desc    Get workers
router.get('/', (req, res) => {
  Worker.find()
    .sort({ name: 1 }) // sort by date
    .then(worker => res.json(worker))
    .catch(err =>
      res.status(404).json({ noworkersfound: 'No workers found with this id' })
    );
});

// @route   POST api/workers/register
// @desc    Registration worker
router.post('/register', (req, res) => {
  const newWorker = new Worker({
    name: req.body.name,
    status: req.body.status
  });

  newWorker
    .save()
    .then(worker => res.json(worker))
    .catch(err => console.log(err));
});

module.exports = router;
