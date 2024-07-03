// controllers/userController.js
const User = require('../models/User');

const getUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

const updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.mobileNo = req.body.mobileNo || user.mobileNo;
    user.email = req.body.email || user.email;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

const searchUser = async (req, res) => {
  const keyword = req.query.keyword ? {
    name: {
      $regex: req.query.keyword,
      $options: 'i'
    }
  } : {};

  const users = await User.find({ ...keyword });
  res.json(users);
};

module.exports = { getUsers, updateUser, deleteUser, searchUser };
