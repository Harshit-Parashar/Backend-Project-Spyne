// controllers/discussionController.js
const Discussion = require('../models/Discussion');

const createDiscussion = async (req, res) => {
  const { text, image, hashtags } = req.body;

  const discussion = new Discussion({
    user: req.user._id,
    text,
    image,
    hashtags,
  });

  const createdDiscussion = await discussion.save();
  res.status(201).json(createdDiscussion);
};

const getDiscussions = async (req, res) => {
  const discussions = await Discussion.find({}).populate('user', 'name');
  res.json(discussions);
};

const getDiscussionsByTag = async (req, res) => {
  const tag = req.query.tag;
  const discussions = await Discussion.find({ hashtags: tag }).populate('user', 'name');
  res.json(discussions);
};

const updateDiscussion = async (req, res) => {
  const discussion = await Discussion.findById(req.params.id);

  if (discussion) {
    discussion.text = req.body.text || discussion.text;
    discussion.image = req.body.image || discussion.image;
    discussion.hashtags = req.body.hashtags || discussion.hashtags;

    const updatedDiscussion = await discussion.save();
    res.json(updatedDiscussion);
  } else {
    res.status(404).json({ message: 'Discussion not found' });
  }
};

const deleteDiscussion = async (req, res) => {
  const discussion = await Discussion.findById(req.params.id);

  if (discussion) {
    await discussion.remove();
    res.json({ message: 'Discussion removed' });
  } else {
    res.status(404).json({ message: 'Discussion not found' });
  }
};

module.exports = { createDiscussion, getDiscussions, getDiscussionsByTag, updateDiscussion, deleteDiscussion };
