// models/Discussion.js
const mongoose = require('mongoose');

const DiscussionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  image: { type: String },
  hashtags: [{ type: String }],
  createdOn: { type: Date, default: Date.now },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      text: { type: String, required: true },
      likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      createdOn: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model('Discussion', DiscussionSchema);
