const express = require('express');
const User = require('../models/User');

const router = express.Router();

// GET route for retrieving all users
router.get('/', async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// POST route for creating a new user
router.post('/', async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.status(201).json(newUser);
});

// POST route to add a friend to a user's friend list
router.post('/:userId/friends/:friendId', async (req, res) => {
    const user = await User.findById(req.params.userId);
    user.friends.push(req.params.friendId);
    await user.save();
    res.json(user);
  });
  
  // DELETE route to remove a friend from a user's friend list
  router.delete('/:userId/friends/:friendId', async (req, res) => {
    const user = await User.findById(req.params.userId);
    const friendIndex = user.friends.indexOf(req.params.friendId);
    user.friends.splice(friendIndex, 1);
    await user.save();
    res.json(user);
  });
  

// PUT route for updating a user
router.put('/:id', async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedUser);
});

// DELETE route for deleting a user
router.delete('/:id', async (req, res) => {
  await User.findByIdAndRemove(req.params.id);
  res.json({ message: 'User deleted' });
});

module.exports = router;
