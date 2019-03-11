const express = require('express');
const router = express.Router();

// Load models
const Worker = require('../../models/Worker');
const Shift = require('../../models/Shift');

// @route   GET api/workers/test
// @desc    Tests worker route
router.get('/test', (req, res) => {
  // output json, automatically gives status 200
  res.json({ msg: 'Workers Works' });
});

// @route GET api/workers
// @desc    Get workers
router.get('/', (req, res) => {
  Worker.find()
    .sort({ name: 1 }) // sort by date
    // .then(worker => res.json(worker))
    .then(result => res.render('index.ejs', { workers: result }))
    .catch(err =>
      res.status(404).json({ noworkersfound: 'No workers found with this id' })
    );
});

// @route   GET api/workers/:id
// @desc    Get worker by id
// router.get('/:id', (req, res) => {
//   Worker.findById(req.params.id)
//     .then(worker => res.json(worker))
//     .catch(err =>
//       res.status(404).json({ noworkerfound: 'No worker found with this id' })
//     );
// });

// @route   POST api/workers/register
// @desc    Registration worker
router.post('/register', (req, res) => {
  const newWorker = new Worker({
    name: req.body.name,
    status: req.body.status
  });

  newWorker
    .save()
    // .then(res => res.redirect('/'))
    // .then(worker => res.json(worker))
    .then(res.redirect('/api/workers'))
    .catch(err => console.log(err));
});

// @route   PUT api/workers/:id
// @desc    Update worker
router.put('/:id', (req, res) => {
  Worker.findOne({ _id: req.params.id })
    .then(worker => {
      worker.name = req.body.name;
      worker.status = req.body.status;
      worker.save();
    })
    .then(() => res.json({ success: true }));
});

// @route   DELETE api/workers/:id
// @desc    Delete worker
router.delete('/:id', (req, res) => {
  Worker.findOneAndDelete({ _id: req.params.id }).then(() => {
    Shift.findOneAndDelete({ user_id: req.params.id })
      // .then(() => res.json({ success: true }))
      .then(res.redirect('/api/workers'))
      .catch(err =>
        res.status(404).json({ workernotfound: 'No worker found' })
      );
  });
});
module.exports = router;
