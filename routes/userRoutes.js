// routes/userRoutes.js
const express = require('express');
const { getUsers, updateUser, deleteUser, searchUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getUsers);
router.route('/:id').put(protect, updateUser).delete(protect, deleteUser);
router.route('/search').get(protect, searchUser);

module.exports = router;
