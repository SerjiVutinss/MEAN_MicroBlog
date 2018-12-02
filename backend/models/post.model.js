var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        unique: true,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    created_utc: {
        type: String
    },
    updated_utc: {
        type: String
    },
    username: {
        type: String
    }
});

module.exports = mongoose.model('Post', postSchema);