const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TripSchema = new Schema(
    {
        // note that we don't have a short_id field, by default mongoDB creates this field, which is our Primary Key
        "date": {
            type: Date,
            required: true,
        },
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
        "isPosted": {
            type: Boolean,
            required: true,
            default: false,
        },
        // we set a default value here to be 0
        "likeCounter": {
            type: Number,
            required: false,
            default: 0,
        },
        "start": {
            type: String,
            required: true,
            default: 'Harvard',
        },
        "end": {
            type: String,
            required: true,
            default: 'MIT',
        },
        "distance": {
            type: Number,
            required: true,
            default: 0,
        },
        "type": {
            type: String,
            required: false,
            default: "Trip",
        },
        // reference to _id field in the User collection
        "originCreatorID": {
            type: Schema.Types.ObjectId, 
            ref: "User",
            required: false,
        },
        
    }
);

// mongoose will automatically create the collection for our DB
module.exports = mongoose.model("Trip", TripSchema);