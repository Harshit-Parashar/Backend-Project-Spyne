// routes/discussionRoutes.js
const express = require('express');
const { createDiscussion, getDiscussions, getDiscussionsByTag, updateDiscussion, deleteDiscussion } = require('../controllers/discussionController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').post(protect, createDiscussion).get(protect, getDiscussions);
router.route('/tag').get(protect, getDiscussionsByTag);
router.route('/:id').put(protect, updateDiscussion).delete(protect, deleteDiscussion);

module.exports = router;
