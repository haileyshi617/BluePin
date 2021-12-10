const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  // note that we don't have a short_id field, by default mongoDB creates this field, which is our Primary Key
  "title": {
    type: String,
    required: false,
    default: '',
  },
  "content": {
    type: String,
    required: false,
    default: '',
  },
  "startDate": {
    type: String,
    required: true,
  },
  "endDate": {
    type: String,
    required: true,
  },
  "isRecruiting": {
    type: Boolean,
    required: true,
    default: true,
  },
  // we set a default value here to be 0
  "joinCounter": {
      type: Number,
      required: false,
      default: 0,
  },
  "participants":{
      type: Array,
      required: false,
      default: [],
  },
  // reference to _id field in the User collection
  "originCreatorID": {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
});

// mongoose will automatically create the collection for our DB
module.exports = mongoose.model('Event', EventSchema);
