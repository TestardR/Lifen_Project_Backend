const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShiftSchema = new Schema({
  start_date: {
    type: Date,
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'workers'
  }
});

module.exports = Post = mongoose.model('shifts', ShiftSchema);
