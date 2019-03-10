const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});

module.exports = Post = mongoose.model('workers', WorkerSchema);
