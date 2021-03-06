var mongoose = require('mongoose');

var Schema =  mongoose.Schema;

var ReviewSchema = new mongoose.Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    postedOn : {
        type: Date, 
        default: Date.now
    },
    rating : {
      type: Number,
      required: [true, 'Please input a valid rating number'],
      min: 1, 
      max: 5
    },
    review: {
        type: String
    }
  });


  var Review = mongoose.model('Review', ReviewSchema);
  module.exports = Review;